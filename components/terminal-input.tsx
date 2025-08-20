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
    if (inputRef.current) {
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
    <div className="relative p-6 space-baseline-2">
      <div className="flex items-center space-x-3 min-h-[48px]">
        <span className="text-terracotta text-lg">❯</span>
        <div className="flex-1 relative">
          {ghostText && (
            <div className="absolute inset-0 pointer-events-none text-sage/40 whitespace-pre">
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
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full bg-transparent border-none outline-none text-bone placeholder-sage/50 focus-ring content-width"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute bottom-full left-6 right-6 mb-2 bg-peat/95 backdrop-blur-sm border border-sage/30 rounded-md p-3 space-y-2 shadow-lg">
          <div className="text-xs text-sage/70 mb-2">Suggestions (Tab to accept)</div>
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <div
              key={suggestion}
              className="text-sm text-sage hover:text-bone cursor-pointer p-2 rounded hover:bg-sage/20 transition-colors"
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
  )
}
