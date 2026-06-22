import { fetchWithZod } from '@/lib/fetchWithZod';
import { type Article, articlesSchema } from './article.schema';

export const apiGetArticles = (): Promise<Article[]> =>
  fetchWithZod(articlesSchema, {
    method: 'GET',
    url: 'articles',
  });
