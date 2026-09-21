import { motion } from 'framer-motion'
import { specialities, heroStats } from '../data/content'
import { Section, SectionHead } from './ui/Section'
import { Stagger, staggerItem, Reveal } from './ui/Reveal'
import { useCountUp } from '../lib/hooks'
import { specialityIcons } from './ui/Icons'

function Stat({ value, label }: { value: number; label: string }) {
  const { ref, value: n } = useCountUp(value)
  return (
    <div className="text-center sm:text-left">
      <span
        ref={ref}
        className="block font-display text-[clamp(1.9rem,4vw,2.7rem)] leading-none font-bold text-white tabular-nums"
      >
        {n}
        <span className="text-[#4d86ff]">+</span>
      </span>
      <span className="mt-2 block text-[0.72rem] tracking-[0.18em] text-[#8f9ec4] uppercase">
        {label}
      </span>
    </div>
  )
}

export default function Specialities() {
  return (
    <Section id="skills">
      <SectionHead
        eyebrow="Speciality"
        title="My "
        accent="specialities"
        body="Six disciplines under one roof — hire one, or let them work together on your project."
      />

      <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
        {specialities.map((s) => {
          const Icon = specialityIcons[s.icon as keyof typeof specialityIcons]
          return (
          <motion.article
            key={s.title}
            variants={staggerItem}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-transparent p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#4d86ff]/40 sm:p-7"
          >
            {/* glow that follows the card on hover */}
            <span className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#1d5cff]/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-[#0b1226] text-[#4d86ff] transition-all duration-500 group-hover:scale-110 group-hover:border-[#4d86ff]/50 group-hover:text-[#8fc0ff]">
              <Icon className="h-[1.3rem] w-[1.3rem]" strokeWidth={1.6} />
            </span>

            <h3 className="relative mt-5 font-display text-[1.22rem] font-semibold text-white">
              {s.title}
            </h3>
            <p className="relative mt-2.5 text-[0.93rem] leading-relaxed text-[#9fb0d8]">{s.body}</p>

            {/* underline that grows on hover */}
            <span className="relative mt-5 block h-px w-10 bg-gradient-to-r from-[#1d5cff] to-transparent transition-all duration-500 group-hover:w-full" />
          </motion.article>
          )
        })}
      </Stagger>

      {/* counters */}
      <Reveal delay={0.1}>
        <div className="mt-14 grid grid-cols-2 gap-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-8 sm:grid-cols-4 sm:gap-6 sm:px-10">
          {heroStats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
