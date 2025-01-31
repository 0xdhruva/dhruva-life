'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Identity {
  name: string
  image: string
  description: string
  emojis: string
}

const identities: Identity[] = [
  {
    name: "Dhruva",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6694.jpg-ansTHbjWlnnxs00aVyQxv7TVc8aGmb.jpeg",
    description: "The Professional",
    emojis: "🤝💰💻"
  },
  {
    name: "dhrude",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0001.jpg-jDI6WTmIuJiXe5Iu87yJ8cyZNalKPe.jpeg",
    description: "The Artist",
    emojis: "🎸📸🎨"
  },
  {
    name: "0xdhruva",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0759.jpg-9WyoMgDfcANxha3yp661LQW8vqYmyd.jpeg",
    description: "The Builder",
    emojis: "👨‍💻🛠️🤖"
  },
  {
    name: "dhrujitsu",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6993.jpg-b2lXU9RoasCbjkrTArmo02MQQRjete.jpeg",
    description: "The Fighter",
    emojis: "🥋🏋️🧘‍♂️"
  }
]

export default function IdentityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % identities.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const currentIdentity = identities[currentIndex]

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={currentIdentity.image}
              alt={currentIdentity.name}
              fill
              className="rounded-full object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="subheading-responsive mb-2">{currentIdentity.name}</h2>
          <p className="text-responsive text-muted-foreground mb-2">{currentIdentity.description}</p>
          <p className="text-2xl">{currentIdentity.emojis}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

