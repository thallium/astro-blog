import { defineCollection, z } from 'astro:content';

const post = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		authors: z.array(z.string()).optional(),
		categories: z.array(z.string()).optional(),
		category: z.string().optional(),
		date: z.coerce.date(),
		draft: z.boolean().optional(),
		featured: z.boolean().optional(),
		image: z.object({}).optional(),
		keywords: z.array(z.string()).optional(),
		lastmod: z.coerce.date().optional(),
		layout: z.string().optional(),
		math: z.boolean().optional(),
		output: z.string().optional(),
		profile: z.boolean().optional(),
		projects: z.array(z.string()).optional(),
		published: z.boolean().optional(),
		subtitle: z.string().optional(),
		summary: z.string().optional(),
		tags: z.string().array().optional().nullable(),
		title: z.string()
	}),
});


const homePage = defineCollection({
	type: 'content',
})
export const collections = { 
	'posts': post,
	'home-page': homePage,
};
