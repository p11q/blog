import { fetchWithZod } from '@/lib/fetchWithZod';
import type { ArticlePayload } from './apiCreateArticle';
import { type Article, articleSchema } from './article.schema';

export const apiUpdateArticle = (
  id: number,
  payload: ArticlePayload,
): Promise<Article> =>
  fetchWithZod(articleSchema, {
    data: payload,
    method: 'PUT',
    url: `articles/${id}`,
  });
