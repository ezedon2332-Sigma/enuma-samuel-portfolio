import type { ReactNode } from 'react'
import { Reveal, SplitWords } from './Reveal'

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">{children}</div>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  accent,
  body,
  align = 'left',
}: {
  eyebrow: string
  title: string
  accent?: string
  body?: string
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <Reveal dir={centered ? 'up' : 'right'}>
        <span className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#1d5cff]" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#1d5cff]" />
        </span>
      </Reveal>

      <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.06] font-bold tracking-[-0.025em]">
        <SplitWords text={title} />
        {accent && <SplitWords text={accent} className="text-gradient" delay={0.12} />}
      </h2>

      {body && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-[#9fb0d8] ${centered ? 'mx-auto' : ''} max-w-[54ch]`}>{body}</p>
        </Reveal>
      )}
    </div>
  )
}
