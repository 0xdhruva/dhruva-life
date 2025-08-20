"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface OutputBlockProps {
  id: string
  timestamp: string
  command: string
  content: React.ReactNode
  type?: "command" | "error" | "success"
}

export function OutputBlock({ id, timestamp, command, content, type = "command" }: OutputBlockProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [showMore, setShowMore] = useState(false)
  const [isLongContent, setIsLongContent] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const contentString = typeof content === "string" ? content : ""
    setIsLongContent(contentString.length > 800)

    // Disable animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsAnimating(false)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 800)
      return () => clearTimeout(timer)
    }
  }, [content])

  const typeColors = {
    command: "text-bone",
    error: "text-destructive",
    success: "text-olive",
  }

  const handleCopy = () => {
    const textContent = typeof content === "string" ? content : command
    navigator.clipboard.writeText(textContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    if ("vibrate" in navigator) {
      navigator.vibrate(10)
    }
  }

  const handleShare = () => {
    const permalink = `${window.location.origin}${window.location.pathname}#block-${id}`
    navigator.clipboard.writeText(permalink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    if ("vibrate" in navigator) {
      navigator.vibrate(10)
    }
  }

  return (
    <div className="group space-baseline-2" id={`block-${id}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 text-meta">
          <span className="text-ochre font-medium">[{timestamp}]</span>
          <span className="text-terracotta text-lg">❯</span>
          <span className="text-sage">{command}</span>
        </div>

        <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-3 text-xs text-sage hover:text-bone hover:bg-sage/20 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 px-3 text-xs text-sage hover:text-bone hover:bg-sage/20 transition-colors"
          >
            Link
          </Button>
        </div>
      </div>

      <div className={`${typeColors[type]} ${isAnimating ? "animate-pulse" : ""} content-width space-baseline`}>
        <div className="px-6 py-4 bg-sage/5 rounded-md border border-sage/10">
          {isLongContent && !showMore ? (
            <div>
              <div className="line-clamp-6">{content}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMore(true)}
                className="mt-4 text-terracotta hover:text-bone hover:bg-terracotta/20 transition-colors"
              >
                Show more ↓
              </Button>
            </div>
          ) : (
            <div>{content}</div>
          )}

          {isLongContent && showMore && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMore(false)}
              className="mt-4 text-sage hover:text-bone hover:bg-sage/20 transition-colors"
            >
              Show less ↑
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-sage/30 text-sm space-baseline">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-px bg-sage/20"></div>
          <span className="text-sage/40">◦</span>
          <div className="w-12 h-px bg-sage/20"></div>
        </div>
      </div>
    </div>
  )
}
