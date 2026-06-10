import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** A pillar: one of the three faces of the discipline. Body = general
 *  explanation; frontmatter carries its two tenets and a resource list,
 *  rendered as accordions on the pillar page. */
const pillars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pillars' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    summary: z.string(),
    tenets: z.array(
      z.object({
        title: z.string(),
        details: z.string(),
      })
    ),
    resources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url().optional(),
          note: z.string().optional(),
        })
      )
      .default([]),
  }),
});

/** Free-standing prose sections (the Approach page body). */
const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { pillars, sections };
