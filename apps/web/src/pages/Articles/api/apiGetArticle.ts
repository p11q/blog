import { fetchWithZod } from '@/lib/fetchWithZod';
import { type Article, articleSchema } from './article.schema';

export const apiGetArticle = (id: number): Promise<Article> =>
  fetchWithZod(articleSchema, {
    method: 'GET',
    url: `articles/${id}`,
  });
