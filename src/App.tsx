import { useState } from 'react'
import { designWork, properties } from './data/content'
import { useSmoothScroll } from './lib/hooks'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Specialities from './components/Specialities'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  useSmoothScroll()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />

      <a
        href="#skills"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-lg focus:bg-[#1d5cff] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Nav />

      <main
        className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      >
        <Hero />
        <Marquee />
        <Specialities />
        <Projects />

        <Gallery
          id="design"
          eyebrow="Gallery"
          title="Creative "
          accent="design work"
          body="Brand campaigns, product ads and social creatives — designed end to end."
          items={designWork}
        />

        <Gallery
          id="properties"
          eyebrow="Properties"
          title="Real estate "
          accent="portfolio"
          body="Homes and developments handled — sales, marketing and buyer management across Lagos and Ibadan."
          items={properties}
          columns="wide"
        />

        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
