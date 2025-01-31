import { Metadata } from 'next'
import SkillsSection from '../components/SkillsSection'
import EducationSection from '../components/EducationSection'

export const metadata: Metadata = {
  title: 'Skills & Education | Dhruva Chakravarthi',
  description: 'Dhruva Chakravarthi\'s technical skills and educational background.',
}

const skills = [
  {
    category: "Programming",
    items: ["Python", "C++", "MERN Stack", "Solidity", "SQL"]
  },
  {
    category: "Blockchain",
    items: ["NFTs", "Layer 2 solutions", "ZK"]
  },
  {
    category: "Tools",
    items: ["AWS", "GitHub", "Notion", "Figma", "Salesforce", "Mulesoft"]
  },
  {
    category: "Business & Management",
    items: ["Agile & Project Management", "Partnerships & Strategy", "Hiring & Fundraising"]
  }
]

const education = [
  {
    degree: "MS, Computer Science",
    institution: "Syracuse University, NY",
    period: "2016 - 2017",
    details: "Major in Machine Learning and Game Theory, Early Graduation, Summa Cum Laude"
  },
  {
    degree: "BE, Computer Science",
    institution: "BNMIT, Bangalore",
    period: "2012 - 2016",
    details: "Focused on core computer science principles and software engineering"
  }
]

export default function SkillsPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12">Skills & Education</h1>
      <SkillsSection skills={skills} />
      <EducationSection education={education} />
    </div>
  )
}

