"use client"

import { useState, useEffect } from "react"
import { Terminal } from "@/components/terminal"
import { CommandPalette } from "@/components/command-palette"
import { MobileInputBar } from "@/components/mobile-input-bar"
import { BootScreen } from "@/components/boot-screen"
import { useTerminal } from "@/hooks/use-terminal"
import { useTheme } from "@/hooks/use-theme"

export default function HomePage() {
  const [showBoot, setShowBoot] = useState(true)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const { theme } = useTheme()

  const { output, input, setInput, executeCommand, history, historyIndex, setHistoryIndex, suggestions, clearOutput } =
    useTerminal()

  const handleBootComplete = () => {
    setShowBoot(false)
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

  if (showBoot) {
    return <BootScreen onComplete={handleBootComplete} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Terminal
        output={output}
        input={input}
        setInput={setInput}
        executeCommand={executeCommand}
        history={history}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        suggestions={suggestions}
        clearOutput={clearOutput}
      />

      <MobileInputBar
        input={input}
        setInput={setInput}
        executeCommand={executeCommand}
        onOpenPalette={() => setShowCommandPalette(true)}
      />

      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onExecuteCommand={executeCommand}
      />
    </div>
  )
}
