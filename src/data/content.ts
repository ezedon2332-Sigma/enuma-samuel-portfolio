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
    'I build modern, responsive products and write the words that sell them. Six disciplines under one roof — hire one, or let them work together on your project.',
  blurb:
    'Writer, real estate agent, full-stack developer and creative designer. Six skills, one accountable person.',
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

export const socials = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/', icon: 'x' },
  { label: 'Email', href: 'mailto:enumadonald67@gmail.com', icon: 'mail' },
] as const

export const heroStats = [
  { value: 6, label: 'Disciplines' },
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
    body: 'Essays, articles and product copy that make complicated things simple — fintech explainers to long-form stories.',
  },
  {
    icon: 'realEstate',
    title: 'Real Estate',
    body: 'Lagos sales, rentals and land with verified documentation — plus full remote purchase management for diaspora buyers.',
  },
  {
    icon: 'webDev',
    title: 'Web Development',
    body: 'Complete products end to end — marketplaces, dashboards and portals built for real Nigerian network conditions.',
  },
  {
    icon: 'frontend',
    title: 'Frontend',
    body: 'React and TypeScript interfaces that stay smooth on a ₦40k Android over 3G — not just a MacBook on fibre.',
  },
  {
    icon: 'backend',
    title: 'Backend',
    body: 'APIs, databases and payment systems built for unreliable networks — idempotent, offline-tolerant, dependable.',
  },
  {
    icon: 'design',
    title: 'Creative Design',
    body: 'Brand identities, UI kits and design systems with a point of view — intentional, never templated.',
  },
] as const

export type Project = {
  tag: string
  title: string
  body: string
  cta: string
  image?: string
  stack?: string[]
}

export const projects: Project[] = [
  {
    tag: 'Web development',
    title: 'Food & pharmacy delivery marketplace',
    body: 'Four-sided marketplace — customers, vendors, riders, admin — with payments, live tracking and offline-tolerant flows.',
    cta: 'View case study',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Paystack'],
  },
  {
    tag: 'Web development',
    title: 'School management platform',
    body: 'Multi-tenant portal for results, fees and attendance used by three private schools — built to run on low-end devices.',
    cta: 'View case study',
    stack: ['React', 'Express', 'MySQL'],
  },
  {
    tag: 'Backend',
    title: 'Payments & wallet API',
    body: 'Node.js service handling transfers, webhooks and reconciliation with idempotent retries for flaky networks.',
    cta: 'Architecture notes',
    stack: ['Node.js', 'Redis', 'Webhooks'],
  },
  {
    tag: 'Backend',
    title: 'Offline-first sync engine',
    body: "Rust sync engine that queues writes locally and reconciles on reconnect — for apps that can't assume connectivity.",
    cta: 'Read the docs',
    stack: ['Rust', 'SQLite', 'CRDT'],
  },
  {
    tag: 'Frontend',
    title: 'Banking dashboard UI',
    body: 'React + TypeScript dashboard with charting and role-based views — 90+ Lighthouse score under 3G throttling.',
    cta: 'View screens',
    stack: ['React', 'TypeScript', 'D3'],
  },
  {
    tag: 'Frontend',
    title: 'E-commerce storefront rebuild',
    body: 'Migrated a jQuery store to a component system — cut bundle size 62% and doubled mobile conversion.',
    cta: 'Before / after',
    stack: ['React', 'Vite', 'Tailwind'],
  },
  {
    tag: 'Writing — Published book',
    title: 'The Final End Called Happiness',
    body: 'A book by E.E. Donald — “an end that reveals the beauty of becoming whole.” Written and published end to end: manuscript, editing and cover direction.',
    cta: 'Get the book',
    image: '/media/book-final-end-called-happiness.webp',
  },
  {
    tag: 'Writing',
    title: 'Fintech content & product copy',
    body: 'Blog posts, landing pages and in-app copy for two payments startups — compliance-heavy topics in plain language.',
    cta: 'Request samples',
  },
  {
    tag: 'Real estate',
    title: 'Lekki & Ajah residential sales',
    body: 'Off-plan apartments, land banking and rentals — every deal closed with verified titles and documentation support.',
    cta: 'See the portfolio',
  },
  {
    tag: 'Real estate',
    title: 'Diaspora buyer packages',
    body: 'End-to-end purchase management: inspection videos, legal verification and staged payment tracking for clients abroad.',
    cta: 'See the portfolio',
  },
]

export const designWork = [
  { src: '/media/design-fancy-finery.webp', alt: 'Fancy Finery — fashion brand flyer' },
  { src: '/media/design-nexora-pulse.webp', alt: 'Nexora Pulse X1 — product launch campaign' },
  { src: '/media/design-editorial-composite.webp', alt: 'Editorial photo composite' },
  { src: '/media/design-fips-break-pattern.webp', alt: 'FIPS Real Estate — Break the Pattern' },
  { src: '/media/design-fips-support.webp', alt: 'FIPS Real Estate — support campaign' },
  { src: '/media/design-fips-welcome-july.webp', alt: 'FIPS Real Estate — Welcome to July' },
  { src: '/media/design-ileri-sales-incentive.webp', alt: 'Ileri Residence — sales incentive' },
  { src: '/media/design-fips-monday.webp', alt: 'FIPS Real Estate — Monday series' },
  { src: '/media/design-ileri-amenities.webp', alt: 'Ileri Residence — amenities creative' },
  { src: '/media/design-sigma-car-charger.webp', alt: 'Sigma — car charger product ad' },
  { src: '/media/design-ileri-eco-choices.webp', alt: 'Ileri Residence — Eco Choices campaign' },
  { src: '/media/design-ileri-concrete.webp', alt: 'Ileri Residence — Concrete Structures campaign' },
] as const

export const properties = [
  { src: '/media/prop-apartment-exterior.webp', alt: 'Apartment development — exterior' },
  { src: '/media/prop-semi-detached-duplex.webp', alt: 'Semi-detached duplex — exterior' },
  { src: '/media/prop-detached-duplex.webp', alt: 'Detached duplex — exterior' },
  { src: '/media/prop-living-tray-ceiling.webp', alt: 'Living area — tray ceiling & marble tiles' },
  { src: '/media/prop-living-chandelier.webp', alt: 'Living room — chandelier & marble floors' },
  { src: '/media/prop-open-plan-living.webp', alt: 'Open-plan living space' },
  { src: '/media/prop-living-finished.webp', alt: 'Living area — finished interiors' },
  { src: '/media/prop-kitchen-island.webp', alt: 'Fitted kitchen — island & marble splashback' },
  { src: '/media/prop-bedroom-corner-windows.webp', alt: 'Bedroom — marble floors, corner windows' },
  { src: '/media/prop-bedroom-tray-ceiling.webp', alt: 'Bedroom — tray ceiling' },
  { src: '/media/prop-balcony-walkway.webp', alt: 'Balcony walkway' },
  { src: '/media/prop-master-bath-tub.webp', alt: 'Master bath — freestanding tub' },
  { src: '/media/prop-bath-glass-shower.webp', alt: 'Bathroom — glass shower enclosure' },
  { src: '/media/prop-shower-matte-black.webp', alt: 'Shower cubicle — matte black fittings' },
  { src: '/media/prop-bath-3d-tiles.webp', alt: 'Bathroom — 3D feature tiles' },
  { src: '/media/prop-bath-rainfall.webp', alt: 'Bathroom — rainfall shower' },
  { src: '/media/prop-guest-toilet.webp', alt: 'Guest toilet — vessel sink' },
  { src: '/media/prop-wall-hung-wc.webp', alt: 'Wall-hung WC — concealed cistern' },
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
  'Frontend',
  'Backend',
  'Creative Design',
  'Brand Identity',
  'Product Copy',
] as const
