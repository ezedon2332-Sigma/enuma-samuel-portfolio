/**
 * Lucide covers every semantic icon on the site. It dropped brand marks in v1,
 * so the three social logos below stay hand-rolled.
 */
import {
  Blocks,
  Code2,
  Cog,
  House,
  Mail,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  Palette,
  PencilRuler,
  PenTool,
  Phone,
  Rocket,
  Server,
  Sparkles,
} from 'lucide-react'

type P = { className?: string }

const brand = 'h-[1em] w-[1em]'

export function Github({ className = '' }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${brand} ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  )
}

export function Linkedin({ className = '' }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${brand} ${className}`} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21h-4z" />
    </svg>
  )
}

export function XIcon({ className = '' }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${brand} ${className}`} fill="currentColor" aria-hidden>
      <path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.1L4.6 21H1.4l7.5-8.6L1 3h6.6l4.6 5.6zm-1.1 16h1.8L7.7 4.8H5.8z" />
    </svg>
  )
}

/** Social links, keyed by the `icon` field in content.ts. */
export const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
  mail: Mail,
} as const

/** The six specialities. */
export const specialityIcons = {
  writing: PenTool,
  realEstate: House,
  webDev: Blocks,
  frontend: MonitorSmartphone,
  backend: Server,
  design: Palette,
} as const

/** The three work-process steps. */
export const processIcons = {
  listen: MessagesSquare,
  plan: PencilRuler,
  deliver: Rocket,
} as const

/** The three hero capability pills. */
export const pillIcons = {
  code: Code2,
  pen: PenTool,
  gear: Cog,
} as const

export { Mail, Phone, MapPin, Sparkles }
export { ArrowRight, X as Close } from 'lucide-react'
