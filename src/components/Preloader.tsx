import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content'

/** Counts to 100 while fonts and the WebGL chunk settle, then lifts away. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      onDone()
      return
    }

    const start = performance.now()
    const DURATION = 1500
    let raf = 0

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setGone(true)
        onDone()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04060f]"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-display text-[clamp(2rem,6vw,3.4rem)] font-black tracking-tight text-white"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {profile.initials}
          </motion.span>

          <span className="mt-4 h-px w-52 overflow-hidden bg-white/10">
            <span
              className="block h-full bg-gradient-to-r from-[#1d5cff] to-[#6fb4ff] transition-none"
              style={{ width: `${pct}%` }}
            />
          </span>

          <span className="mt-3 font-display text-[0.7rem] font-medium tracking-[0.34em] text-[#8f9ec4] tabular-nums">
            {String(pct).padStart(3, '0')}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
