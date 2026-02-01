import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = ['logbook', 'shipyard'] as const;

const logbookTypes = ['journal', 'essay'] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    category: z.enum(categories),
    type: z.enum(logbookTypes).optional(), // For logbook entries: journal or essay
    heroImage: image().optional(),
    videoUrl: z.string().url().optional(),
    gallery: z.array(image()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
