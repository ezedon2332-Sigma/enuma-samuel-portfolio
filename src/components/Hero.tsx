import { lazy, Suspense } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { profile } from '../data/content'
import { useReducedMotion, useTypedRoles } from '../lib/hooks'
import { ArrowRight } from './ui/Icons'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const typed = useTypedRoles(profile.roles)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const yCopy = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 70]), {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  })
  const fade = useTransform(scrollYProgress, [0, 0.22], [1, 0])

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* ---------- ambient background ---------- */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft blue wash behind the centred block */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1000px 700px at 50% 42%, rgba(16,54,160,0.40) 0%, rgba(6,10,26,0) 66%), radial-gradient(700px 480px at 12% 82%, rgba(11,63,212,0.14) 0%, rgba(4,6,15,0) 70%)',
          }}
        />
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(109,160,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(109,160,255,0.14) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 72%)',
          }}
        />
      </div>

      {/* drifting particle field */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}

      {/* scrim: guarantees the headline never sits on a bright particle */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(760px 420px at 50% 48%, rgba(4,6,15,0.82) 0%, rgba(4,6,15,0.55) 45%, rgba(4,6,15,0) 72%)',
        }}
      />

      {/* ---------- the pitch ---------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16">
        <motion.div style={{ y: yCopy }} className="mx-auto max-w-[52rem] text-center">
          {/* eyebrow */}
          <motion.p
            className="text-[0.7rem] font-medium tracking-[0.34em] text-[#8f9ec4] uppercase sm:text-[0.75rem]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
          >
            Hello, my name is
          </motion.p>

          {/* name */}
          <h1 className="mt-5 font-display text-[clamp(2.4rem,8.4vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.02em] uppercase [text-shadow:0_2px_30px_rgba(4,6,15,0.9)]">
            {['Enuma', 'Samuel'].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden px-[0.1em] align-bottom">
                <motion.span
                  className={`inline-block ${i === 1 ? 'text-gradient' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, delay: 0.28 + i * 0.12, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* rules + rotating role */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.62 }}
          >
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[#1d5cff] sm:block" />
            <span className="flex min-h-[1.6rem] items-center gap-2 text-[0.92rem] text-[#c7d6ff]">
              <span className="font-medium text-white">{typed}</span>
              <span className="anim-caret inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-[#4d86ff]" />
            </span>
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[#1d5cff] sm:block" />
          </motion.div>

          {/* blurb */}
          <motion.p
            className="mx-auto mt-7 max-w-[54ch] text-[0.98rem] leading-[1.85] text-[#9fb0d8]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.74, ease: EASE }}
          >
            {profile.intro}
          </motion.p>

          {/* solid CTA, plus an understated secondary */}
          <motion.div
            className="mt-11 flex flex-wrap items-center justify-center gap-x-9 gap-y-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: EASE }}
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#1d5cff] px-9 py-4 text-[0.76rem] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3b7bff] hover:shadow-[0_16px_40px_-14px_rgba(29,92,255,0.9)]"
            >
              <span className="relative z-10">My Work</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              {/* sheen sweep on hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            <a
              href="#contact"
              className="group inline-flex flex-col text-[0.76rem] font-medium tracking-[0.2em] text-[#9fb0d8] uppercase transition-colors duration-300 hover:text-white"
            >
              Get in touch
              <span className="mt-1.5 block h-px w-full origin-left scale-x-0 bg-[#4d86ff] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#skills"
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-[#8f9ec4] transition-colors hover:text-white lg:flex"
        aria-label="Scroll to skills"
      >
        <span className="text-[0.62rem] font-medium tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-[#28365f]">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-[#4d86ff]"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
