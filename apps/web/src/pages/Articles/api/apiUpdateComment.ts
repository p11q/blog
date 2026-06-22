import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const updateCommentResponseSchema = z.object({
  createAt: z.string(),
  id: z.number(),
  text: z.string(),
  updateAt: z.string(),
});

export const apiUpdateComment = (
  articleId: number,
  commentId: number,
  text: string,
): Promise<z.infer<typeof updateCommentResponseSchema>> =>
  fetchWithZod(updateCommentResponseSchema, {
    data: { text },
    method: 'PUT',
    url: `comments/${articleId}/${commentId}`,
  });
