# My Blog

A personal blog built with [Astro](https://astro.build) using the "Blueprint & Canvas" design system.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
my-blog/
├── src/
│   ├── content/blog/       # Markdown posts by category
│   ├── components/         # Astro components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   └── styles/             # Global CSS
├── public/                 # Static assets
├── astro.config.mjs        # Astro configuration
└── package.json
```

## Adding New Posts

Create a markdown file in `src/content/blog/{category}/`:

```yaml
---
title: "Your Post Title"
description: "A brief description (max 160 chars)"
pubDate: 2024-01-15
category: technology  # robotics|spirituality|nature|technology|cooking|books|mindset|everyday-life
tags: ["tag1", "tag2"]
featured: false
draft: false
---

Your content here...
```

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repo in Netlify
3. Deploy automatically

The `netlify.toml` file is pre-configured.

## Design System

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep Obsidian Navy | `#0B1221` |
| Accent | Cadmium Orange | `#F97316` |
| Grid/Borders | Graphite Blue | `#334155` |
| Text | Technical White | `#F1F5F9` |
| Shadows | Copper Rust | `#9A3412` |

Typography: Inter (body), JetBrains Mono (metadata)
