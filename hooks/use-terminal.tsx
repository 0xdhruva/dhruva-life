"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { executeCommand as runCommand, getCommandSuggestions } from "@/lib/commands"

export function useTerminal() {
  const [output, setOutput] = useState<
    Array<{
      id: string
      timestamp: string
      command: string
      content: React.ReactNode
      type?: "command" | "error" | "success"
    }>
  >([])

  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("terminal-history")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Update suggestions based on input
  useEffect(() => {
    if (input.trim()) {
      setSuggestions(getCommandSuggestions(input))
    } else {
      setSuggestions([])
    }
  }, [input])

  const executeCommand = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim()
      if (!trimmedCommand) return

      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      // Add to history
      const newHistory = [...history.filter((h) => h !== trimmedCommand), trimmedCommand].slice(-50)
      setHistory(newHistory)
      localStorage.setItem("terminal-history", JSON.stringify(newHistory))

      // Execute command
      const result = runCommand(trimmedCommand)

      // Add to output
      const newBlock = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp,
        command: trimmedCommand,
        content: result.content,
        type: result.type || ("command" as const),
      }

      setOutput((prev) => [...prev, newBlock])
    },
    [history],
  )

  const clearOutput = useCallback(() => {
    setOutput([])
  }, [])

  return {
    output,
    input,
    setInput,
    executeCommand,
    history,
    historyIndex,
    setHistoryIndex,
    suggestions,
    clearOutput,
  }
}
