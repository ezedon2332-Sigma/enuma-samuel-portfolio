import { designWork, properties } from '../data/content'

import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Specialities from '../components/Specialities'
import Projects from '../components/Projects'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
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
        shape="photo"
      />

      <About />
      <Contact />
    </>
  )
}
