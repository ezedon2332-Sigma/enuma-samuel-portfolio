export const profile = {
  name: 'Enuma Samuel',
  first: 'Enuma',
  last: 'Samuel',
  initials: 'ES',
  location: 'Lagos, Nigeria',
  email: 'enumadonald67@gmail.com',
  phones: ['+234 916 446 3690', '+234 815 401 8772'],
  tagline: 'Writer · Realtor · Developer · Designer',
  roles: ['Writer', 'Real Estate Agent', 'Full-Stack Developer', 'Creative Designer'],
  intro:
    'I build modern, responsive products and write the words that sell them. Four disciplines under one roof — hire one, or let them work together on your project.',
  blurb:
    'Writer, real estate agent, full-stack developer and creative designer. Four skills, one accountable person.',
  whatsapp:
    "https://wa.me/2348154018772?text=Hi%20Samuel%2C%20I%20saw%20your%20portfolio%20and%20I'd%20like%20to%20talk.",
} as const

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Design', href: '#design' },
  { label: 'Properties', href: '#properties' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const

// Only links with a real destination belong here — a placeholder that lands on
// github.com's homepage is worse than no icon at all.
//
// TODO: add the real handles and uncomment. The icons are already wired up:
//   { label: 'GitHub',   href: 'https://github.com/<handle>',      icon: 'github' },
//   { label: 'LinkedIn', href: 'https://linkedin.com/in/<handle>', icon: 'linkedin' },
//   { label: 'X',        href: 'https://x.com/<handle>',           icon: 'x' },
export const socials = [
  {
    label: 'WhatsApp',
    href: "https://wa.me/2348154018772?text=Hi%20Samuel%2C%20I%20saw%20your%20portfolio%20and%20I'd%20like%20to%20talk.",
    icon: 'whatsapp',
  },
  { label: 'Email', href: 'mailto:enumadonald67@gmail.com', icon: 'mail' },
] as const

export const heroStats = [
  { value: 4, label: 'Disciplines' },
  { value: 10, label: 'Shipped projects' },
  { value: 12, label: 'Design campaigns' },
  { value: 18, label: 'Properties handled' },
] as const

export const heroPills = [
  { title: 'Build', sub: 'Web Apps', icon: 'code' },
  { title: 'Create', sub: 'Unique Designs', icon: 'pen' },
  { title: 'Solve', sub: 'Real Problems', icon: 'gear' },
] as const

export const specialities = [
  {
    icon: 'writing',
    title: 'Writing',
    body: 'I enjoy taking something tangled and making it read simply — articles, essays, or the words inside a product. The aim is that you finish reading and actually know what I meant.',
  },
  {
    icon: 'realEstate',
    title: 'Real Estate',
    body: "I help people find homes and land around Lagos, with the paperwork properly checked before anyone commits. Buying from abroad? I'll handle the viewings and the running around for you.",
  },
  {
    icon: 'webDev',
    title: 'Web Development',
    body: "I build the whole thing, front to back — sites, dashboards and marketplaces. They're made to stay quick on an ordinary phone and a shaky connection, because that's what most people are actually using.",
    tags: ['Full-stack', 'Frontend', 'Backend'],
  },
  {
    icon: 'design',
    title: 'Creative Design',
    body: "Brand identities, UI kits and design systems that look like somebody made a decision. I'd rather hand you something with a point of view than another template.",
  },
] as const

export type Project = {
  tag: string
  title: string
  body: string
  cta: string
  /** '#…' scrolls in-page, '/…' is an internal route, anything else opens in a new tab. */
  href: string
  image?: string
  /** Book covers are portrait — 'contain' stops a 16:10 card cropping them. */
  fit?: 'cover' | 'contain'
  /**
   * The client this work was done with, shown as a small logo credit.
   * `plate` is the backing the mark needs — 'dark' for a white logo,
   * 'light' for a dark one — so both stay legible on a dark card.
   */
  credit?: { logo: string; name: string; plate: 'light' | 'dark' }
  stack?: string[]
}

/** The rows in Recent work, in the order they appear. `key` matches the
 *  leading part of a project's `tag`. */
export const projectGroups = [
  {
    key: 'Web development',
    label: 'Web development',
    note: 'Built end to end and running in production — both have a write-up.',
  },
  {
    key: 'Writing',
    label: 'Writing',
    note: 'Long-form and product copy, published under my own name and for others.',
  },
  {
    key: 'Real estate',
    label: 'Real estate',
    note: 'Sales and buyer management across Lagos, documents verified before anyone commits.',
  },
] as const

export const projects: Project[] = [
  {
    tag: 'Web development',
    title: 'Fancy Finery — clothing marketplace',
    body: 'A single-brand luxury clothing store, built end to end and live. Storefront, admin, self-hosted backend, and two payment providers so customers in Lagos and customers abroad can both pay the way they normally would.',
    cta: 'Read the case study',
    href: '/work/fancy-finery',
    image: '/media/preview-fancy-finery.webp',
    stack: ['Next.js 16', 'React 19', 'PostgreSQL', 'Paystack', 'Stripe'],
  },
  {
    tag: 'Web development',
    title: 'This portfolio site',
    body: 'The site you are on. Rebuilt from a single 1MB HTML file into a React app, with a WebGL hero that stays out of the way until the page is usable — and turns itself off entirely for anyone who asks for less motion.',
    cta: 'Read the case study',
    href: '/work/portfolio',
    image: '/media/preview-portfolio.webp',
    stack: ['React 19', 'Vite', 'Tailwind v4', 'Three.js'],
  },
  {
    tag: 'Writing — Published book',
    title: 'The Final End Called Happiness',
    body: 'A book by E.E. Donald — “an end that reveals the beauty of becoming whole.” Written and published end to end: manuscript, editing and cover direction.',
    cta: 'Get the book',
    href: 'https://selar.com/i6hg369015',
    image: '/media/book-final-end-called-happiness.webp',
    fit: 'contain',
  },
  {
    tag: 'Writing — Published guide',
    title: 'The Complete Dangote Refinery IPO Guide',
    body: "A plain-English walkthrough of buying shares in Africa's biggest IPO, written for people who have never invested before — which apps to use, how the BVN and CSCS steps actually work, and how to spot the scams that follow an offer like this around.",
    cta: 'Get the guide',
    href: 'https://selar.com/75975y8q4v',
    image: '/media/book-dangote-ipo-guide.webp',
    fit: 'contain',
  },
  {
    tag: 'Real estate',
    title: 'Lekki & Ajah residential sales',
    body: 'Off-plan apartments, land and rentals. Titles and documentation are checked before anyone signs anything.',
    cta: 'See FIPS Multilinks',
    // the profile URL without the ?stkn= share token, which is tied to a session
    href: 'https://www.instagram.com/fipsmultilinks',
    // portrait sales flyer, same 'contain' fit as the Zylus card
    image: '/media/prop-gold-mark-fips.webp',
    fit: 'contain',
    credit: { logo: '/media/logo-fips.webp', name: 'FIPS Multilinks', plate: 'dark' },
  },
  {
    tag: 'Real estate',
    title: 'Diaspora buyer packages',
    body: 'End-to-end purchase management: inspection videos, legal verification and staged payment tracking for clients abroad.',
    cta: 'See Zylus Homes',
    // the profile URL without the ?stkn= share token, which is tied to a session
    href: 'https://www.instagram.com/zylushomes',
    // a portrait sales flyer — 'contain' keeps the whole layout rather than
    // cropping the estate branding off the top and bottom
    image: '/media/prop-lekki-avana-zylus.webp',
    fit: 'contain',
    credit: { logo: '/media/logo-zylus.webp', name: 'Zylus Homes', plate: 'light' },
  },
]

export const designWork = [
  { src: '/media/design-nexora-pulse.webp', alt: 'Nexora Pulse X1 — product launch campaign' },
  { src: '/media/design-final-end-campaign.webp', alt: 'The Final End Called Happiness — book campaign' },
  { src: '/media/design-fips-break-pattern.webp', alt: 'FIPS Real Estate — Break the Pattern' },
  { src: '/media/design-ileri-amenities.webp', alt: 'Ileri Residence — amenities campaign' },
] as const

export const properties = [
  { src: '/media/prop-apartment-exterior.webp', alt: 'Apartment development — exterior' },
  { src: '/media/prop-detached-duplex.webp', alt: 'Detached duplex — exterior' },
  { src: '/media/prop-semi-detached-duplex.webp', alt: 'Semi-detached duplex — exterior' },
  { src: '/media/prop-living-chandelier.webp', alt: 'Living room — chandelier & marble floors' },
  { src: '/media/prop-open-plan-living.webp', alt: 'Open-plan living space' },
  { src: '/media/prop-kitchen-island.webp', alt: 'Fitted kitchen — island & marble splashback' },
  { src: '/media/prop-bedroom-corner-windows.webp', alt: 'Bedroom — marble floors, corner windows' },
  { src: '/media/prop-master-bath-tub.webp', alt: 'Master bath — freestanding tub' },
] as const

export const processSteps = [
  {
    icon: 'listen',
    title: 'Listen first',
    body: 'We talk about the problem before any solution. You describe the goal; I tell you which of my hats it needs.',
  },
  {
    icon: 'plan',
    title: 'Plan & agree',
    body: 'Clear scope, timeline and price up front — in writing. No surprises halfway through.',
  },
  {
    icon: 'deliver',
    title: 'Deliver & support',
    body: 'Work delivered on schedule, built for Nigerian realities — then I stay reachable after handover.',
  },
] as const

export const aboutBody =
  "I'm a builder who refuses to pick one lane — the writing sharpens the design, the design sharpens the code, and real estate taught me negotiation and follow-through."

export const marqueeWords = [
  'Writing',
  'Real Estate',
  'Web Development',
  'Full-stack',
  'Creative Design',
  'Brand Identity',
  'Product Copy',
] as const
