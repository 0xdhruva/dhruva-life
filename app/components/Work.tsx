'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const workExperience = [
  {
    company: "CultureCo",
    role: "Founder",
    description: "Leading innovation in cultural technology solutions.",
    achievements: [
      "Developed blockchain-based ticketing system",
      "Launched NFT marketplace for artists",
      "Secured partnerships with major music festivals"
    ],
    image: "/placeholder.svg"
  },
  {
    company: "Dehidden",
    role: "NFT Specialist",
    description: "Spearheaded NFT collaborations with global brands.",
    achievements: [
      "Delivered NFT projects for AdidasxPrada",
      "Managed Mercedes NFT campaign",
      "Innovated NFT distribution methods"
    ],
    image: "/placeholder.svg"
  },
  {
    company: "PwC",
    role: "Technology Consultant",
    description: "Led digital transformation projects for Fortune 500 clients.",
    achievements: [
      "Streamlined M&A technology transitions",
      "Implemented cost-saving contracting applications",
      "Executed Salesforce integration, improving efficiency by 40%"
    ],
    image: "/placeholder.svg"
  }
]

const Work = () => {
  return (
    <section id="work" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Professional Work
        </motion.h2>
        <div className="space-y-16">
          {workExperience.map((job, index) => (
            <motion.div 
              key={job.company}
              className="flex flex-col md:flex-row items-center bg-gray-700 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="md:w-1/3">
                <Image 
                  src={job.image} 
                  alt={job.company} 
                  width={400} 
                  height={300} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-2xl font-semibold mb-2">{job.company}</h3>
                <h4 className="text-xl text-blue-400 mb-4">{job.role}</h4>
                <p className="mb-4">{job.description}</p>
                <ul className="list-disc list-inside">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work

