import { fetchWithZod } from '@/lib/fetchWithZod';
import type { ArticlePayload } from './apiCreateArticle';
import { articleSchema } from './article.schema';

export const apiUpdateArticle = (id: number, payload: ArticlePayload) =>
  fetchWithZod(articleSchema, {
    method: 'PUT',
    url: `articles/${id}`,
    data: payload,
  });
