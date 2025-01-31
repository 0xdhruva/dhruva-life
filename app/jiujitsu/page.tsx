import { Metadata } from 'next'
import JiuJitsuSection from '../components/JiuJitsuSection'

export const metadata: Metadata = {
  title: 'Jiu Jitsu | Dhruva Chakravarthi',
  description: 'Dhruva Chakravarthi\'s journey in Jiu Jitsu, including competitions, community involvement, and photography.',
}

const jiujitsuData = {
  rank: "White belt, 3 stripe",
  gyms: [
    { name: "Institute of Jiu Jitsu", url: "https://instituteofjiujitsu.com/" },
    { name: "Flamingo Jiu Jitsu", url: "https://www.flamingojiujitsu.com/" },
    { name: "Kaizen MMA", url: "https://www.kaizenmma.in/" }
  ],
  competitions: [
    { name: "Strangle Nationals (Delhi) 2022", result: "L" },
    { name: "ADCC Nationals (Delhi) 2022", result: "WL" },
    { name: "PKD Open (Mysore) 2023", result: "WWLWL" },
  ],
  photography: {
    description: "I take photos when I'm injured and can't train, or when I'm competing to capture my friends when they're looking good",
    link: "https://www.instagram.com/dhrujitsu",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dhrujitsu%20screenshot.jpg-D6CzYvR5LUF4MyDchNCZcNq4614dyA.jpeg"
  },
  events: [
    { 
      name: "IJJ Community Day 2023", 
      link: "https://www.instagram.com/instituteofjiujitsu/p/CwkAjq6rWOb/",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ijj%20cday%20screenshot.jpg-IG9OaGIhhF4PTbY4nELjQd6Iw2C7ul.jpeg"
    }
  ]
}

export default function JiuJitsuPage() {
  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Jiu Jitsu</h1>
      <JiuJitsuSection jiujitsuData={jiujitsuData} />
    </div>
  )
}

