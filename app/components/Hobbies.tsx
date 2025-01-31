'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const hobbies = [
  {
    name: "Indie Music",
    description: "Passionate about indie music, from attending live shows to collecting vinyl records.",
    details: [
      "Produced a documentary on the local indie music scene",
      "Attended over 100 live shows",
      "Curated a vinyl collection of 500+ records"
    ],
    image: "/placeholder.svg"
  },
  {
    name: "Jiu-Jitsu",
    description: "Dedicated practitioner of Jiu-Jitsu, competing and training regularly.",
    details: [
      "5 years of consistent training",
      "Participated in multiple tournaments",
      "Achieved blue belt rank"
    ],
    image: "/placeholder.svg"
  },
  {
    name: "Art Exhibitions",
    description: "Actively involved in curating and organizing art exhibitions.",
    details: [
      "Curated 3 successful exhibitions",
      "Collaborated with 20+ emerging artists",
      "Specialized in digital and mixed media art"
    ],
    image: "/placeholder.svg"
  }
]

const Hobbies = () => {
  const [selectedHobby, setSelectedHobby] = useState<number | null>(null)

  return (
    <section id="hobbies" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hobbies & Interests
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <motion.div 
              key={hobby.name}
              className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedHobby(index)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image 
                src={hobby.image} 
                alt={hobby.name} 
                width={400} 
                height={300} 
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2">{hobby.name}</h3>
                <p>{hobby.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedHobby !== null && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHobby(null)}
          >
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg max-w-lg w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold mb-4">{hobbies[selectedHobby].name}</h3>
              <p className="mb-4">{hobbies[selectedHobby].description}</p>
              <ul className="list-disc list-inside">
                {hobbies[selectedHobby].details.map((detail, index) => (
                  <li key={index} className="mb-2">{detail}</li>
                ))}
              </ul>
              <button 
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSelectedHobby(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hobbies

