import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const createCommentResponseSchema = z.object({
  createAt: z.string(),
  id: z.number(),
  text: z.string(),
  updateAt: z.string(),
});

export const apiCreateComment = (
  articleId: number,
  text: string,
): Promise<z.infer<typeof createCommentResponseSchema>> =>
  fetchWithZod(createCommentResponseSchema, {
    data: { text },
    method: 'POST',
    url: `comments/${articleId}`,
  });
