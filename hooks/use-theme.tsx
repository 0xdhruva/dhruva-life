"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("terminal-theme") as "light" | "dark" | "auto"
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : theme === "light" ? "auto" : "dark"
    setTheme(newTheme)
    localStorage.setItem("terminal-theme", newTheme)
  }

  const setThemeMode = (mode: "light" | "dark" | "auto") => {
    setTheme(mode)
    localStorage.setItem("terminal-theme", mode)
  }

  return {
    theme,
    toggleTheme,
    setThemeMode,
  }
}
