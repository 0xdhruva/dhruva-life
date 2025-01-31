import { Metadata } from 'next'
import WorkExperience from '../components/WorkExperience'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Work | dhruva.life',
  description: 'Dhruva Chakravarthi\'s professional journey through CultureCo, Dehidden, and PwC.',
}

const workExperiences = [
  {
    company: "CultureCo",
    role: "Founder",
    period: "2023 - Present",
    description: "I decided to go back to my roots and become a Community Founder for the indie artists who've enriched my life with so much art. I built CultureCo as a love letter to these artists, gifting them with the commerce tools that helps them create better businesses for themselves. We won 2 hackathons while building the best product we could, then open sourced it and handed it off to the community. Now we continue educating them on the tech and money behind the art, and helping them stay independent.",
    achievements: [
      "Built a full fledged commerce stack for artists",
      "Launched with 25 artists for alpha testing",
      "Won 2 hackathons and grants for $15k+",
      "Educating a community of 1000+ artists to build independent businesses"
    ],
    links: [
      { label: "CultureCo Website", url: "https://cultureco.xyz" },
      { label: "CultureCo Demo", url: "https://www.youtube.com/watch?v=wX3PK9U061I" },
      { label: "Based India Hackathon Winner", url: "https://opensea.io/assets/base/0x91f311e31319fe79d6aca4a898cd6a00e12c3d23/566" },
      { label: "Onchain Summer Hackathon Winner", url: "https://opensea.io/assets/base/0x59ca61566c03a7fb8e4280d97bfa2e8e691da3a6/985" },
    ],
  },
  {
    company: "Dehidden",
    role: "Founder",
    period: "2021 - 2023",
    description: "I've been in the crypto space since 2016, and with the NFT boom in 2020, I wanted to build useful NFTs for creators - so Dehidden was born. We worked with brands and artists together to innovate and architect the most creative NFT we could. We ended up building some of the earliest NFT tech that are standard across the industry today like open editions, generative NFTs, community quests, etc. In the end, we built a self service toolkit for brands to use and I sold the company to a Polygon subsidiary who utilised the tech specifically for the entertainment industry.",
    achievements: [
      "Worked with 75+ clients including AdidasxPrada, Coinbase Wallet, NFTNYC, Polygon Studios, Mercedes Benz, Team Liquid, etc",
      "Brought 1M+ real wallets, $1.5M+ NFT mints, and $500M+ TVL to Polygon chain",
      "Raised 2 rounds of funding and sold the company to Polygon in 2023"
    ],
    links: [
      { label: "Dehidden Website", url: "https://dehidden.com/" },
      { label: "AdidasxPrada NFT", url: "https://superrare.com/artwork/eth/0xf17639e75cb36b24f0024ac8b2db9426512d7988/adidas-for-prada-re-source-by-zach-lieberman-1" },
      { label: "Coinbase Kathakali", url: "https://opensea.io/assets/matic/0x61c594b34341e2f3f0db05e0d6bd30980c94df7b/1" },
      { label: "NFTNYCxPolygon", url: "https://www.nft.nyc/nftnyc2023" }
    ],
  },
  {
    company: "PwC US",
    role: "Technology Consultant",
    period: "2018 - 2021",
    description: "My first job in the real world was a Technology Consultant at PwC, and I'll be honest, as a techie I really didn't know what consulting was. Over the course of 4 years, I worked with numerous enterprise systems and learned a lot about how big businesses run and what consulting really was. I got to work with some incredible teams, wonderful clients, and travel around the world building tech that cut costs and made money.",
    achievements: [
      "Enabled a successful $3.5B M&A by handling the entire tech transition",
      "Developed a major enterprise sales app that is used in almost every store in North America today",
      "Integrated an enterprise system across 36 countries and 157 firms"
    ],
    links: [
      { label: "FLNA Sales Hub & Contracts", url: "https://www.pwc.com/us/en/library/case-studies/pepsico-case-study.html" },
      { label: "Jacobs - Worley Divestiture", url: "https://www.jacobs.com/newsroom/press-release/jacobs-accelerates-portfolio-transformation-sale-energy-chemicals-and" },
    ],
  },
]

export default function WorkPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-4xl font-bold">Professional Work</h1>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <a href="https://www.canva.com/design/DAGaAEIzf4M/zbbYaBM67I5tGB7v5l9f-w/view?utm_content=DAGaAEIzf4M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h58d7f3e7e1" target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" /> Resume
          </a>
        </Button>
      </div>
      <div className="space-y-8 sm:space-y-12">
        {workExperiences.map((experience, index) => (
          <WorkExperience key={index} {...experience} />
        ))}
      </div>
    </div>
  )
}

