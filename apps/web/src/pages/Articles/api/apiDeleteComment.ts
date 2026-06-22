import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

export const apiDeleteComment = (
  articleId: number,
  commentId: number,
): Promise<unknown> =>
  fetchWithZod(z.unknown(), {
    method: 'DELETE',
    url: `comments/${articleId}/${commentId}`,
  });
