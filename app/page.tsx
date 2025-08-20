"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal } from "@/components/terminal"
import { CommandPalette } from "@/components/command-palette"
import { MobileInputBar } from "@/components/mobile-input-bar"
import { BootScreen } from "@/components/boot-screen"
import { useTerminal } from "@/hooks/use-terminal"
import { useTheme } from "@/hooks/use-theme"

export default function HomePage() {
  const [bootCompleted, setBootCompleted] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const { output, input, setInput, executeCommand, history, historyIndex, setHistoryIndex, suggestions, clearOutput } =
    useTerminal()

  const handleBootComplete = () => {
    setBootCompleted(true)
  }

  const handleExecuteCommand = (command: string) => {
    executeCommand(command)
    // Scroll to top after a brief delay to allow content to render
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" })
      }
    }, 100)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowCommandPalette(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono overflow-y-auto">
      <div className={bootCompleted ? "opacity-75" : "opacity-100"}>
        <BootScreen onComplete={handleBootComplete} />
      </div>

      {bootCompleted && (
        <Terminal
          output={output}
          input={input}
          setInput={setInput}
          executeCommand={handleExecuteCommand}
          history={history}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          suggestions={suggestions}
          clearOutput={clearOutput}
        />
      )}

      <MobileInputBar
        input={input}
        setInput={setInput}
        executeCommand={handleExecuteCommand}
        onOpenPalette={() => setShowCommandPalette(true)}
      />

      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onExecuteCommand={handleExecuteCommand}
      />
    </div>
  )
}
