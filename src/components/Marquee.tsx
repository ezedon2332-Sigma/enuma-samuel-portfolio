import { marqueeWords } from '../data/content'

export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords]
  return (
    <div className="marquee-host relative overflow-hidden border-y border-white/[0.07] bg-[#070b1a] py-5">
      {/* edge fades so words dissolve instead of clipping */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070b1a] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070b1a] to-transparent sm:w-28" />

      <div className="marquee-track flex w-max items-center gap-6 sm:gap-10">
        {row.map((word, i) => (
          <span key={`${word}-${i}`} className="flex shrink-0 items-center gap-6 sm:gap-10">
            <span className="font-display text-[1.1rem] font-semibold tracking-[-0.01em] whitespace-nowrap text-white/70 sm:text-[1.5rem]">
              {word}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-[#2a3a63]" />
          </span>
        ))}
      </div>
    </div>
  )
}
