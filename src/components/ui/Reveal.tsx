import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

type Dir = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Dir, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 42, y: 0 },
  right: { x: -42, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  delay = 0,
  dir = 'up',
  className = '',
  once = true,
}: {
  children: ReactNode
  delay?: number
  dir?: Dir
  className?: string
  once?: boolean
}) {
  const o = offset[dir]
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...o, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Staggers direct children. Pair with <RevealItem>. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE },
  },
}

export function Stagger({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Splits a string into words that rise into place one after another.
 *
 * `wordClassName` lands on the element that actually holds each word. A
 * gradient (background-clip: text) has to sit there: put it on the wrapper and
 * the animated spans' transforms create a new containing block, so the clipped
 * background never paints over them while `color: transparent` still inherits
 * down — leaving the text invisible.
 *
 * The whole animated run is hidden from assistive tech and the real string is
 * exposed once, off-screen. `aria-label` cannot do that job here: a plain
 * <span> has no role, and ARIA ignores labels on unrolled generic elements —
 * so with every word marked aria-hidden the heading came out nameless.
 */
export function SplitWords({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
}) {
  const words = text.split(' ').filter(Boolean)

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        className={className}
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{
                hidden: { y: '110%', opacity: 0 },
                show: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: EASE } },
              }}
            >
              {w}
              {'\u00A0'}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </>
  )
}
