import { z } from 'zod';

const articleAuthorSchema = z
  .union([z.number(), z.object({ id: z.number(), name: z.string() })])
  .nullish()
  .transform((author) => {
    if (author == null) {
      return null;
    }

    if (typeof author === 'number') {
      return { id: author, name: null };
    }

    return author;
  });

export const articleSchema = z.object({
  author: articleAuthorSchema,
  createAt: z.string(),
  description: z.string().nullable(),
  id: z.number(),
  tags: z.string().nullable(),
  text: z.string(),
  title: z.string(),
  updateAt: z.string(),
});

export const articlesSchema = z.array(articleSchema);

export type Article = z.infer<typeof articleSchema>;
