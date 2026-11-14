# Kim Arthem Son — Portfolio

Single-page portfolio built with Vite, React, TypeScript, and Tailwind CSS.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

## Edit content

All copy lives in `src/data/`. You shouldn't need to touch any JSX.

| File | What's in it |
| --- | --- |
| `src/data/profile.ts` | Name, photo, city and time zone (for the live clock), hero text and button label, availability, Contact copy and form labels, social links, nav labels, footer |
| `src/data/services.ts` | Services section: the roles you're looking for (`lookingFor`, set `highlight: true` for the dark card) and the services you offer (`offer`) |
| `src/data/projects.ts` | Projects: one object per project |
| `src/data/skills.ts` | Skill categories and their pills, plus the scrolling logo strip (`marqueeTech`) |
| `src/data/techIcons.ts` | Icon and brand color for each tech name, matched by exact name |
| `src/data/awards.ts` | Awards list, heading, and intro line. `kind` picks the icon: `win` is a gold trophy, `honor` a star, `participant` a flag |

The types for all of these are in `src/types/index.ts`.

- **New skill:** add the name to `skills.ts`. To give it an icon, add the same name to `techIcons.ts` with an icon from [react-icons](https://react-icons.github.io/react-icons/) (the `Si` set has brand logos) and its brand color. A name with no entry still shows, just without an icon.
- **Project links:** a link with `href: '#'` shows as muted "(soon)" text instead of a dead link. Put in a real URL and it becomes a live link. A live "Live Demo" link also makes the screenshot clickable.
- **Avatar:** the photo is `public/avatar.jpg`. Replace it with a higher-resolution square photo (800×800 or more) for sharper results on high-density screens.

## Contact form

There's no backend. The form builds an email from the visitor's name, subject and message, then either opens their email app (`mailto:`) or opens Gmail's compose window in a new tab. Either way it's pre-filled to `sonkimarthem@gmail.com`, and nothing is sent until they press send. The labels and button text are in `profile.ts` under `contact.form`.

## Project screenshots

Each project in `src/data/projects.ts` has a `screenshots` list. The first one is the cover, and the gallery crossfades through the rest automatically (with clickable thumbnails underneath).

1. Put images in `public/projects/`. Screenshots about 1280×610 (a wide browser window) fit the frame best; taller ones are cropped from the top.
2. Add an entry: `{ src: '/projects/my-shot.jpg', caption: 'Dashboard', alt: 'What the screenshot shows' }`.
3. The caption appears on the frame and under the thumbnail; the `alt` text is read by screen readers.

If an image path is wrong, that slide falls back to a neutral block with the project name.

## Image performance

You only ever add normal JPG/PNG files. `npm run images` (run automatically before `npm run dev` and `npm run build`, including on Vercel) turns every photo in `public/projects/` and `public/avatar.jpg` into small AVIF and WebP copies at several widths in `public/img/`. The page then serves:

- AVIF to browsers that support it, WebP otherwise, and the original JPG as a last resort
- the smallest width that looks sharp on each screen (phones never download the 1280px version unless they have a high-density display)
- project slides only when they are about to be shown, and thumbnails as tiny 400px copies

`public/img/` is generated, so it is git-ignored. Vercel caches the built JS/CSS for a year and images for a day (see `vercel.json`).

## Swap in the resume

Replace `public/resume.pdf` with your real resume and keep the same filename. If you use a different name, update `resumeUrl` in `profile.ts`.

## Link previews (Open Graph)

`index.html` points to `/og-image.png` for link previews. Add a **1200×630** PNG at `public/og-image.png`. Some platforms (LinkedIn, Facebook) need absolute URLs, so once you have a domain, change `og:image` and `twitter:image` to the full URL, e.g. `https://your-domain.vercel.app/og-image.png`, and add an `og:url` tag.

## Theme

The theme toggle cycles **system → light → dark**, and the choice is saved in `localStorage`. Colors are CSS custom properties in `src/index.css` (`:root` for light, `.dark` for dark), and `tailwind.config.js` maps them to classes such as `bg-surface`, `bg-page`, `text-ink`, and `text-muted`. To change the palette, edit the RGB values in `index.css`.

## Deploy to Vercel

Push the repo to GitHub, then import it at vercel.com/new. Vercel detects Vite automatically: the build command is `npm run build` and the output directory is `dist` (both are also set in `vercel.json`).
