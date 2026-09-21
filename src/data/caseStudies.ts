/**
 * Long-form write-ups for the work that has a public repository behind it.
 * Every claim here is traceable to the repo — commits, dependencies, or the
 * planning docs checked into it. Nothing is estimated or rounded up.
 */

export type Section = {
  heading: string
  body: string[]
  bullets?: string[]
}

export type CaseStudy = {
  slug: string
  /** Must match the `title` of the matching entry in `projects`. */
  project: string
  title: string
  tagline: string
  year: string
  role: string
  stack: string[]
  links: { label: string; href: string }[]
  facts: { label: string; value: string }[]
  /** Screenshot of the live site, shown under the header. */
  cover: string
  intro: string
  sections: Section[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'fancy-finery',
    project: 'Fancy Finery — clothing marketplace',
    title: 'Fancy Finery',
    tagline: 'A single-brand luxury clothing store, built end to end and running in production.',
    year: '2026',
    role: 'Everything — storefront, admin, backend, infrastructure',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Drizzle ORM',
      'Better Auth',
      'Redis',
      'MinIO',
      'Paystack',
      'Stripe',
      'Docker',
      'Caddy',
    ],
    links: [
      { label: 'Visit the store', href: 'https://fancyfinerybup.com' },
      { label: 'Read the source', href: 'https://github.com/ezedon2332-Sigma/fancyfinerybup' },
    ],
    facts: [
      { label: 'Commits', value: '144' },
      { label: 'Languages', value: 'English, French, Spanish' },
      { label: 'Currencies', value: 'NGN, USD, EUR, GBP' },
      { label: 'Status', value: 'Live' },
    ],
    cover: '/media/preview-fancy-finery.webp',
    intro:
      'Fancy Finery is a clothing brand that sells to customers in Nigeria and to Nigerians living abroad. Those two groups pay for things in completely different ways, and most store platforms make you pick one of them. I built the whole shop instead — the storefront people browse, the admin section the brand runs it from, and the servers underneath.',
    sections: [
      {
        heading: 'The problem with picking a platform',
        body: [
          'A customer in Lagos wants to pay by bank transfer or USSD, from a bank app, in naira. A customer in London wants to tap a card and be charged in pounds. Off-the-shelf stores tend to be excellent at one of these and awkward about the other, and the awkward one is where you lose the sale.',
          'There was a second worry. Building the whole shop on one company\'s platform means that when their pricing changes, or a service you depend on gets retired, the shop is their problem to break and yours to fix. For a business whose entire income runs through that shop, that felt like too much trust to hand over on day one.',
        ],
      },
      {
        heading: 'How it is put together',
        body: [
          'The code is organised so that the rules of the business sit apart from the services that happen to be providing them. Products, orders, reviews and shipping live in one place. The things that could be swapped out — the database, the login system, the file storage, the payment providers, the email sender, the cache — each sit behind their own small boundary.',
          'That sounds like bookkeeping until you have to change something. It is the reason the rest of this page is possible.',
        ],
      },
      {
        heading: 'Taking payments two ways at once',
        body: [
          'The shop runs two payment providers side by side and picks based on what the customer is buying in. Paystack handles naira and dollars, and offers the full set of local options — card, bank transfer, USSD, QR. Stripe handles euros and pounds.',
          'Customers are charged in the currency they chose, not shown one price and billed in another. That distinction is small on the page and not small on a bank statement.',
        ],
      },
      {
        heading: 'Making "paid" actually mean paid',
        body: [
          'Payment providers confirm a sale by calling your server back. Those calls can arrive twice, arrive out of order, or not arrive at all because a network dropped at the wrong moment. If you take them at face value, you eventually mark an order paid twice, or leave a customer who really did pay staring at an unpaid order.',
          'I found and closed two places where a repeated confirmation would have been processed twice. Then, because a webhook that never arrives cannot be fixed by handling it better, I added a job that runs daily, walks every payment attempt that never reached a conclusion, asks the provider what actually happened, and settles it.',
          'The failure path got the same treatment — orders created before that work existed were being left behind by the failure webhooks, so those were brought in too.',
        ],
      },
      {
        heading: 'Moving the whole thing in-house',
        body: [
          'The shop started on a hosted platform that provided the database, logins and file storage together. Partway through, I moved all three onto servers I control: PostgreSQL for data, Better Auth for accounts, and MinIO for product images.',
          'This is normally a rewrite. Here it was a contained change, because each of those was already behind its own boundary — the storefront and admin code did not know or care which service was answering. The work was in the adapters, not the shop.',
        ],
      },
      {
        heading: 'Security, treated as ongoing work',
        body: [
          'One flaw is worth naming plainly: it was possible to forge an order that belonged to someone else. The database rules meant to prevent that had a gap in them. I found it and closed it.',
          'Beyond that, the project has been patched against an authentication-bypass and a server-side request forgery issue in the framework, a denial-of-service in an ID generator, and a handful of advisories in build tooling. A vulnerability scanner runs as part of the build, so the next one gets caught by the pipeline rather than by me remembering to look.',
        ],
      },
      {
        heading: 'Getting it into production',
        body: [
          'The application ships as a container, sits behind Caddy for TLS, and deploys through a pipeline with a staging branch in front of production. Images are built once and promoted rather than rebuilt per environment.',
          'The storefront reads the catalogue on the server, so pages arrive as finished HTML rather than as a loading spinner — which matters more on a phone on mobile data than on a laptop on fibre.',
        ],
        bullets: [
          'Storefront, cart, checkout, collections, lookbook, account and newsletter',
          'Admin section behind a role check, with no route to self-signup',
          'Three languages, translated end to end',
          'A shopping assistant that answers questions about the catalogue',
          'Image handling that stopped re-downloading full-size originals on every request',
        ],
      },
      {
        heading: 'What I would tell you over coffee',
        body: [
          'The interesting part of this project was never the shop. It was that the shop kept needing to change underneath — a different database, a second payment provider, a third language — and each change stayed a contained piece of work instead of a rewrite.',
          'That is the whole argument for spending the extra day on structure at the start. You do not feel the benefit on day one. You feel it on the day someone says "can we also take euros".',
        ],
      },
    ],
  },
  {
    slug: 'portfolio',
    project: 'This portfolio site',
    title: 'This portfolio',
    tagline: 'The site you are reading, rebuilt from a single HTML file into something maintainable.',
    year: '2026',
    role: 'Design and build',
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS v4',
      'Framer Motion',
      'Three.js',
      'GLSL',
      'Lenis',
    ],
    links: [
      { label: 'Visit the site', href: 'https://enuma-samuel-portfolio.vercel.app' },
      { label: 'Read the source', href: 'https://github.com/ezedon2332-Sigma/enuma-samuel-portfolio' },
    ],
    facts: [
      { label: 'Was', value: 'One 1MB HTML file' },
      { label: 'Images', value: '32, re-encoded' },
      { label: 'Contrast fix', value: '3.19:1 → 8.8:1' },
      { label: 'Status', value: 'Live' },
    ],
    cover: '/media/preview-portfolio.webp',
    intro:
      'The previous version of this site was a single HTML file just over a megabyte in size, with thirty-two photographs pasted directly into the markup as text. It worked. It was also impossible to change one thing without scrolling through everything, and every visitor downloaded every image before seeing anything.',
    sections: [
      {
        heading: 'Starting with the images',
        body: [
          'The thirty-two photographs were embedded in the HTML itself, encoded as text. Encoding an image that way makes it about a third larger, and it means the browser cannot cache it, skip it, or load it later — it arrives with the page, every time, whether or not anyone scrolls that far.',
          'Pulling them out and re-encoding them as WebP files took the whole set to roughly 700KB, and more importantly made them separate files the browser can cache and defer. Images below the fold now load when they are approached rather than up front.',
        ],
      },
      {
        heading: 'The hero, and the cost of it',
        body: [
          'The background is a field of several hundred particles drifting and reacting to the pointer, drawn on the graphics card with shaders written for it. It is the most expensive thing on the page by a wide margin.',
          'So it is not in the main bundle. It loads separately, after the page is usable, and it never loads at all for someone who has asked their system to reduce motion. The site is entirely readable if it never arrives.',
        ],
      },
      {
        heading: 'A contrast bug worth admitting',
        body: [
          'The name in the hero used a blue gradient whose dominant colour measured 3.19 against the background behind it. The accepted floor for body text is 4.5. It was not a matter of taste — the text was failing a standard, and on a laptop in daylight it was genuinely hard to read.',
          'Fixing it meant lightening the gradient, thinning out the particle field behind the text, and putting a soft dark layer between the two. The same colour was being used for real copy elsewhere, so that moved too. Everything now measures above 8.7.',
        ],
      },
      {
        heading: 'Motion that asks permission',
        body: [
          'There is a lot of movement here: scroll-linked parallax, text that rises into place, counters that count, a cursor that swells over links, momentum scrolling.',
          'All of it checks whether the visitor has asked for reduced motion, and all of it stops if they have — not slowed down, stopped, including the smooth scrolling and the graphics canvas. Motion should be something a site offers, not something it imposes.',
        ],
        bullets: [
          'Graphics canvas split out of the main bundle and loaded after first paint',
          'Every animation gated behind a reduced-motion check',
          'Image gallery navigable by keyboard, closes on Escape',
          'Contrast measured rather than eyeballed',
        ],
      },
      {
        heading: 'Why this counts as a project',
        body: [
          'A portfolio is the one piece of work where nobody else sets the brief, which makes it a fair test of what someone does when left alone. This one says: measure the thing you are unsure about, keep the expensive part optional, and do not make the visitor pay for decoration before they can read the page.',
        ],
      },
    ],
  },
]

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug)
export const caseStudyForProject = (title: string) =>
  caseStudies.find((c) => c.project === title)
