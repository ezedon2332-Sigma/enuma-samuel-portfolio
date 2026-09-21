import { nav, profile, socials } from '../data/content'
import { socialIcons } from './ui/Icons'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#050813]">
      <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* identity */}
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#0b3fd4] to-[#4d86ff] text-[0.78rem] font-bold text-white">
                {profile.initials}
              </span>
              <span className="font-display text-[1.05rem] font-semibold tracking-tight">
                {profile.first} <span className="text-[#4d86ff]">{profile.last}</span>
              </span>
            </a>

            <p className="mt-4 max-w-[38ch] text-[0.9rem] text-[#8f9ec4]">
              {profile.tagline}. {profile.location}.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon as keyof typeof socialIcons]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] text-[#94a3c8] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4d86ff] hover:text-white"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="font-display text-[0.95rem] font-semibold text-white">Quick links</h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group inline-flex items-center gap-2 text-[0.9rem] text-[#8f9ec4] transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#4d86ff] transition-all duration-300 group-hover:w-4" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contacts */}
          <div>
            <h4 className="font-display text-[0.95rem] font-semibold text-white">Contacts</h4>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-[#8f9ec4]">
              {profile.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, '')}`}
                    className="transition-colors hover:text-white"
                  >
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {profile.email}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 text-[0.8rem] text-[#5f6f99] sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Built by hand, obviously.</p>
        </div>
      </div>
    </footer>
  )
}
