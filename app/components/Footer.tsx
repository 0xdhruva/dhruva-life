import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Dhruva Chakravarthi. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/#about" className="hover:text-gray-300">About</Link>
            <Link href="/#work" className="hover:text-gray-300">Work</Link>
            <Link href="/#skills" className="hover:text-gray-300">Skills</Link>
            <Link href="/#hobbies" className="hover:text-gray-300">Hobbies</Link>
            <Link href="/#contact" className="hover:text-gray-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

