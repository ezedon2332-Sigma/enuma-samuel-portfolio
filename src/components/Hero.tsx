import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { profile, heroPills } from '../data/content'
import { useTypedRoles, useReducedMotion } from '../lib/hooks'
import { ArrowRight, Sparkles, pillIcons } from './ui/Icons'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const EASE = [0.16, 1, 0.3, 1] as const

/** Words that ride the orbit, replacing the old portrait as the focal interest. */
const ORBIT = ['WRITE', 'BUILD', 'DESIGN', 'SELL']

export default function Hero() {
  const typed = useTypedRoles(profile.roles)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll()
  // the composite drifts apart as you scroll — foreground faster than background
  const soft = { stiffness: 90, damping: 26, mass: 0.6 }
  const yWord = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -90]), soft)
  const yOrb = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -30]), soft)
  const yCopy = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 60]), soft)
  const fade = useTransform(scrollYProgress, [0, 0.22], [1, 0])

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-20 sm:pt-24 lg:pt-20 lg:pb-16"
    >
      {/* ---------- background layers ---------- */}
      <div className="pointer-events-none absolute inset-0">
        {/* deep blue wash from the upper right, like the mock's key light */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1100px 760px at 72% 34%, rgba(16,54,160,0.55) 0%, rgba(6,10,26,0) 62%), radial-gradient(760px 520px at 12% 78%, rgba(11,63,212,0.20) 0%, rgba(4,6,15,0) 70%)',
          }}
        />
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(109,160,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(109,160,255,0.14) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at 60% 45%, #000 0%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at 60% 45%, #000 0%, transparent 72%)',
          }}
        />
      </div>

      {/* ---------- WebGL particle field + core glow ---------- */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 lg:left-[42%]">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}

      {/* ---------- content ---------- */}
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:px-10">
        {/* ============ left: the pitch ============ */}
        <motion.div style={{ y: yCopy }} className="relative z-20 max-w-xl">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <span className="eyebrow">Hello, I'm</span>
            <span className="h-px w-16 bg-gradient-to-r from-[#1d5cff] to-transparent" />
          </motion.div>

          <h1 className="mt-4 font-display text-[clamp(2.7rem,7.2vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
            {['Enuma', 'Samuel'].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pr-[0.18em] align-bottom">
                <motion.span
                  className={`inline-block ${i === 1 ? 'text-gradient' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, delay: 0.25 + i * 0.12, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* rotating role line */}
          <motion.div
            className="mt-3 flex min-h-[1.9rem] flex-wrap items-center gap-x-3 gap-y-1 text-[0.98rem] text-[#c7d6ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <span className="font-medium text-white">{typed}</span>
            <span className="anim-caret inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-[#4d86ff]" />
            <span className="hidden text-[#5f6f99] sm:inline">|</span>
            <span className="hidden text-[#8f9ec4] sm:inline">{profile.location}</span>
          </motion.div>

          <motion.p
            className="mt-6 max-w-[46ch] text-[#9fb0d8]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.68, ease: EASE }}
          >
            {profile.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#0b3fd4] to-[#3b7bff] px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 glow-blue"
            >
              <span className="relative z-10">View My Projects</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              {/* sheen sweep on hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#28365f] px-7 py-3.5 text-sm font-medium text-[#dbe5ff] transition-all duration-300 hover:border-[#4d86ff] hover:bg-[#4d86ff]/10 hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* three capability pills */}
          <motion.ul
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-12 sm:gap-x-8 sm:gap-y-5"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.11, delayChildren: 0.95 } } }}
          >
            {heroPills.map((p) => {
              const Icon = pillIcons[p.icon as keyof typeof pillIcons]
              return (
                <motion.li
                  key={p.title}
                  className="group flex items-center gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#243357] bg-[#0b1226] text-[#4d86ff] transition-all duration-300 group-hover:border-[#4d86ff] group-hover:bg-[#4d86ff]/10 group-hover:shadow-[0_0_22px_-4px_rgba(77,134,255,0.8)]">
                    <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.7} />
                  </span>
                  <span className="text-[0.82rem] leading-tight">
                    <span className="block font-semibold text-white">{p.title}</span>
                    <span className="block text-[#8f9ec4]">{p.sub}</span>
                  </span>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>

        {/* ============ right: the living composite ============ */}
        <div className="relative z-10 flex min-h-[340px] items-center justify-center sm:min-h-[460px] lg:min-h-[640px]">
          {/* ---- the core: concentric rings, no subject ---- */}
          <motion.div
            style={{ y: yOrb }}
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[88%] max-w-[520px] -translate-x-1/2 -translate-y-1/2"
          >
            {/* soft bloom */}
            <motion.div
              className="absolute inset-[8%] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(29,92,255,0.34) 0%, rgba(29,92,255,0.10) 42%, transparent 68%)',
                filter: 'blur(14px)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: EASE }}
            />

            {/* the bright key ring */}
            <motion.div
              className="anim-pulse-ring absolute inset-[12%] rounded-full border border-[#4d86ff]/50 shadow-[0_0_90px_-10px_rgba(29,92,255,0.8)_inset]"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.55, ease: EASE }}
            />

            {/* outer conic sweep */}
            <div
              className="anim-spin-slow absolute inset-0 rounded-full opacity-50"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(109,180,255,0.8) 26deg, transparent 62deg, transparent 300deg, rgba(29,92,255,0.55) 340deg, transparent 360deg)',
                maskImage:
                  'radial-gradient(circle, transparent 69%, #000 71%, #000 74%, transparent 76%)',
                WebkitMaskImage:
                  'radial-gradient(circle, transparent 69%, #000 71%, #000 74%, transparent 76%)',
              }}
            />

            {/* inner dashed ring, counter-rotating */}
            <div
              className="anim-spin-slow absolute inset-[22%] rounded-full opacity-45 [animation-direction:reverse] [animation-duration:38s]"
              style={{
                background:
                  'repeating-conic-gradient(rgba(143,192,255,0.6) 0deg 2deg, transparent 2deg 9deg)',
                maskImage:
                  'radial-gradient(circle, transparent 92%, #000 94%, #000 99%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(circle, transparent 92%, #000 94%, #000 99%, transparent 100%)',
              }}
            />

            {/* four discipline words riding the orbit */}
            {ORBIT.map((word, i) => (
              <motion.span
                key={word}
                className="absolute top-1/2 left-1/2 font-display text-[0.6rem] font-semibold tracking-[0.26em] text-[#8fc0ff]/75 sm:text-[0.68rem]"
                style={{
                  transform: `rotate(${i * 90}deg) translate(-50%, -50%) translateY(-44%) rotate(-${i * 90}deg)`,
                  transformOrigin: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 + i * 0.12 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* giant DEVELOPER wordmark, now the focal point */}
          <motion.div
            style={{ y: yWord }}
            className="pointer-events-none relative z-20 w-full select-none text-center"
          >
            <motion.span
              className="text-chrome block font-display text-[clamp(2.4rem,10vw,6.8rem)] leading-none font-black tracking-[-0.045em]"
              initial={{ opacity: 0, scale: 1.12, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
            >
              DEVELOPER
            </motion.span>

            {/* the tagline sitting under the wordmark */}
            <motion.div
              className="mt-4 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.25, ease: EASE }}
            >
              <span className="font-display text-[0.62rem] font-semibold tracking-[0.34em] text-white/90 sm:text-[0.7rem]">
                CREATIVE DEVELOPER
              </span>
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#4d86ff] to-transparent" />
              <span className="text-[0.55rem] font-medium tracking-[0.26em] text-[#4d86ff] sm:text-[0.6rem]">
                DESIGN • CODE • DIGITAL
              </span>
            </motion.div>
          </motion.div>

          {/* script accent */}
          <motion.span
            className="pointer-events-none absolute top-[8%] left-[2%] z-30 font-script text-[clamp(1.15rem,4.6vw,2.4rem)] font-bold text-[#4d86ff] drop-shadow-[0_0_20px_rgba(77,134,255,0.75)] sm:top-[12%] sm:left-[3%]"
            initial={{ opacity: 0, y: 16, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 1.1, delay: 1.1, ease: EASE }}
          >
            Web Developer
          </motion.span>

          {/* signature */}
          <motion.span
            className="pointer-events-none absolute right-[4%] bottom-[10%] z-30 hidden font-script text-[clamp(1.8rem,5vw,3rem)] font-bold text-[#4d86ff]/85 drop-shadow-[0_0_18px_rgba(77,134,255,0.6)] sm:block"
            initial={{ opacity: 0, scale: 0.85, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ duration: 1.1, delay: 1.5, ease: EASE }}
          >
            {profile.initials}
          </motion.span>

          {/* ideas -> code -> impact */}
          <motion.div
            className="pointer-events-none absolute bottom-[4%] left-[2%] z-30 hidden sm:bottom-[6%] sm:left-[3%] sm:block"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: EASE }}
          >
            <p className="font-display text-[0.66rem] font-semibold tracking-[0.3em] text-white/85">
              IDEAS <span className="text-[#4d86ff]">→</span> CODE{' '}
              <span className="text-[#4d86ff]">→</span> IMPACT
            </p>
            <span className="mt-2 block h-[2px] w-16 bg-gradient-to-r from-[#1d5cff] to-transparent" />
          </motion.div>

          {/* sparkles */}
          <Sparkles className="anim-twinkle pointer-events-none absolute top-[8%] right-[10%] z-30 h-6 w-6 text-[#8fc0ff]" />
          <Sparkles className="anim-twinkle pointer-events-none absolute bottom-[22%] left-[6%] z-30 h-4 w-4 text-[#4d86ff] [animation-delay:0.7s]" />
          <Sparkles className="anim-twinkle pointer-events-none absolute top-[46%] left-[1%] z-30 h-3 w-3 text-[#9ec8ff] [animation-delay:1.4s]" />
          <Sparkles className="anim-twinkle pointer-events-none absolute right-[5%] bottom-[38%] z-30 h-3.5 w-3.5 text-[#6fb4ff] [animation-delay:2.1s]" />

          {/* dash rail, as in the mock's right edge */}
          <div className="pointer-events-none absolute right-[1%] bottom-[10%] z-30 hidden flex-col items-end gap-[6px] lg:flex">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={i}
                className="block h-px bg-[#4d86ff]"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: i % 2 === 0 ? 16 : 9, opacity: 0.35 + (i % 3) * 0.2 }}
                transition={{ duration: 0.5, delay: 1.7 + i * 0.07 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#skills"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#8f9ec4] transition-colors hover:text-white lg:flex"
        aria-label="Scroll to skills"
      >
        <span className="text-[0.6rem] font-medium tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative block h-9 w-[22px] rounded-full border border-[#28365f]">
          <motion.span
            className="absolute left-1/2 h-[6px] w-[2px] -translate-x-1/2 rounded-full bg-[#4d86ff]"
            animate={{ y: [7, 18, 7], opacity: [0, 1, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
