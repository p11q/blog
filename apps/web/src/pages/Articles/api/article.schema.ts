import { z } from 'zod';

const articleAuthorSchema = z
  .union([z.number(), z.object({ id: z.number(), name: z.string() })])
  .nullish()
  .transform((author) => {
    if (author == null) return null;
    if (typeof author === 'number') return { id: author, name: null };
    return author;
  });

export const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  text: z.string(),
  description: z.string().nullable(),
  tags: z.string().nullable(),
  createAt: z.string(),
  updateAt: z.string(),
  author: articleAuthorSchema,
});

export const articlesSchema = z.array(articleSchema);

export type Article = z.infer<typeof articleSchema>;
