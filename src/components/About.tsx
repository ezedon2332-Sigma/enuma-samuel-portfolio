import { motion } from 'framer-motion'
import { aboutBody, processSteps } from '../data/content'
import { Section, SectionHead } from './ui/Section'
import { Stagger, staggerItem, Reveal } from './ui/Reveal'
import { processIcons } from './ui/Icons'

export default function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* left: the statement */}
        <div>
          <SectionHead eyebrow="About me" title="My " accent="work process" body={aboutBody} />

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-7">
              <p className="font-script text-[1.6rem] leading-tight text-[#6fb4ff]">
                “Six skills, one accountable person.”
              </p>
              <p className="mt-3 text-[0.9rem] text-[#9fb0d8]">
                The writing sharpens the design, the design sharpens the code, and real estate
                taught me negotiation and follow-through.
              </p>
            </div>
          </Reveal>
        </div>

        {/* right: numbered steps on a timeline */}
        <Stagger className="relative">
          {/* the rail */}
          <span className="absolute top-2 bottom-8 left-[27px] w-px bg-gradient-to-b from-[#1d5cff] via-[#1d5cff]/35 to-transparent" />

          {processSteps.map((step, i) => {
            const Icon = processIcons[step.icon as keyof typeof processIcons]
            return (
            <motion.div key={step.title} variants={staggerItem} className="group relative flex gap-5 pb-10 last:pb-0">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#243357] bg-[#0b1226] text-[#4d86ff] transition-all duration-500 group-hover:border-[#4d86ff] group-hover:text-[#8fc0ff] group-hover:shadow-[0_0_26px_-4px_rgba(77,134,255,0.85)]">
                <Icon className="h-[1.25rem] w-[1.25rem]" strokeWidth={1.6} />
                <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[#0b3fd4] to-[#4d86ff] font-display text-[0.65rem] font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>

              <div className="pt-1.5">
                <h3 className="font-display text-[1.15rem] font-semibold text-white">{step.title}</h3>
                <p className="mt-2 max-w-[46ch] text-[0.93rem] leading-relaxed text-[#9fb0d8]">
                  {step.body}
                </p>
              </div>
            </motion.div>
            )
          })}
        </Stagger>
      </div>
    </Section>
  )
}
