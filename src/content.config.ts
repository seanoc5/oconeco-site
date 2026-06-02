import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    rawTitle: z.string().optional(),
    slug: z.string(),
    sourceUrl: z.string().url().optional(),
    description: z.string().optional(),
    tagline: z.string().optional(),
    sectionContext: z.string().optional(),
  }),
});

export const collections = { pages };
