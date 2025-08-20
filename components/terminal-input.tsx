"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface TerminalInputProps {
  input: string
  setInput: (value: string) => void
  executeCommand: (command: string) => void
  history: string[]
  historyIndex: number
  setHistoryIndex: (index: number) => void
  suggestions: string[]
}

export function TerminalInput({
  input,
  setInput,
  executeCommand,
  history,
  historyIndex,
  setHistoryIndex,
  suggestions,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [ghostText, setGhostText] = useState("")

  useEffect(() => {
    // Only auto-focus on desktop to avoid mobile viewport issues
    if (inputRef.current && window.innerWidth > 768) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (input && suggestions.length > 0) {
      const bestMatch = suggestions[0]
      if (bestMatch.toLowerCase().startsWith(input.toLowerCase())) {
        setGhostText(bestMatch.slice(input.length))
      } else {
        setGhostText("")
      }
    } else {
      setGhostText("")
    }
  }, [input, suggestions])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setInput("")
      setHistoryIndex(-1)
      setShowSuggestions(false)
      setGhostText("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (ghostText) {
        setInput(input + ghostText)
        setGhostText("")
      } else if (suggestions.length > 0) {
        setInput(suggestions[0])
      }
      setShowSuggestions(false)
    } else if (e.key === "Escape" || (e.ctrlKey && e.key === "l")) {
      e.preventDefault()
      setInput("")
      setHistoryIndex(-1)
      setShowSuggestions(false)
      setGhostText("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    setShowSuggestions(value.length > 0 && suggestions.length > 0)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <span className="text-sage text-sm">$</span>
          <div className="flex-1 relative">
            {ghostText && (
              <div className="absolute inset-0 pointer-events-none text-muted-foreground/30 whitespace-pre">
                <span className="invisible">{input}</span>
                {ghostText}
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(input.length > 0 && suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full bg-transparent border-none outline-none text-foreground text-sm placeholder-muted-foreground"
              placeholder="Type 'help' to get started..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="mt-2 p-2 bg-card border border-border rounded">
            <div className="text-xs text-muted-foreground mb-1">Press Tab to complete:</div>
            {suggestions.slice(0, 3).map((suggestion) => (
              <div
                key={suggestion}
                className="text-xs text-muted-foreground hover:text-foreground cursor-pointer py-1 px-2 rounded hover:bg-muted/20"
                onClick={() => {
                  setInput(suggestion)
                  setShowSuggestions(false)
                  setGhostText("")
                  inputRef.current?.focus()
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
