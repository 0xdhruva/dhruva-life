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
  bootCompleted: boolean
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
  bootCompleted,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (terminalRef.current) {
  //     terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  //   }
  // }, [output])

  return (
    <>
      {/* Terminal Content - Only renders if there's output */}
      {output.length > 0 && (
        <div className="flex flex-col min-h-screen">
          <div ref={terminalRef} className="flex-1 pb-20 sm:pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="space-y-8">
                {output.map((block, index) => (
                  <OutputBlock key={block.id} {...block} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Input - Always visible after boot */}
      {bootCompleted && (
        <TerminalInput
          input={input}
          setInput={setInput}
          executeCommand={executeCommand}
          history={history}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          suggestions={suggestions}
        />
      )}
    </>
  )
}
