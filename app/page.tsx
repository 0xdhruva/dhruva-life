import Hero from './components/Hero'
import RecentWinsCarousel from './components/RecentWinsCarousel'
import CategoryCards from './components/CategoryCards'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <RecentWinsCarousel />
      <CategoryCards className="container mx-auto px-4" />
    </div>
  )
}

