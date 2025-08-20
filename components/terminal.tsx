"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { OutputBlock } from "./output-block"
import { TerminalInput } from "./terminal-input"

interface TerminalProps {
  output: Array<{
    id: string
    timestamp: string
    command: string
    content: React.ReactNode
    type?: "command" | "error" | "success"
  }>
  input: string
  setInput: (value: string) => void
  executeCommand: (command: string) => void
  history: string[]
  historyIndex: number
  setHistoryIndex: (index: number) => void
  suggestions: string[]
  clearOutput: () => void
}

export function Terminal({
  output,
  input,
  setInput,
  executeCommand,
  history,
  historyIndex,
  setHistoryIndex,
  suggestions,
  clearOutput,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [showScrollHint, setShowScrollHint] = useState(false)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    if (output.length > 5) {
      setShowScrollHint(true)
      const timer = setTimeout(() => setShowScrollHint(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [output.length])

  return (
    <div className="flex flex-col h-screen">
      {/* Terminal Header */}
      <div className="bg-sage/20 border-b border-sage/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-ochre"></div>
          <div className="w-3 h-3 rounded-full bg-olive"></div>
        </div>
        <div className="text-sm text-sage">dhruva.life — terminal</div>
        <div className="text-xs text-sage/70">{output.length} blocks</div>
      </div>

      {/* Terminal Content */}
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 md:pb-4">
        {output.map((block) => (
          <OutputBlock key={block.id} {...block} />
        ))}

        {showScrollHint && <div className="text-center text-sage/60 text-sm animate-pulse">↓ Scroll to see more ↓</div>}
      </div>

      {/* Desktop Input - Hidden on mobile */}
      <div className="hidden md:block border-t border-sage/30 bg-peat/50">
        <TerminalInput
          input={input}
          setInput={setInput}
          executeCommand={executeCommand}
          history={history}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          suggestions={suggestions}
        />
      </div>
    </div>
  )
}
