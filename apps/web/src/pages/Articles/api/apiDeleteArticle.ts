import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

export const apiDeleteArticle = (id: number): Promise<unknown> =>
  fetchWithZod(z.unknown(), {
    method: 'DELETE',
    url: `articles/${id}`,
  });
