# Deep Dive Blog

Personal blog at **https://deep-dive.today** built with Astro, featuring an underwater deep-sea theme with interactive bioluminescent effects.

## Project Structure

```
src/
├── content/blog/          # Markdown posts by category
│   ├── logbook/           # Journals, essays, reflections
│   └── shipyard/          # Projects, software, tutorials
├── components/
│   ├── SeaCreatures.astro # Interactive fish, bioluminescent orb, feeding effects
│   ├── Header.astro       # Navigation with fish feed toggle
│   ├── Footer.astro       # Seabed/bedrock styled footer
│   ├── PostCard.astro     # Blog post cards
│   ├── BaseHead.astro     # SEO meta tags
│   ├── CategoryBadge.astro
│   └── Button.astro
├── layouts/
│   ├── BaseLayout.astro   # Root layout with underwater effects
│   └── BlogPost.astro     # Individual post layout
├── pages/
│   ├── index.astro        # Homepage
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro    # Blog listing
│   │   └── [...slug].astro
│   ├── category/
│   │   └── [category].astro
│   └── rss.xml.js
└── styles/
    └── global.css         # Design tokens and base styles
```

## Design System

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep Obsidian Navy | `#0B1221` |
| Accent | Cadmium Orange | `#F97316` |
| Grid/Borders | Graphite Blue | `#3D4A5C` |
| Text | Warm White | `#FAF6F1` |
| Text Muted | Beige | `#C9B8A8` |
| Shadows | Copper Rust | `#9A3412` |

**Typography:**
- Headings: Playfair Display
- Body: Source Serif 4
- Accent: Cormorant Garamond
- Navigation: DM Sans
- Logo: Lora

## Interactive Features

### Fish & Feeding System (SeaCreatures.astro)
- **Click**: Drop food particles (orange glowing)
- **Hold 3 seconds**: Gather bioluminescent energy orb (cyan glow)
- **Release after charged**: Explosive food burst
- **Toggle**: Fish feed on/off switch in header

### Visual Effects
- Boid-flocking fish with natural movement
- Surface light rays with gentle ripple
- Caustic underwater light patterns
- Bioluminescent charging orb (deep-sea anglerfish style)

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Blog Post Format

Posts go in `src/content/blog/{category}/filename.md`:

```yaml
---
title: "Post Title"
description: "Brief description (max 160 chars)"
pubDate: 2024-01-15
category: logbook
type: journal              # For logbook: "journal" or "essay"
heroImage: ./image.jpg      # optional
tags: ["tag1", "tag2"]      # optional
featured: false             # show on homepage
draft: false                # hide from production
---

Post content in Markdown...
```

## Categories

- `logbook` - Written reflections (journals, essays, thoughts)
- `shipyard` - Building things (projects, software, tutorials)

### Logbook Types

- `journal` - Personal reflections, daily thoughts, stream of consciousness
- `essay` - Polished, structured explorations of ideas

## Deployment

- **Hosting**: Cloudflare Pages
- **Project**: deep-dive-d4u.pages.dev
- **Domain**: deep-dive.today
- **Auto-deploy**: Push to GitHub triggers build
- **Repository**: github.com/snaagent/deep-dive

## Common Tasks

### Create a new post
1. Create file in `src/content/blog/{category}/post-slug.md`
2. Add frontmatter with required fields
3. Write content in Markdown
4. Set `draft: false` when ready to publish

### Add a new category
1. Create folder in `src/content/blog/`
2. Update content schema if needed in `src/content.config.ts`

### Modify underwater effects
Edit `src/components/SeaCreatures.astro` - contains all fish behavior, particle effects, and charging mechanics.
