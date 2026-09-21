import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/content'
import { Section, SectionHead } from './ui/Section'
import { ArrowRight } from './ui/Icons'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Projects() {
  const groups = useMemo(() => {
    const set = new Set(projects.map((p) => p.tag.split(' — ')[0]))
    return ['All', ...Array.from(set)]
  }, [])

  const [filter, setFilter] = useState('All')

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tag.startsWith(filter))),
    [filter],
  )

  return (
    <Section id="projects">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead
          eyebrow="Portfolio"
          title="My "
          accent="recent work"
          body="A few things I've written, built, designed — and sold."
        />

        {/* filter chips */}
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => {
            const on = filter === g
            return (
              <button
                key={g}
                type="button"
                onClick={() => setFilter(g)}
                className={`relative rounded-full border px-4 py-2 text-[0.8rem] transition-colors duration-300 ${
                  on
                    ? 'border-[#4d86ff] text-white'
                    : 'border-white/10 text-[#94a3c8] hover:border-white/25 hover:text-white'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[#1d5cff]/18"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{g}</span>
              </button>
            )
          })}
        </div>
      </div>

      <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent transition-colors duration-500 hover:border-[#4d86ff]/40"
            >
              {/* media / generative cover */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#070b1a]">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="relative h-full w-full">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background:
                          'radial-gradient(120% 90% at 78% 12%, rgba(29,92,255,0.42) 0%, rgba(7,11,26,0) 62%)',
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(109,160,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(109,160,255,0.16) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                      }}
                    />
                    <span className="absolute right-5 bottom-4 font-display text-[3.4rem] leading-none font-black text-white/[0.07] select-none">
                      {p.tag.split(' ')[0].toUpperCase()}
                    </span>
                  </div>
                )}

                <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-[#04060f]/75 px-3 py-1 text-[0.66rem] tracking-[0.12em] text-[#bcd0ff] uppercase backdrop-blur-sm">
                  {p.tag}
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.12rem] leading-snug font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-[#9fb0d8]">{p.body}</p>

                {p.stack && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[0.7rem] text-[#8f9ec4]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <span className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#4d86ff] transition-colors group-hover:text-[#8fc0ff]">
                  {p.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
