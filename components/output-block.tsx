"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface OutputBlockProps {
  id: string
  timestamp: string
  command: string
  content: React.ReactNode
  type?: "command" | "error" | "success"
}

export function OutputBlock({ id, timestamp, command, content, type = "command" }: OutputBlockProps) {
  const [showMore, setShowMore] = useState(false)
  const [isLongContent, setIsLongContent] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const contentString = typeof content === "string" ? content : content?.toString() || ""
    const lineCount = contentString.split("\n").length
    setIsLongContent(lineCount > 12)
  }, [content])

  const typeColors = {
    command: "text-fg",
    error: "text-red-400",
    success: "text-success",
  }

  const handleCopyLink = async () => {
    const permalink = `${window.location.origin}${window.location.pathname}#block-${id}`
    await navigator.clipboard.writeText(permalink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    const toast = document.createElement("div")
    toast.textContent = "Link copied."
    toast.className = "fixed top-4 right-4 bg-accent text-bg px-3 py-2 rounded text-sm z-50 transition-opacity"
    document.body.appendChild(toast)
    setTimeout(() => {
      toast.style.opacity = "0"
      setTimeout(() => document.body.removeChild(toast), 300)
    }, 1500)

    if ("vibrate" in navigator) {
      navigator.vibrate(10)
    }
  }

  return (
    <div className="group" id={`block-${id}`} style={{ marginBottom: "16px" }}>
      <div className="flex">
        <div className="w-14 flex-shrink-0 text-right pr-3">
          <span className="text-warn text-sm opacity-85 font-mono">{timestamp}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Command line */}
          <div className="flex items-center mb-2">
            <span className="text-accent mr-2">❯</span>
            <span className="text-muted text-sm">{command}</span>

            <button
              onClick={handleCopyLink}
              onTouchStart={handleCopyLink}
              className="ml-auto opacity-0 group-hover:opacity-100 text-muted hover:text-fg transition-all duration-200 text-xs px-2 py-1 hover:bg-muted/10 rounded"
              style={{ transform: "scale(1)", transition: "transform 80ms ease" }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              🔗
            </button>
          </div>

          {/* Content */}
          <div className={`${typeColors[type]} leading-7`}>
            {isLongContent && !showMore ? (
              <div>
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 12,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {content}
                </div>
                <button
                  onClick={() => setShowMore(true)}
                  className="mt-3 px-3 py-1 text-sm border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200 rounded-full"
                  style={{
                    height: "32px",
                    transform: "scale(1)",
                    transition: "transform 80ms ease",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  [ Show more ]
                </button>
              </div>
            ) : (
              <div>
                {content}
                {isLongContent && showMore && (
                  <button
                    onClick={() => setShowMore(false)}
                    className="mt-3 px-3 py-1 text-sm border border-muted text-muted hover:bg-muted hover:text-bg transition-all duration-200 rounded-full"
                    style={{
                      height: "32px",
                      transform: "scale(1)",
                      transition: "transform 80ms ease",
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    [ Show less ]
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
