import { fetchWithZod } from '@/lib/fetchWithZod';
import type { ArticleDTO } from './apiCreateArticle';
import { type Article, articleSchema } from './article.schema';

export const apiUpdateArticle = (
  id: number,
  payload: ArticleDTO,
): Promise<Article> =>
  fetchWithZod(articleSchema, {
    data: payload,
    method: 'PUT',
    url: `articles/${id}`,
  });
