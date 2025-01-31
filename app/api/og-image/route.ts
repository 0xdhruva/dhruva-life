import { NextResponse } from 'next/server'
import { parse } from 'node-html-parser'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      timeout: 5000 // 5 seconds timeout
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const html = await response.text()
    const root = parse(html)
    
    // Try to find OG image
    let ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute('content')
    
    // If no OG image, try to find the first image on the page
    if (!ogImage) {
      const firstImage = root.querySelector('img')
      ogImage = firstImage?.getAttribute('src')
    }

    if (ogImage) {
      // Ensure the image URL is absolute
      if (!ogImage.startsWith('http')) {
        const baseUrl = new URL(url).origin
        ogImage = new URL(ogImage, baseUrl).toString()
      }
      return NextResponse.json({ ogImage })
    } else {
      // If no image found, return a default placeholder
      return NextResponse.json({ ogImage: '/placeholder.svg' })
    }
  } catch (error) {
    console.error('Error fetching image:', error)
    // Return a default placeholder in case of any error
    return NextResponse.json({ 
      ogImage: '/placeholder.svg',
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 200 }) // Still return 200 to prevent breaking the UI
  }
}

