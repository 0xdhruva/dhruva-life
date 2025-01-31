'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LinkPreview from './LinkPreview'

interface Event {
  title: string
  year: string
  image?: string
  link?: string
}

const events: Event[] = [
  {
    title: "IJJ Community Day",
    year: "2023",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ijj%20cday%20screenshot.jpg-929JINPX4IDJyLQipu1OmaWBLdjMi4.jpeg",
    link: "https://www.instagram.com/instituteofjiujitsu/p/CwkAjq6rWOb/"
  },
  {
    title: "Warriors in the Garden",
    year: "2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garden.jpg-BlSnoVEhTgtxPKWFwXIpRQnyHTPooi.jpeg",
    link: "https://www.instagram.com/flamingo.jiujitsu/p/C-Fl8K_yqdh/?img_index=1"
  },
  {
    title: "12R Crypto Fight Night",
    year: "2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12R.jpg-3weGP7gP7q5naq1UrmAT2IgnQc4p0k.jpeg",
    link: "https://x.com/IPBLBoxing/status/1871523135251444067"
  }
]

interface JiuJitsuSectionProps {
  jiujitsuData: {
    rank: string
    gyms: { name: string; url: string }[]
    competitions: { name: string; result: string }[]
    photography: {
      description: string
      link: string
      image: string
    }
  }
}

const JiuJitsuSection = ({ jiujitsuData }: JiuJitsuSectionProps) => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Training at</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {jiujitsuData.gyms.map((gym, index) => (
                <LinkPreview key={index} url={gym.url} label={gym.name} />
              ))}
            </div>
            <div>
              <Badge variant="secondary" className="text-lg">
                {jiujitsuData.rank}
              </Badge>
            </div>
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
            <CardTitle>Competitions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competition</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jiujitsuData.competitions.map((comp, index) => (
                  <TableRow key={index}>
                    <TableCell>{comp.name}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {comp.result.split('').map((result, i) => (
                          <span
                            key={i}
                            className={`inline-block w-6 h-6 rounded-full mr-1 ${
                              result === 'W' ? 'bg-green-500' : 'bg-red-500'
                            } text-white text-xs font-bold flex items-center justify-center`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
            <CardTitle>Photography</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-base text-muted-foreground mb-4">{jiujitsuData.photography.description}</p>
              <Link href={jiujitsuData.photography.link} target="_blank" rel="noopener noreferrer">
                <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                  <Image
                    src={jiujitsuData.photography.image}
                    alt="Jiu Jitsu Photography"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Community Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-8">
              The spirit of community in me never dies. I found the Jiu Jitsu mats were filled with artists, 
              founders, crypto peeps, and a lot of other interesting people united by a sense of self development. 
              A strong reason to bring worlds together!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">
                    {event.title} ({event.year})
                  </h3>
                  {event.image ? (
                    <Link href={event.link || '#'} target="_blank" rel="noopener noreferrer">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                        <Image
                          src={event.image}
                          alt={`${event.title} event`}
                          fill
                          className="object-cover hover:opacity-90 transition-opacity"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">Image coming soon</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default JiuJitsuSection

