import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const commentSchema = z.object({
  id: z.number(),
  text: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
  author: z.object({ id: z.number(), name: z.string() }).nullable(),
});

const commentsSchema = z.array(commentSchema);

export const apiGetComments = (articleId: number) =>
  fetchWithZod(commentsSchema, {
    method: 'GET',
    url: `comments/${articleId}`,
  });
