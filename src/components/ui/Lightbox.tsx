import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Close, ArrowRight } from './Icons'

export type Shot = { src: string; alt: string }

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: readonly Shot[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const open = index !== null

  const next = useCallback(() => {
    if (index === null) return
    onIndex((index + 1) % items.length)
  }, [index, items.length, onIndex])

  const prev = useCallback(() => {
    if (index === null) return
    onIndex((index - 1 + items.length) % items.length)
  }, [index, items.length, onIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, next, prev])

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={items[index].alt}
        >
          <div className="absolute inset-0 bg-[#04060f]/94 backdrop-blur-lg" onClick={onClose} />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Close className="h-5 w-5" />
          </button>

          {/* prev / next */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <motion.figure
            key={items[index].src}
            className="relative z-[5] flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={items[index].src}
              alt={items[index].alt}
              className="max-h-[74vh] w-auto max-w-full rounded-xl object-contain shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]"
            />
            <figcaption className="text-center text-[0.85rem] text-[#9fb0d8]">
              {items[index].alt}
              <span className="mt-1 block text-[0.72rem] tracking-[0.2em] text-[#5f6f99]">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
