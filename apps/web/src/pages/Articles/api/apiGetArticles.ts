import { fetchWithZod } from '@/lib/fetchWithZod';
import { articlesSchema } from './article.schema';

export const apiGetArticles = () =>
  fetchWithZod(articlesSchema, {
    method: 'GET',
    url: 'articles',
  });
