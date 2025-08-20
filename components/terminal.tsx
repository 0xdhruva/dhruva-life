"use client"

import type React from "react"
import { useRef } from "react"
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

  // useEffect(() => {
  //   if (terminalRef.current) {
  //     terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  //   }
  // }, [output])

  return (
    <div className="flex flex-col text-foreground font-mono">
      {/* Terminal Content */}
      <div ref={terminalRef} className="flex items-center justify-center py-6 pb-20 md:pb-4">
        <div className="text-left max-w-[70ch] px-6 w-full">
          <div className="space-y-6">
            {output.map((block, index) => (
              <div key={block.id}>
                <OutputBlock {...block} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Input */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center">
          <div className="max-w-[70ch] px-6 w-full">
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
    </div>
  )
}
