import { fetchWithZod } from '@/lib/fetchWithZod';
import { type Article, articleSchema } from './article.schema';

export interface ArticleDTO {
  description: string;
  tags: string;
  text: string;
  title: string;
}

export const apiCreateArticle = (payload: ArticleDTO): Promise<Article> =>
  fetchWithZod(articleSchema, {
    data: payload,
    method: 'POST',
    url: 'articles',
  });
