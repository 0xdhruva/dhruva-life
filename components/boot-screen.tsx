"use client"

import { useState, useEffect } from "react"

interface BootScreenProps {
  onComplete: () => void
  hasExecutedCommand: boolean
}

export function BootScreen({ onComplete, hasExecutedCommand }: BootScreenProps) {
  const [step, setStep] = useState(0)
  const [skipped, setSkipped] = useState(false)

  const bootSequence = [
    "dhruva.life [v2.0]",
    "Loading identity...",
    "",
    "I build products for people I care about",
    "────────────────────────────────────────────────────────────────",
    "Type help or press ⌘K (tap ✨) to begin.",
  ]

  useEffect(() => {
    const handleSkip = () => {
      if (!skipped) {
        setSkipped(true)
        onComplete()
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => handleSkip()
    const handleClick = () => handleSkip()

    document.addEventListener("keydown", handleKeyPress)
    document.addEventListener("click", handleClick)

    const timers = bootSequence.map((_, index) =>
      setTimeout(() => {
        if (!skipped) {
          setStep(index + 1)
        }
      }, index * 400),
    )

    return () => {
      timers.forEach(clearTimeout)
      document.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("click", handleClick)
    }
  }, [skipped, onComplete])

  if (skipped && hasExecutedCommand) {
    return (
      <div className="text-left space-y-1 mb-4 opacity-75 transition-opacity duration-300">
        {bootSequence.map((line, index) => (
          <div
            key={index}
            className={`text-base leading-7 ${
              index === 3
                ? "text-accent font-medium"
                : index === 4
                  ? "text-muted text-sm"
                  : index === 5
                    ? "text-muted text-sm"
                    : ""
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    )
  }

  if (skipped) {
    return (
      <div className="text-left space-y-1 mb-4 opacity-75 transition-opacity duration-300">
        {bootSequence.map((line, index) => (
          <div
            key={index}
            className={`text-base leading-7 ${
              index === 3
                ? "text-accent font-medium"
                : index === 4
                  ? "text-muted text-sm"
                  : index === 5
                    ? "text-muted text-sm"
                    : ""
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center font-mono">
      <div className="text-left space-y-4 max-w-[70ch] px-6">
        {bootSequence.slice(0, step).map((line, index) => (
          <div
            key={index}
            className={`text-lg leading-7 transition-opacity duration-300 ${
              index === 3 ? "text-accent font-medium" : index === 4 ? "text-muted" : index === 5 ? "text-muted" : ""
            }`}
          >
            {line}
          </div>
        ))}
        {step > 0 && step <= bootSequence.length && <div className="terminal-cursor inline-block ml-1" />}

        <div className="text-muted text-sm mt-8">Press any key or click to continue</div>
      </div>
    </div>
  )
}
