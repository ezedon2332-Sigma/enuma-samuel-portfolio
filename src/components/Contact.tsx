import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { Reveal } from './ui/Reveal'
import { ArrowRight, Mail, Phone, MapPin, Sparkles } from './ui/Icons'

export default function Contact() {
  const items = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phones[0],
      href: `tel:${profile.phones[0].replace(/\s/g, '')}`,
    },
    { icon: MapPin, label: 'Based in', value: profile.location, href: undefined },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-32">
      {/* glow bed */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 480px at 50% 108%, rgba(29,92,255,0.34) 0%, rgba(4,6,15,0) 68%)',
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-transparent px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
          {/* orbiting sparkles */}
          <Sparkles className="anim-twinkle absolute top-8 left-[12%] h-4 w-4 text-[#4d86ff]" />
          <Sparkles className="anim-twinkle absolute right-[14%] bottom-10 h-5 w-5 text-[#6fb4ff] [animation-delay:1.2s]" />

          <Reveal>
            <span className="eyebrow">Let's work together</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-[clamp(2rem,5.6vw,3.6rem)] leading-[1.04] font-bold tracking-[-0.03em]">
              Have any project idea? <span className="text-gradient">Let's build it.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-[48ch] text-[#9fb0d8]">
              Tell me which skill you need — or describe the problem and I'll tell you which it
              takes.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#0b3fd4] to-[#3b7bff] px-8 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 glow-blue sm:w-auto"
              >
                <span className="relative z-10">Contact Now</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#28365f] px-8 py-4 text-sm font-medium text-[#dbe5ff] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4d86ff] hover:bg-[#4d86ff]/10 sm:w-auto"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>

          {/* contact cards */}
          <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {items.map((item, i) => {
              const Icon = item.icon
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#0b1226] text-[#4d86ff] transition-colors duration-300 group-hover:border-[#4d86ff]">
                    <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-[0.68rem] tracking-[0.2em] text-[#8f9ec4] uppercase">
                      {item.label}
                    </span>
                    <span className="block truncate text-[0.9rem] text-white">{item.value}</span>
                  </span>
                </>
              )

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.08 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#4d86ff]/40"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                      {inner}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
