"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/hooks/use-theme"

interface MobileInputBarProps {
  input: string
  setInput: (value: string) => void
  executeCommand: (command: string) => void
  onOpenPalette: () => void
}

export function MobileInputBar({ input, setInput, executeCommand, onOpenPalette }: MobileInputBarProps) {
  const { toggleTheme } = useTheme()

  const quickCommands = [
    { label: "help", command: "help", icon: "?" },
    { label: "projects", command: "projects", icon: "📁" },
    { label: "writing", command: "writing", icon: "✍️" },
    { label: "whativedone", command: "whativedone", icon: "📋" },
    { label: "turntable", command: "turntable", icon: "🎵" },
    { label: "slapbump", command: "slapbump", icon: "✋" },
    { label: "rangoli", command: "rangoli", icon: "🌸" },
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
      navigator.vibrate(10) // Subtle haptic feedback
    }
    executeCommand(command)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-peat/95 backdrop-blur-sm border-t border-sage/30 safe-area-pb">
      <div className="px-4 py-3 border-b border-sage/20">
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {quickCommands.map(({ label, command, icon }) => (
            <Button
              key={command}
              variant="ghost"
              size="sm"
              onClick={() => handleQuickCommand(command)}
              className="flex-shrink-0 h-8 px-3 text-sage hover:text-bone hover:bg-sage/20 text-xs"
            >
              <span className="mr-1">{icon}</span>
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenPalette}
              className="h-8 w-8 p-0 text-terracotta hover:text-bone hover:bg-terracotta/20"
            >
              ✨
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0 text-sage hover:text-bone hover:bg-sage/20"
            >
              🌓
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="flex-1 flex items-center space-x-3 bg-sage/10 rounded-md px-4 py-3 min-h-[48px]">
            <span className="text-terracotta text-lg">❯</span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command..."
              className="flex-1 bg-transparent border-none outline-none text-bone placeholder-sage/50 focus-ring"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <Button type="submit" size="sm" className="bg-terracotta hover:bg-terracotta/80 text-bone min-h-[48px] px-4">
            ↵
          </Button>
        </form>
      </div>
    </div>
  )
}
