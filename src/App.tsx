import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useSmoothScroll } from './lib/hooks'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'

/**
 * Nav and footer links point at "/#section". On the home page that is a hash
 * change React Router will not scroll for; from a case study it is a route
 * change. This handles both, once the target actually exists.
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      if (pathname === '/') return
      window.scrollTo(0, 0)
      return
    }
    // wait a frame so the destination route has rendered
    const id = requestAnimationFrame(() => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}

function Shell() {
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

      <ScrollToHash />
      <Nav />

      <div className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<CaseStudy />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
