"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface MobileInputBarProps {
  input: string
  setInput: (value: string) => void
  executeCommand: (command: string) => void
  onOpenPalette: () => void
}

export function MobileInputBar({ input, setInput, executeCommand, onOpenPalette }: MobileInputBarProps) {
  const quickCommands = [
    { label: "help", command: "help" },
    { label: "projects", command: "projects" },
    { label: "writing", command: "writing" },
    { label: "whativedone", command: "whativedone" },
    { label: "turntable", command: "turntable" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
      setInput("")
    }
  }

  const handleQuickCommand = (command: string) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(10)
    }
    executeCommand(command)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-muted">
      <div className="px-4 py-3 border-b border-muted">
        <div className="flex gap-3 overflow-x-auto">
          {quickCommands.map(({ label, command }) => (
            <Button
              key={command}
              variant="ghost"
              size="sm"
              onClick={() => handleQuickCommand(command)}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground font-mono text-sm px-3 py-1"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-foreground font-mono">❯</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=""
            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono placeholder-muted-foreground focus:outline-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="text"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenPalette}
            className="text-muted-foreground hover:text-foreground font-mono px-2"
          >
            ✨
          </Button>
        </form>
      </div>
    </div>
  )
}
