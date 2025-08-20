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
  const [discoveryState, setDiscoveryState] = useState({
    basicCommandsUsed: 0,
    advancedCommandsUsed: 0,
    advancedUnlocked: false,
    easterEggsFound: [] as string[],
    showingHints: false
  })

  // Load history and discovery state from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("terminal-history")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
    
    const savedDiscovery = localStorage.getItem("terminal-discovery")
    if (savedDiscovery) {
      setDiscoveryState(JSON.parse(savedDiscovery))
    }
  }, [])

  // Update suggestions based on input
  useEffect(() => {
    if (input.trim()) {
      setSuggestions(getCommandSuggestions(input, discoveryState))
    } else {
      setSuggestions([])
    }
  }, [input, discoveryState])

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

      // Execute command with discovery context
      const result = runCommand(trimmedCommand, discoveryState)

      // Update discovery tracking
      const basicCommands = ['about', 'work', 'contact', 'now', 'writing']
      const advancedCommands = ['stack', 'github', 'research', 'journey', 'philosophy', 'gigs', 'vinyls', 'spotify', 'random']
      const easterEggs = ['jits', 'analog', 'matrix', 'rangoli', 'play']
      
      let newDiscoveryState = { ...discoveryState }
      let unlockNotifications: React.ReactNode[] = []
      
      if (basicCommands.includes(trimmedCommand)) {
        newDiscoveryState.basicCommandsUsed++
        if (newDiscoveryState.basicCommandsUsed >= 3 && !newDiscoveryState.advancedUnlocked) {
          newDiscoveryState.advancedUnlocked = true
          unlockNotifications.push(
            <div key="advanced-unlock" className="text-olive text-sm font-medium bg-olive/10 px-3 py-2 rounded border border-olive/20">
              🔓 Advanced Commands Unlocked! Use <span className="text-olive font-mono">help</span> to see new options.
            </div>
          )
        }
      }
      
      if (advancedCommands.includes(trimmedCommand)) {
        newDiscoveryState.advancedCommandsUsed++
        if (newDiscoveryState.advancedCommandsUsed >= 3 && !newDiscoveryState.showingHints) {
          newDiscoveryState.showingHints = true
          unlockNotifications.push(
            <div key="hints-unlock" className="text-teal-stone text-sm font-medium bg-teal-stone/10 px-3 py-2 rounded border border-teal-stone/20">
              ✧ Secret Commands Now Visible! Check <span className="text-teal-stone font-mono">help</span> for cryptic hints...
            </div>
          )
        }
      }
      
      if (easterEggs.includes(trimmedCommand) && !newDiscoveryState.easterEggsFound.includes(trimmedCommand)) {
        newDiscoveryState.easterEggsFound = [...newDiscoveryState.easterEggsFound, trimmedCommand]
      }
      
      setDiscoveryState(newDiscoveryState)
      localStorage.setItem("terminal-discovery", JSON.stringify(newDiscoveryState))

      // Combine result content with unlock notifications
      let finalContent = result.content
      if (unlockNotifications.length > 0) {
        finalContent = (
          <div className="space-y-4">
            {result.content}
            {unlockNotifications}
          </div>
        )
      }

      // Add to output
      const newBlock = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp,
        command: trimmedCommand,
        content: finalContent,
        type: result.type || ("command" as const),
      }

      setOutput((prev) => [...prev, newBlock])
    },
    [history, discoveryState],
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
    discoveryState,
  }
}
