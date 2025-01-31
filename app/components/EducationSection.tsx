'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EducationSectionProps {
  education: {
    degree: string
    institution: string
    period: string
    details: string
  }[]
}

const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Education</h2>
      <div className="space-y-4 sm:space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-base sm:text-lg font-semibold">{edu.degree}</span>
                  <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
                    {edu.period}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-sm sm:text-base font-semibold mb-1">{edu.institution}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{edu.details}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default EducationSection

