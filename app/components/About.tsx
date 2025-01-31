'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image 
              src="/placeholder.svg" 
              alt="Dhruva Chakravarthi" 
              width={400} 
              height={400} 
              className="rounded-full shadow-lg"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Hi, I'm Dhruva Chakravarthi — Technologist, Entrepreneur, Creator.</h3>
            <p className="mb-4">
              My professional journey has been an exciting blend of technology and innovation. From my early days in computer science to founding CultureCo, I've always been driven by the desire to solve real-world problems through technology and empathy.
            </p>
            <p className="mb-4">
              Core Value: "Tech meets empathy to solve real-world problems."
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Organized 50+ gigs for indie artists</li>
              <li>Delivered 1000+ NFTs for major brands</li>
              <li>5 years of Jiu-Jitsu training</li>
              <li>3 hackathon wins</li>
            </ul>
            <a href="#work" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
              Check Out My Work
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

