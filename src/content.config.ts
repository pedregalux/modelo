import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Carga Markdown, MDX y Markdoc (`.mdoc`, generados por Keystatic).
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().nullable().optional(),
			heroImage: z.optional(image().nullable()),
			tags: z.array(z.string()).optional().default([]),
		}),
});

const publications = defineCollection({
	loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx,mdoc}' }),
	schema: z.object({
		title: z.string(),
		authors: z.string(),
		venue: z.string(),
		type: z.string(),
		date: z.coerce.date(),
		description: z.string().nullable().optional(),
		doi: z.string().nullable().optional(),
		url: z.string().nullable().optional(),
		featured: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx,mdoc}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().nullable().optional(),
			status: z.enum(['activo', 'finalizado', 'en pausa']).default('activo'),
			tags: z.array(z.string()).default([]),
			heroImage: z.optional(image().nullable()),
			links: z
				.object({
					github: z.string().url().nullable().optional(),
					site: z.string().url().nullable().optional(),
					paper: z.string().url().nullable().optional(),
				})
				.nullable()
				.optional(),
			featured: z.boolean().default(false),
		}),
});

const videos = defineCollection({
	loader: glob({ base: './src/content/videos', pattern: '**/*.{md,mdx,mdoc}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		url: z.string(),
		duration: z.string().nullable().optional(),
		tags: z.array(z.string()).optional().default([]),
		featured: z.boolean().default(false),
	}),
});

export const collections = { blog, publications, projects, videos };