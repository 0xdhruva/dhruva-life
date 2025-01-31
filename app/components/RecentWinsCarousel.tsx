'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Rocket, Github, Clock, Trophy, Dumbbell } from 'lucide-react'
import Link from 'next/link'

interface Win {
  title: string
  link: string
  Icon: React.ComponentType<any>
}

const wins: Win[] = [
  {
    title: "Azuki India Launch!",
    link: "https://x.com/iamgaurangdesai/status/1878460156574564570",
    Icon: Rocket
  },
  {
    title: "CultureCo is now open source",
    link: "https://github.com/orgs/cultureco-xyz/repositories",
    Icon: Github
  },
  {
    title: "Building an app in 24 hours",
    link: "https://github.com/0xdhruva",
    Icon: Clock
  },
  {
    title: "CultureCo wins Based India Hackathon!",
    link: "https://devfolio.co/projects/cultureco-93eb",
    Icon: Trophy
  },
  {
    title: "Flamingo In-House Tournament",
    link: "https://www.instagram.com/reel/DCB_Rk3SzRn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    Icon: Dumbbell
  }
]

export default function RecentWinsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % wins.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const currentWin = wins[currentIndex]
  const Icon = currentWin.Icon

  return (
    <div className="bg-secondary py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Recently in dhruva.life</h2>
        <div className="relative min-h-[4rem] sm:min-h-[3.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Link 
                href={currentWin.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-background/10 rounded-lg p-4 hover:bg-background/20 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <Icon className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-lg font-medium line-clamp-2">{currentWin.title}</span>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 ml-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

