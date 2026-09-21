import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { nav, profile, socials } from '../data/content'
import { useActiveSection } from '../lib/hooks'
import { socialIcons, Close } from './ui/Icons'

const ids = nav.map((n) => n.href)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids as unknown as string[])

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock the page behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-[#04060f]/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 py-3.5 sm:gap-6 sm:px-6 sm:py-4 lg:px-10">
          {/* logo */}
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#0b3fd4] to-[#4d86ff] text-[0.78rem] font-bold tracking-wide text-white">
              {profile.initials}
              <span className="absolute inset-0 rounded-full ring-1 ring-white/25 transition-all duration-500 group-hover:scale-125 group-hover:opacity-0" />
            </span>
            <span className="hidden font-display text-[1.05rem] font-semibold tracking-tight min-[380px]:inline">
              {profile.first} <span className="text-[#4d86ff]">{profile.last}</span>
            </span>
          </a>

          {/* desktop links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-[0.88rem] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#94a3c8] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#1d5cff] to-[#6fb4ff]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* socials + burger */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 border-l border-white/10 pl-4 md:flex">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon as keyof typeof socialIcons]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-lg text-[0.95rem] text-[#94a3c8] transition-all duration-300 hover:bg-[#4d86ff]/12 hover:text-white hover:-translate-y-0.5"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[1.5px] w-5 bg-white" />
                <span className="block h-[1.5px] w-3.5 bg-white" />
              </span>
            </button>
          </div>
        </div>

        {/* scroll progress */}
        <motion.div
          className="h-[2px] origin-left bg-gradient-to-r from-[#0b3fd4] via-[#4d86ff] to-[#6fb4ff]"
          style={{ scaleX: progress }}
        />
      </motion.header>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#04060f]/92 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col gap-2 border-l border-white/10 bg-[#070b1a] px-7 pt-24 pb-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-lg"
              >
                <Close className="h-5 w-5" />
              </button>

              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/[0.06] py-3.5 font-display text-2xl font-semibold text-white/90 transition-colors hover:text-[#4d86ff]"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5 }}
                >
                  {item.label}
                </motion.a>
              ))}

              <div className="mt-auto flex items-center gap-3 pt-8">
                {socials.map((s) => {
                  const Icon = socialIcons[s.icon as keyof typeof socialIcons]
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-[#94a3c8] transition-colors hover:text-white"
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                    </a>
                  )
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
