# Enuma Samuel — Portfolio

Personal portfolio for Enuma Samuel: writer, real estate agent, full-stack developer and
creative designer, based in Lagos, Nigeria.

Built with React + TypeScript + Vite, Tailwind CSS v4, Framer Motion, Three.js and Lucide icons.
Deployed on Vercel.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Structure

| Path | What it holds |
| --- | --- |
| `src/data/content.ts` | All copy, project entries, gallery captions and contact details. **Edit content here, not in components.** |
| `src/components/Hero.tsx` | The animated hero composite (wordmark, figure, glow, sparkles, labels). |
| `src/components/HeroCanvas.tsx` | WebGL particle field and core glow — custom GLSL shaders, lazy-loaded. |
| `src/components/ui/Icons.tsx` | Icon barrel: Lucide re-exports, keyed maps per section, plus three hand-rolled brand marks. |
| `src/components/Gallery.tsx` | Reusable image grid + lightbox, used for design work and properties. |
| `src/lib/hooks.ts` | Smooth scroll, scroll-spy, count-up, typed roles, pointer tracking. |
| `public/media/` | 32 WebP images carried over from the previous site. |

## Icons

All semantic icons come from [Lucide](https://lucide.dev). Lucide dropped brand marks in
v1, so the GitHub, LinkedIn and X logos are hand-rolled SVGs in `src/components/ui/Icons.tsx`
alongside the Lucide re-exports.

Sections reference icons by key rather than importing them directly — `specialityIcons`,
`processIcons`, `pillIcons` and `socialIcons` map the string in `content.ts` to a component.
To change an icon, edit the map, not the section.

## The hero

The hero carries no photograph or avatar. Its focal point is a typographic composite: a
chrome `DEVELOPER` wordmark over concentric animated rings — a pulsing key ring, a rotating
conic light sweep, a counter-rotating dashed ring, and four discipline words riding the
orbit — layered over a WebGL particle field.

Everything is independent of any subject image, so nothing needs re-composing if you later
decide to add one.

## Accessibility & performance

- Every animation is disabled under `prefers-reduced-motion`, including the WebGL canvas,
  smooth scrolling and the preloader.
- The Three.js bundle is code-split and lazy-loaded, so it never blocks first paint.
- Images are WebP, lazy-loaded and async-decoded.
- The lightbox traps Escape and arrow keys; the nav sheet closes on Escape.
