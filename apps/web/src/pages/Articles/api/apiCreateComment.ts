import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const createCommentResponseSchema = z.object({
  id: z.number(),
  text: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export const apiCreateComment = (articleId: number, text: string) =>
  fetchWithZod(createCommentResponseSchema, {
    method: 'POST',
    url: `comments/${articleId}`,
    data: { text },
  });
