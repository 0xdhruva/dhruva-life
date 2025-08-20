"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getAllCommands } from "@/lib/commands"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onExecuteCommand: (command: string) => void
}

export function CommandPalette({ isOpen, onClose, onExecuteCommand }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const allCommands = getAllCommands()
  const filteredCommands = allCommands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        onExecuteCommand(filteredCommands[selectedIndex].name)
        onClose()
      }
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-peat border-sage/30 text-bone max-w-2xl">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-terracotta">❯</span>
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search commands..."
              className="bg-transparent border-sage/30 text-bone placeholder-sage/50"
              autoComplete="off"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-1">
            {filteredCommands.map((command, index) => (
              <div
                key={command.name}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  index === selectedIndex ? "bg-terracotta/20 border border-terracotta/30" : "hover:bg-sage/10"
                }`}
                onClick={() => {
                  onExecuteCommand(command.name)
                  onClose()
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-terracotta font-mono">{command.name}</span>
                    <span className="text-sage text-sm">{command.description}</span>
                  </div>
                  {command.category && (
                    <span className="text-xs text-sage/60 bg-sage/10 px-2 py-1 rounded">{command.category}</span>
                  )}
                </div>
              </div>
            ))}

            {filteredCommands.length === 0 && (
              <div className="text-center text-sage/60 py-8">No commands found for "{query}"</div>
            )}
          </div>

          <div className="text-xs text-sage/60 text-center">Use ↑↓ to navigate, Enter to select, Esc to close</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
