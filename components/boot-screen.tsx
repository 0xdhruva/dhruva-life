"use client"

import { useState, useEffect } from "react"

interface BootScreenProps {
  onComplete: () => void
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [step, setStep] = useState(0)
  const [skipped, setSkipped] = useState(false)

  const bootSequence = [
    "dhruva.life [v2.0]",
    "Loading identity...",
    "I build product for people I care about",
    "Type help or press ⌘K (tap ✨) to begin",
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

  if (skipped) return null

  return (
    <div className="bg-peat text-bone min-h-screen flex items-center justify-center font-mono">
      <div className="text-center space-y-6 content-width px-4">
        {bootSequence.slice(0, step).map((line, index) => (
          <div
            key={index}
            className={`text-lg transition-opacity duration-300 ${
              index === 2 ? "text-terracotta font-semibold" : index === 3 ? "text-sage" : ""
            }`}
          >
            {line}
          </div>
        ))}
        {step > 0 && step <= bootSequence.length && <div className="terminal-cursor inline-block ml-1" />}

        <div className="text-sage/60 text-sm mt-8">Press any key or click to continue</div>
      </div>
    </div>
  )
}
