'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Briefcase, GraduationCapIcon as Graduation, Music, Dumbbell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    title: "Professional Work",
    icon: Briefcase,
    description: "From Strategy to Startup",
    href: "/work",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Skills & Education",
    icon: Graduation,
    description: "Mastering Tech and Business",
    href: "/skills",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Music & Art",
    icon: Music,
    description: "Cultural Innovator",
    href: "/music",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Jiu Jitsu",
    icon: Dumbbell,
    description: "The Warrior's Way",
    href: "/jiujitsu",
    color: "from-green-500 to-emerald-500"
  }
]

const CategoryCards = () => {
  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={category.href}>
              <Card className="group cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  <motion.div 
                    className={`bg-gradient-to-r ${category.color} p-6 transition-all duration-300 group-hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className="h-8 w-8 mb-4 text-white" />
                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-white/90">{category.description}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CategoryCards

