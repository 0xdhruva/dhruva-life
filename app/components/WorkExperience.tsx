'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import LinkPreview from './LinkPreview'

interface WorkExperienceProps {
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  links: { label: string; url: string }[]
}

const WorkExperience = ({ company, role, period, description, achievements, links }: WorkExperienceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold">{company}</CardTitle>
              <div className="mt-1 sm:mt-2">
                <Badge variant="secondary" className="text-sm sm:text-base font-semibold px-2 py-1">
                  {role}
                </Badge>
              </div>
            </div>
            <Badge variant="outline" className="text-xs sm:text-sm w-fit">
              {period}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
          <div>
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Key Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Related Links:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {links.map((link, index) => (
                <LinkPreview key={index} url={link.url} label={link.label} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default WorkExperience

