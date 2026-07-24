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

const link = z.object({
  label: z.string(),
  href: z.string(),
  badge: z.string().optional(),
  note: z.string().optional(),
});

const roles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/roles" }),
  schema: z.object({
    role: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string().optional(),
    painPoint: z.string(),
    toolLink: link,
    curatedLinks: z.array(link),
    featuredEssay: z.object({
      title: z.string(),
      href: z.string(),
      note: z.string().optional(),
    }),
    cta: z.object({
      label: z.string(),
      href: z.string(),
      text: z.string().optional(),
    }),
  }),
});

export const collections = { pages, roles };
