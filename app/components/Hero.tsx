'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import IdentityCarousel from './IdentityCarousel'

export default function Hero() {
  return (
    <section className="section-padding text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 sm:space-y-12"
      >
        <motion.h1 
          className="heading-responsive"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hi, this is
        </motion.h1>
        <IdentityCarousel />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button asChild size="lg" className="inline-flex items-center">
            <a href="https://calendar.app.google/586qyoAWdRjQMcB1A" target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" />
              Quick Catchup
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

