import { fetchWithZod } from '@/lib/fetchWithZod';
import { type Article, articleSchema } from './article.schema';

export interface ArticlePayload {
  description: string;
  tags: string;
  text: string;
  title: string;
}

export const apiCreateArticle = (payload: ArticlePayload): Promise<Article> =>
  fetchWithZod(articleSchema, {
    data: payload,
    method: 'POST',
    url: 'articles',
  });
