import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../lib/hooks'

/**
 * A two-part cursor: a small solid dot that tracks exactly, and a larger ring
 * that lags behind and swells over anything interactive.
 * Pointer-device only — hidden on touch and when reduced motion is requested.
 */
export default function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.45 })
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.45 })

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement
      setHot(Boolean(el?.closest?.('a, button, [data-cursor="hot"]')))
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <motion.span
        className="absolute h-1.5 w-1.5 rounded-full bg-[#6fb4ff]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.span
        className="absolute rounded-full border border-[#4d86ff]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hot ? 46 : 26,
          height: hot ? 46 : 26,
          opacity: hot ? 0.9 : 0.5,
          backgroundColor: hot ? 'rgba(77,134,255,0.12)' : 'rgba(77,134,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      />
    </div>
  )
}
