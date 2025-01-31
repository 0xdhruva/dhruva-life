import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { SmoothScroll } from './components/SmoothScroll'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'dhruva.life',
  description: 'Personal website of Dhruva Chakravarthi - Building technology with empathy, practicing Jiu-Jitsu, and supporting indie artists.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 content-padding max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <SmoothScroll />
        </div>
      </body>
    </html>
  )
}

