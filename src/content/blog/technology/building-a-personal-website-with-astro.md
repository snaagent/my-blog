---
title: "Building a Personal Website with Astro"
description: "How I built this blog using Astro, a modern static site generator that delivers lightning-fast performance."
pubDate: 2024-01-15
category: technology
tags: ["astro", "web-development", "static-sites"]
featured: true
draft: false
---

## Why Astro?

When I decided to build a personal blog, I wanted something that prioritized performance and developer experience. Astro stood out for several reasons:

1. **Zero JavaScript by default** - Pages ship with no client-side JS unless you need it
2. **Component Islands** - Add interactivity only where needed
3. **Content Collections** - Type-safe content management with Zod schemas
4. **Fast build times** - Optimized for quick development cycles

## The Design System

I call it "Blueprint & Canvas" - a design language inspired by technical drawings and architectural blueprints:

- **Deep Obsidian Navy** (`#0B1221`) for backgrounds
- **Cadmium Orange** (`#F97316`) for accents
- **Dot-grid patterns** for that technical notebook feel
- **Monospace typography** for metadata and code

The vignette effect adds depth, drawing the eye toward the content while the subtle dot pattern provides visual texture without distraction.

## Key Features

### Content Collections

Astro's content collections with Zod validation ensure type safety:

```typescript
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    category: z.enum(categories),
    // ...
  }),
});
```

### Responsive Design

The site works beautifully on all devices, from mobile phones to ultrawide monitors. The grid-based layout adapts fluidly.

### Performance

With Astro's static generation, pages load instantly. No JavaScript frameworks bloating the bundle - just HTML, CSS, and content.

## What's Next

I'm planning to add:
- Search functionality
- Dark/light mode toggle
- Comments via Giscus
- More categories and content

Stay tuned for more posts!
