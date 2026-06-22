import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const commentSchema = z.object({
  author: z.object({ id: z.number(), name: z.string() }).nullable(),
  createAt: z.string(),
  id: z.number(),
  text: z.string(),
  updateAt: z.string(),
});

const commentsSchema = z.array(commentSchema);

export const apiGetComments = (
  articleId: number,
): Promise<z.infer<typeof commentsSchema>> =>
  fetchWithZod(commentsSchema, {
    method: 'GET',
    url: `comments/${articleId}`,
  });
