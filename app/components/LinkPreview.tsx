'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink } from 'lucide-react'

interface LinkPreviewProps {
  url: string
  label: string
}

const cache: Record<string, { data: string; timestamp: number }> = {}
const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : null
}

const getFallbackImage = (url: string) => {
  // YouTube videos
  const youtubeId = getYouTubeVideoId(url)
  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  // Specific OpenSea NFTs
  if (url.includes('0x91f311e31319fe79d6aca4a898cd6a00e12c3d23/566')) {
    return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/basedindia-IAiH02OhWlMRKY1Za8uzGMHC7I1eGb.png'
  }
  if (url.includes('0x59ca61566c03a7fb8e4280d97bfa2e8e691da3a6/985')) {
    return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/onchainsummer-0iqwehvqhv1KjhLL2VB6XwIe4YhPLG.png'
  }
  if (url.includes('0x61c594b34341e2f3f0db05e0d6bd30980c94df7b/1')) {
    return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kathakali-3fEccVGLrGFzbCsfT4fReRShriZAab.png'
  }

  // Default OpenSea fallback
  if (url.includes('opensea.io')) {
    return 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png'
  }

  return '/placeholder.svg'
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, label }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOgImage = async () => {
      try {
        setIsLoading(true)

        // Check cache first
        const cachedData = cache[url]
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
          setImageUrl(cachedData.data)
          setIsLoading(false)
          return
        }

        // Get fallback image first
        const fallbackImage = getFallbackImage(url)

        // For certain URLs, use fallback images directly
        if (url.includes('opensea.io') || url.includes('devfolio.co') || url.includes('youtube.com') || url.includes('youtu.be')) {
          cache[url] = { data: fallbackImage, timestamp: Date.now() }
          setImageUrl(fallbackImage)
          setIsLoading(false)
          return
        }

        // Try to fetch OG image
        try {
          const res = await fetch(`/api/og-image?url=${encodeURIComponent(url)}`)
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
          const data = await res.json()
          if (data.ogImage) {
            cache[url] = { data: data.ogImage, timestamp: Date.now() }
            setImageUrl(data.ogImage)
            return
          }
        } catch (error) {
          console.error('Error fetching OG image:', error)
        }


        // If OG image fetch fails, use fallback
        cache[url] = { data: fallbackImage, timestamp: Date.now() }
        setImageUrl(fallbackImage)
      } catch (error) {
        console.error('Error in link preview:', error)
        setImageUrl('/placeholder.svg')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOgImage()
  }, [url])

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          {isLoading ? (
            <Skeleton className="w-full h-40" />
          ) : (
            <div className="relative w-full h-40">
              <Image
                src={imageUrl || '/placeholder.svg'}
                alt={label}
                fill
                className="object-cover"
                onError={() => setImageUrl('/placeholder.svg')}
              />
            </div>
          )}
          <div className="p-4">
            <p className="font-medium">{label}</p>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export default LinkPreview

