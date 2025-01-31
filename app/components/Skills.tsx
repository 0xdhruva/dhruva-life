'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    name: "Programming",
    skills: ["Python", "C++", "MERN Stack", "Solidity", "SQL"]
  },
  {
    name: "Blockchain",
    skills: ["NFTs", "Layer 2 solutions", "ZK"]
  },
  {
    name: "Tools",
    skills: ["AWS", "GitHub", "Notion", "Figma", "Salesforce", "Mulesoft"]
  },
  {
    name: "Business & Management",
    skills: ["Agile & Project Management", "Partnerships & Strategy", "Hiring & Fundraising"]
  }
]

const education = [
  {
    degree: "MS, Computer Science",
    institution: "Syracuse University, NY",
    details: "Major in Machine Learning and Game Theory, Early Graduation, Summa Cum Laude"
  },
  {
    degree: "BE, Computer Science",
    institution: "BNMIT, Bangalore",
    details: ""
  }
]

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Education
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.name}
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
              <ul className="list-disc list-inside">
                {category.skills.map((skill, i) => (
                  <li key={i} className="mb-2">{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div>
          <h3 className="text-3xl font-semibold text-center mb-8">Education</h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div 
                key={edu.degree}
                className="bg-gray-800 p-6 rounded-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h4 className="text-xl font-semibold mb-2">{edu.degree}</h4>
                <p className="text-lg mb-2">{edu.institution}</p>
                {edu.details && <p className="text-gray-400">{edu.details}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

