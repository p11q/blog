import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const updateCommentResponseSchema = z.object({
  id: z.number(),
  text: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export const apiUpdateComment = (
  articleId: number,
  commentId: number,
  text: string,
) =>
  fetchWithZod(updateCommentResponseSchema, {
    method: 'PUT',
    url: `comments/${articleId}/${commentId}`,
    data: { text },
  });
