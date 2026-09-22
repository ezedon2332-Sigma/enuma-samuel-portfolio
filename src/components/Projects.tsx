import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects, projectGroups, type Project } from '../data/content'
import { Section, SectionHead } from './ui/Section'
import { Reveal, Stagger, staggerItem } from './ui/Reveal'
import { ArrowRight, ExternalLink } from './ui/Icons'

/** '#…' scrolls in-page, '/…' routes internally, anything else leaves the site. */
const external = (href: string) => !href.startsWith('#') && !href.startsWith('/')

// stretched so the whole card is the hit area, not just this row
const ctaClass =
  "mt-6 inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#6fb4ff] transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-[#8fc0ff]"

/** The part of a card's tag the row heading does not already say. */
function badgeFor(tag: string, groupKey: string) {
  if (tag === groupKey) return null
  return tag.startsWith(`${groupKey} — `) ? tag.slice(groupKey.length + 3) : tag
}

function Card({ project, groupKey }: { project: Project; groupKey: string }) {
  const p = project
  const badge = badgeFor(p.tag, groupKey)

  return (
    <motion.article
      variants={staggerItem}
      className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent transition-colors duration-500 focus-within:border-[#4d86ff]/60 hover:border-[#4d86ff]/40"
    >
      {/* media / generative cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#070b1a]">
        {p.image && p.fit === 'contain' ? (
          // a portrait cover, sat on the same wash the placeholder uses
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 90% at 50% 0%, rgba(29,92,255,0.30) 0%, rgba(7,11,26,0) 70%)',
              }}
            />
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="relative h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        ) : p.image ? (
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
              {groupKey.split(' ')[0].toUpperCase()}
            </span>
          </div>
        )}

        {badge && (
          <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-[#04060f]/75 px-3 py-1 text-[0.66rem] tracking-[0.12em] text-[#bcd0ff] uppercase backdrop-blur-sm">
            {badge}
          </span>
        )}
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

        {p.credit && (
          <div className="mt-5 flex items-center gap-3 border-t border-white/[0.07] pt-4">
            <span
              className={`grid h-9 w-14 shrink-0 place-items-center rounded-md border ${
                p.credit.plate === 'light'
                  ? 'border-white/15 bg-white'
                  : 'border-white/10 bg-[#0d1b3e]'
              }`}
            >
              <img
                src={p.credit.logo}
                alt={p.credit.name}
                loading="lazy"
                decoding="async"
                className="max-h-6 max-w-11 object-contain"
              />
            </span>
            <span className="text-[0.7rem] tracking-[0.12em] text-[#8f9ec4] uppercase">
              Sold with {p.credit.name}
            </span>
          </div>
        )}

        <div className="mt-auto">
          {p.href.startsWith('/') ? (
            <Link to={p.href} className={ctaClass}>
              {p.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          ) : (
            <a
              href={p.href}
              {...(external(p.href) ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className={ctaClass}
            >
              {p.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              {external(p.href) && <ExternalLink className="h-3 w-3 opacity-70" />}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHead
        eyebrow="Portfolio"
        title="My "
        accent="recent work"
        body="A few things I've written, built, designed — and sold."
      />

      <div className="mt-14 space-y-16 lg:mt-16 lg:space-y-20">
        {projectGroups.map((group) => {
          const items = projects.filter((p) => p.tag.startsWith(group.key))
          if (!items.length) return null

          return (
            <div key={group.key}>
              {/* ---- row heading ---- */}
              <Reveal dir="right">
                <div className="flex flex-col gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#4d86ff]/40 bg-[#1d5cff]/12 px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-[#8fc0ff] uppercase">
                      {group.label}
                    </span>
                    <span className="font-display text-[0.72rem] text-[#5f6f99] tabular-nums">
                      {String(items.length).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="max-w-[52ch] text-[0.86rem] leading-relaxed text-[#8f9ec4] sm:text-right">
                    {group.note}
                  </p>
                </div>
              </Reveal>

              {/* ---- the row ---- */}
              <Stagger className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {items.map((p) => (
                  <Card key={p.title} project={p} groupKey={group.key} />
                ))}
              </Stagger>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
