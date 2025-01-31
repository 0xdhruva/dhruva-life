'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as React from 'react';
import { Code, Database, PenToolIcon as Tool, Briefcase } from 'lucide-react'

interface SkillsSectionProps {
  skills: {
    category: string
    items: string[]
  }[]
}

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'Programming':
      return Code
    case 'Blockchain':
      return Database
    case 'Tools':
      return Tool
    case 'Business & Management':
      return Briefcase
    default:
      return Code
  }
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <section className="mb-8 sm:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Technical Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {skills.map((skillCategory, index) => (
          <motion.div
            key={skillCategory.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  {React.createElement(getIconForCategory(skillCategory.category), { className: 'mr-2 h-4 w-4 sm:h-5 sm:w-5' })}
                  {skillCategory.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs sm:text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection

