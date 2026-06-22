import { fetchWithZod } from '@/lib/fetchWithZod';
import { articleSchema } from './article.schema';

export interface ArticlePayload {
  title: string;
  description: string;
  text: string;
  tags: string;
}

export const apiCreateArticle = (payload: ArticlePayload) =>
  fetchWithZod(articleSchema, {
    method: 'POST',
    url: 'articles',
    data: payload,
  });
