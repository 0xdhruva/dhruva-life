"use client"

import { useState, useEffect } from "react"
import type { Command } from "./commands"

// ASCII Art Components
const TurntableAnimation = () => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 45) % 360)
    }, 200)

    setTimeout(() => clearInterval(interval), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-2">
      <div className="text-2xl" style={{ transform: `rotate(${rotation}deg)`, display: "inline-block" }}>
        ⚫
      </div>
      <p className="text-sage">Now spinning… drop a needle, not a take.</p>
    </div>
  )
}

const LinkinParkPulse = () => {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setPulse((prev) => !prev), 300)
    setTimeout(() => clearInterval(interval), 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-2">
      <div className={`text-3xl font-bold transition-all ${pulse ? "scale-110 text-terracotta" : "scale-100"}`}>LP</div>
      <p className="text-sage">what I've done — is build.</p>
    </div>
  )
}

const VinylCrate = () => {
  const albums = ["Random Access Memories", "Meteora", "Dark Side of the Moon", "Graduation"]

  const randomAlbum = albums[Math.floor(Math.random() * albums.length)]

  return (
    <div className="space-y-2">
      <div className="text-center text-2xl">📦</div>
      <p>
        Pulled from the crate: <span className="text-terracotta">{randomAlbum}</span>.
      </p>
    </div>
  )
}

const SlapBump = () => {
  const tips = ["Fight for inside ties.", "Win the grip, win the exchange.", "Frames first, then hips."]

  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">🤝</div>
      <div className="text-terracotta font-bold text-lg">ROLL!</div>
      <p className="text-sage">{randomTip}</p>
    </div>
  )
}

const TapOut = () => {
  const [tightening, setTightening] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTightening(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-center space-y-2">
      <div className={`text-2xl transition-all ${tightening ? "scale-75" : "scale-100"}`}>🔺</div>
      <p className="text-sage">Respect the tap. Reset. Go again.</p>
    </div>
  )
}

const OssEcho = () => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-terracotta animate-pulse">OSS</div>
    </div>
  )
}

const RangoliBloom = () => {
  const [stage, setStage] = useState(0)
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(3)
      return
    }

    const stages = [0, 1, 2, 3]
    stages.forEach((s, i) => {
      setTimeout(() => setStage(s), i * 750)
    })
  }, [prefersReducedMotion])

  const patterns = ["·", "· ◦ ·", "· ◦ ● ◦ ·", "· ◦ ● ◦ ● ◦ ·"]

  return (
    <div className="text-center space-y-2">
      <div className="text-2xl text-terracotta">{patterns[stage]}</div>
      <p className="text-sage">Fractal rangoli — order, chaos, pattern.</p>
    </div>
  )
}

const EntropyScramble = () => {
  const [scrambled, setScrambled] = useState(true)
  const message = "I build product for people I care about."

  useEffect(() => {
    const timer = setTimeout(() => setScrambled(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const scrambledText = scrambled
    ? message
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
    : message

  return (
    <div className="text-center">
      <p className={`transition-all duration-1000 ${scrambled ? "text-sage" : "text-terracotta"}`}>{scrambledText}</p>
    </div>
  )
}

const MeditationHaiku = () => {
  const haikus = [
    "Systems that endure, / positive-sum by design, / people at the core.",
    "Between art and code, / communities take root—grow, / outliving the builder.",
  ]

  const randomHaiku = haikus[Math.floor(Math.random() * haikus.length)]

  return (
    <div className="text-center">
      <p className="text-sage italic whitespace-pre-line">{randomHaiku}</p>
    </div>
  )
}

const PolymathTree = () => {
  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">🌳</div>
      <div className="text-sm space-y-1">
        <div className="text-terracotta">Tech • Art • Sport • Culture</div>
      </div>
    </div>
  )
}

const CompileProgress = () => {
  const [progress, setProgress] = useState(0)
  const [currentLog, setCurrentLog] = useState(0)

  const logs = ["[ok] Linking communities…", "[ok] Optimizing feedback loops…", "[ok] Shipping value to users…"]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 100)

    const logInterval = setInterval(() => {
      setCurrentLog((prev) => Math.min(prev + 1, logs.length))
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(logInterval)
    }
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-sage/20 rounded-full h-2">
          <div className="bg-olive h-2 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm text-sage">{progress}%</span>
      </div>
      <div className="space-y-1 text-sm">
        {logs.slice(0, currentLog).map((log, index) => (
          <div key={index} className="text-olive">
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

const DeployLogs = () => {
  const [currentLog, setCurrentLog] = useState(0)

  const logs = [
    "Deploying graicie v1.2.3...",
    "Building cultureco frontend...",
    "Updating arenatwo contracts...",
    "Deploy complete ✅",
  ]

  useEffect(() => {
    logs.forEach((_, index) => {
      setTimeout(() => setCurrentLog(index + 1), (index + 1) * 600)
    })
  }, [])

  return (
    <div className="space-y-1 text-sm">
      {logs.slice(0, currentLog).map((log, index) => (
        <div key={index} className={index === logs.length - 1 ? "text-olive" : "text-sage"}>
          {log}
        </div>
      ))}
    </div>
  )
}

const MatrixRain = () => {
  const [chars, setChars] = useState<string[]>([])

  useEffect(() => {
    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const interval = setInterval(() => {
      setChars((prev) => {
        const newChars = [...prev]
        for (let i = 0; i < 5; i++) {
          newChars.push(characters[Math.floor(Math.random() * characters.length)])
        }
        return newChars.slice(-50)
      })
    }, 100)

    setTimeout(() => clearInterval(interval), 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center">
      <div className="text-olive font-mono text-sm animate-pulse">{chars.join(" ")}</div>
    </div>
  )
}

const Glitch404 = () => {
  const [glitched, setGlitched] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setGlitched(false), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${glitched ? "animate-pulse text-destructive" : "text-sage"}`}>
        {glitched ? "4̷0̸4̵" : "404"}
      </div>
      {!glitched && <p className="text-sage mt-2">Not everything needs an answer.</p>}
    </div>
  )
}

const SouthIndia = () => {
  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">🌴 🥤</div>
      <p className="text-sage">Filter coffee. First principles.</p>
    </div>
  )
}

const Bengaluru = () => {
  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">🏙️</div>
      <p className="text-sage">Bangalore: build capital.</p>
    </div>
  )
}

const Wanderer = () => {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 20)
    }, 200)

    setTimeout(() => clearInterval(interval), 3000)
    return () => clearInterval(interval)
  }, [])

  const footprints = "👣".repeat(position) + " ".repeat(20 - position)

  return (
    <div className="text-center">
      <div className="font-mono text-sm">{footprints}</div>
    </div>
  )
}

const CoinFlip = () => {
  const result = Math.random() < 0.5 ? "Heads" : "Tails"

  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">🪙</div>
      <p className="text-terracotta font-bold">{result}</p>
    </div>
  )
}

const DiceRoll = () => {
  const result = Math.floor(Math.random() * 6) + 1
  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]

  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">{diceFaces[result - 1]}</div>
      <p className="text-terracotta font-bold">{result}</p>
    </div>
  )
}

const Fortune = () => {
  const fortunes = ["Play positive‑sum games.", "Consistency compounds.", "Ship, then sharpen."]

  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]

  return (
    <div className="text-center">
      <p className="text-terracotta italic">{randomFortune}</p>
    </div>
  )
}

const Glitch = () => {
  const [isGlitching, setIsGlitching] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsGlitching(false), 400)
    return () => clearTimeout(timer)
  }, [])

  if (isGlitching) {
    return (
      <div className="text-center animate-pulse">
        <div className="text-destructive">█▓▒░ GLITCH ░▒▓█</div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <p className="text-sage">System restored.</p>
    </div>
  )
}

const Portal = () => {
  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">🚪</div>
      <p className="text-sage">See you in another loop.</p>
    </div>
  )
}

// Export all easter egg commands
export const EasterEggs: Command[] = [
  {
    name: "turntable",
    description: "Spin the record",
    category: "Easter Eggs",
    execute: () => ({ content: <TurntableAnimation /> }),
  },
  {
    name: "linkinpark",
    description: "What I've done",
    category: "Easter Eggs",
    execute: () => ({ content: <LinkinParkPulse /> }),
  },
  {
    name: "vinyl",
    description: "Pull from the crate",
    category: "Easter Eggs",
    execute: () => ({ content: <VinylCrate /> }),
  },
  {
    name: "slapbump",
    description: "Ready to roll",
    category: "Easter Eggs",
    execute: () => ({ content: <SlapBump /> }),
  },
  {
    name: "tapout",
    description: "Respect the tap",
    category: "Easter Eggs",
    execute: () => ({ content: <TapOut /> }),
  },
  {
    name: "oss",
    description: "Martial arts respect",
    category: "Easter Eggs",
    execute: () => ({ content: <OssEcho /> }),
  },
  {
    name: "rangoli",
    description: "Fractal patterns",
    category: "Easter Eggs",
    execute: () => ({ content: <RangoliBloom /> }),
  },
  {
    name: "entropy",
    description: "Order from chaos",
    category: "Easter Eggs",
    execute: () => ({ content: <EntropyScramble /> }),
  },
  {
    name: "meditation",
    description: "Random haiku",
    category: "Easter Eggs",
    execute: () => ({ content: <MeditationHaiku /> }),
  },
  {
    name: "polymath",
    description: "Many branches",
    category: "Easter Eggs",
    execute: () => ({ content: <PolymathTree /> }),
  },
  {
    name: "compile",
    description: "Building systems",
    category: "Easter Eggs",
    execute: () => ({ content: <CompileProgress /> }),
  },
  {
    name: "deploy",
    description: "Ship it",
    category: "Easter Eggs",
    execute: () => ({ content: <DeployLogs /> }),
  },
  {
    name: "matrix",
    description: "Digital rain",
    category: "Easter Eggs",
    execute: () => ({ content: <MatrixRain /> }),
  },
  {
    name: "404",
    description: "Not found",
    category: "Easter Eggs",
    execute: () => ({ content: <Glitch404 /> }),
  },
  {
    name: "southindia",
    description: "Filter coffee culture",
    category: "Easter Eggs",
    execute: () => ({ content: <SouthIndia /> }),
  },
  {
    name: "bengaluru",
    description: "Build capital",
    category: "Easter Eggs",
    execute: () => ({ content: <Bengaluru /> }),
  },
  {
    name: "wanderer",
    description: "Footprints in motion",
    category: "Easter Eggs",
    execute: () => ({ content: <Wanderer /> }),
  },
  {
    name: "coinflip",
    description: "Heads or tails",
    category: "Easter Eggs",
    execute: () => ({ content: <CoinFlip /> }),
  },
  {
    name: "dice",
    description: "Roll the dice",
    category: "Easter Eggs",
    execute: () => ({ content: <DiceRoll /> }),
  },
  {
    name: "fortune",
    description: "Words of wisdom",
    category: "Easter Eggs",
    execute: () => ({ content: <Fortune /> }),
  },
  {
    name: "glitch",
    description: "System anomaly",
    category: "Easter Eggs",
    execute: () => ({ content: <Glitch /> }),
  },
  {
    name: "portal",
    description: "Another dimension",
    category: "Easter Eggs",
    execute: () => ({ content: <Portal /> }),
  },
]
