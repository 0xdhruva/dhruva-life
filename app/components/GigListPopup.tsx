'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface GigListPopupProps {
  isOpen: boolean
  onClose: () => void
}

interface GigData {
  id: string
  artist: string
}

const GigListPopup: React.FC<GigListPopupProps> = ({ isOpen, onClose }) => {
  const [gigData, setGigData] = useState<GigData[]>([])

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Gig%20List-zVc8TZ9eLBWTtxidiKN2zrBO2uBabd.csv')
        const text = await response.text()
        const rows = text.split('\n').slice(1) // Skip header row
        const parsedData = rows.map(row => {
          const [id, artist] = row.split(',')
          return { id: id.trim(), artist: artist.trim() }
        })
        setGigData(parsedData)
      } catch (error) {
        console.error('Error fetching gig data:', error)
      }
    }

    if (isOpen) {
      fetchGigData()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">The Gig List</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-4rem)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Artist</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gigData.map((gig) => (
                    <TableRow key={gig.id}>
                      <TableCell className="font-medium">{gig.id}</TableCell>
                      <TableCell>{gig.artist}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GigListPopup

