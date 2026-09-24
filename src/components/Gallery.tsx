import { useState } from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHead } from './ui/Section'
import Lightbox, { type Shot } from './ui/Lightbox'
import { Stagger, staggerItem } from './ui/Reveal'

export default function Gallery({
  id,
  eyebrow,
  title,
  accent,
  body,
  items,
  shape = 'poster',
}: {
  id: string
  eyebrow: string
  title: string
  accent: string
  body: string
  items: readonly Shot[]
  /** 'poster' frames 3:4 artwork; 'photo' squares off a mixed set of snapshots. */
  shape?: 'poster' | 'photo'
}) {
  const [open, setOpen] = useState<number | null>(null)

  const grid = 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'

  /**
   * The frame has to follow the artwork, because object-cover crops whatever
   * does not fit. Every design piece is a ~3:4 social poster, so it gets that
   * ratio exactly — a square frame was slicing a quarter off the top and
   * bottom, which cost the Happiness campaign its "The Final End" line. The
   * property set is mixed 3:4 and 4:3, so a square splits the difference and
   * each shot loses about a quarter rather than the portraits losing half.
   */
  const ratio = shape === 'photo' ? 'aspect-square' : 'aspect-[3/4]'

  return (
    <Section id={id}>
      <SectionHead eyebrow={eyebrow} title={title} accent={accent} body={body} />

      <Stagger className={`mt-12 grid gap-3 sm:gap-4 lg:mt-14 ${grid}`}>
        {items.map((shot, i) => (
          <motion.button
            key={shot.src}
            type="button"
            variants={staggerItem}
            onClick={() => setOpen(i)}
            aria-label={`Open: ${shot.alt}`}
            className={`group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#070b1a] ${ratio} transition-all duration-500 hover:border-[#4d86ff]/50 hover:-translate-y-1`}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.09]"
            />

            {/* caption veil — only while the caption is actually showing, so the
                artwork is not permanently dimmed by a third of a stop */}
            <span className="absolute inset-0 bg-gradient-to-t from-[#04060f] via-[#04060f]/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-95" />
            <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-[0.72rem] leading-snug text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/90 sm:text-[0.78rem]">
              {shot.alt}
            </span>

            {/* blue sweep on hover */}
            <span className="pointer-events-none absolute inset-0 bg-[#1d5cff]/0 transition-colors duration-500 group-hover:bg-[#1d5cff]/10" />
          </motion.button>
        ))}
      </Stagger>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Section>
  )
}
