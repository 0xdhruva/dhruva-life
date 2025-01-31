import { Metadata } from 'next'
import MusicSection from '../components/MusicSection'

export const metadata: Metadata = {
  title: 'Music | Dhruva Chakravarthi',
  description: 'Dhruva Chakravarthi\'s passion for music, including live shows, vinyl collection, and documentary work.',
}

const musicData = {
  liveShows: "200+ unique artists seen live",
  vinylCollection: "Extensive collection of indie music vinyls",
  documentary: {
    title: "Standing By",
    description: "A 6-part series on the history of Indian Indie music",
    link: "https://youtube.com/playlist?list=PLFjVgWL7NKUlbc6ELjjgqOeh1zy2-GUuC&si=ai--0YQQrziLXxUF"
  }
}

export default function MusicPage() {
  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">Music</h1>
      <MusicSection musicData={musicData} />
    </div>
  )
}

