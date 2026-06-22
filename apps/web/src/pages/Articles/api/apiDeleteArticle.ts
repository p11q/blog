import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

export const apiDeleteArticle = (id: number) =>
  fetchWithZod(z.unknown(), {
    method: 'DELETE',
    url: `articles/${id}`,
  });
