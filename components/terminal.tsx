"use client"

import type React from "react"
import { useEffect, useRef } from "react"
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

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-mono">
      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-10 py-6 pb-20 md:pb-4"
        style={{ maxWidth: "70ch", margin: "0 auto", width: "100%" }}
      >
        <div className="space-y-6">
          {output.map((block, index) => (
            <div key={block.id}>
              <OutputBlock {...block} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Input */}
      <div className="hidden md:block border-t border-muted-foreground/20 bg-background">
        <div style={{ maxWidth: "70ch", margin: "0 auto", width: "100%" }}>
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
    </div>
  )
}
