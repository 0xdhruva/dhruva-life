"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("terminal-theme") as "light" | "dark"
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  const setThemeMode = (mode: "light" | "dark") => {
    setTheme(mode)
    localStorage.setItem("terminal-theme", mode)
  }

  return {
    theme,
    setTheme: setThemeMode,
  }
}
