import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { caseStudyBySlug } from '../data/caseStudies'
import { profile } from '../data/content'
import { ArrowRight, ExternalLink } from '../components/ui/Icons'
import { Reveal } from '../components/ui/Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

export default function CaseStudy() {
  const { slug } = useParams()
  const study = slug ? caseStudyBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
    if (study) document.title = `${study.title} — ${profile.name}`
    return () => {
      document.title = `${profile.name} — Writer, Realtor, Developer, Designer`
    }
  }, [study])

  if (!study) {
    return (
      <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-bold">
          No case study here
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[0.8rem] font-medium tracking-[0.2em] text-[#6fb4ff] uppercase transition-colors hover:text-white"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to the site
        </Link>
      </main>
    )
  }

  return (
    <main className="relative min-h-[100svh] pb-28">
      {/* ambient wash, calmer than the landing page */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            'radial-gradient(900px 560px at 50% 0%, rgba(16,54,160,0.32) 0%, rgba(4,6,15,0) 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[52rem] px-5 pt-28 sm:px-8 lg:pt-32">
        {/* back */}
        <Link
          to="/#projects"
          className="group inline-flex items-center gap-2.5 text-[0.72rem] font-medium tracking-[0.2em] text-[#9fb0d8] uppercase transition-colors hover:text-white"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to work
        </Link>

        {/* ---------- header ---------- */}
        <motion.header
          className="mt-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="eyebrow">Case study · {study.year}</p>

          <h1 className="mt-4 font-display text-[clamp(2.2rem,6.4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.025em]">
            {study.title}
          </h1>

          <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-[1.7] text-[#c7d6ff]">
            {study.tagline}
          </p>

          {/* links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {study.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`group inline-flex items-center gap-2.5 px-6 py-3 text-[0.72rem] font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5 ${
                  i === 0
                    ? 'bg-[#1d5cff] text-white hover:bg-[#3b7bff] hover:shadow-[0_16px_40px_-14px_rgba(29,92,255,0.9)]'
                    : 'border border-[#28365f] text-[#dbe5ff] hover:border-[#4d86ff] hover:bg-[#4d86ff]/10'
                }`}
              >
                {l.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            ))}
          </div>
        </motion.header>

        {/* ---------- facts strip ---------- */}
        <Reveal delay={0.1}>
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-white/[0.08] py-8 sm:grid-cols-4">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[0.62rem] font-medium tracking-[0.2em] text-[#8f9ec4] uppercase">
                  {f.label}
                </dt>
                <dd className="mt-2 font-display text-[1.02rem] font-semibold text-white">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ---------- intro ---------- */}
        <Reveal delay={0.05}>
          <p className="mt-14 text-[1.08rem] leading-[1.85] text-[#c7d6ff]">{study.intro}</p>
        </Reveal>

        {/* ---------- role + stack ---------- */}
        <Reveal delay={0.05}>
          <div className="mt-12 grid gap-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:grid-cols-[auto_1fr] sm:p-7">
            <div>
              <p className="text-[0.62rem] font-medium tracking-[0.2em] text-[#8f9ec4] uppercase">
                My role
              </p>
              <p className="mt-2 max-w-[22ch] text-[0.92rem] text-white">{study.role}</p>
            </div>
            <div>
              <p className="text-[0.62rem] font-medium tracking-[0.2em] text-[#8f9ec4] uppercase">
                Built with
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {study.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[0.72rem] text-[#9fb0d8]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ---------- body ---------- */}
        <article className="mt-16">
          {study.sections.map((section, i) => (
            <Reveal key={section.heading} delay={0.04}>
              <section className="mt-14 first:mt-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[0.75rem] font-semibold text-[#4d86ff] tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-[clamp(1.35rem,3.2vw,1.75rem)] leading-tight font-semibold text-white">
                    {section.heading}
                  </h2>
                </div>

                <div className="mt-5 space-y-5 border-l border-white/[0.08] pl-6 sm:pl-8">
                  {section.body.map((para) => (
                    <p key={para.slice(0, 40)} className="text-[1rem] leading-[1.88] text-[#9fb0d8]">
                      {para}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-2.5 pt-1">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-[0.96rem] leading-[1.7] text-[#9fb0d8]">
                          <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-[#4d86ff]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </article>

        {/* ---------- footer ---------- */}
        <Reveal delay={0.05}>
          <div className="mt-20 flex flex-col gap-6 border-t border-white/[0.08] pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[34ch] text-[0.95rem] text-[#9fb0d8]">
              Want something like this built? Tell me the problem first.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2.5 bg-[#1d5cff] px-7 py-3.5 text-[0.72rem] font-semibold tracking-[0.18em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3b7bff]"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/#projects"
                className="inline-flex items-center border border-[#28365f] px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.18em] text-[#dbe5ff] uppercase transition-all duration-300 hover:border-[#4d86ff] hover:bg-[#4d86ff]/10"
              >
                More work
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
