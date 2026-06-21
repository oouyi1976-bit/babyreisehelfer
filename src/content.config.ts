import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ratgeber = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/ratgeber',
    generateId: ({ entry }) => entry.replace(/\.md$/, '')
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    readingTime: z.number(),
    featuredProductIds: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([])
  })
});

export const collections = {
  ratgeber
};
