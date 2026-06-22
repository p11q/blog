import { fetchWithZod } from '@/lib/fetchWithZod';
import { articleSchema } from './article.schema';

export const apiGetArticle = (id: number) =>
  fetchWithZod(articleSchema, {
    method: 'GET',
    url: `articles/${id}`,
  });
