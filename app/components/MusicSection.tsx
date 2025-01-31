'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GigListPopup from './GigListPopup'

interface MusicSectionProps {
  musicData: {
    liveShows: string
    vinylCollection: string
    documentary: {
      title: string
      description: string
      link: string
    }
  }
}

const MusicSection = ({ musicData }: MusicSectionProps) => {
  const [isGigListOpen, setIsGigListOpen] = useState(false)
  const [isVinylListOpen, setIsVinylListOpen] = useState(false)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Live Shows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Live music has always been my escape and inspiration. What started as a college student sneaking into gigs with bartered odd jobs became a lifelong passion for supporting the indie music scene. From roadie to sound engineer, artist manager to festival organizer, every step was driven by a love for the energy, connection, and creativity that live music brings. Years later, this would be the reason why I built CultureCo!
            </p>
            <Button onClick={() => setIsGigListOpen(true)}>
              The Gig List
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Vinyl Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">When I went to the US to do my masters, I was suddenly devoid of all the live music that I was exposed to. So I started collecting vinyls. Yet another expensive rabbithole that I dived into, but I love expressing my eccentric tastes through the records I collect.</p>
            <Button onClick={() => setIsVinylListOpen(true)}>
              The Vinyl List
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Documentary Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Somewhere in the middle of the indie scene, I got the opportunity to work on a documentary on the history of Indian Indie music. I went to the houses of so many iconic Indian artists, dug through their archives of photo albums, CDs and tapes and spent endless hours grinning away at so many wonderful moments from Indian music history. Very few of what I've seen made it into the B-Roll of the documentary, but I still highly recommend you watch it.</p>
            <Button asChild>
              <Link href={musicData.documentary.link} target="_blank" rel="noopener noreferrer">
                Standing By - 6 Ep Docuseries
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <GigListPopup isOpen={isGigListOpen} onClose={() => setIsGigListOpen(false)} />
      {/* Placeholder for future Vinyl List Popup */}
      {/* <VinylListPopup isOpen={isVinylListOpen} onClose={() => setIsVinylListOpen(false)} /> */}
    </div>
  )
}

export default MusicSection

