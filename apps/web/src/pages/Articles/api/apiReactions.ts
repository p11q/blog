import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

export const apiGetLikesCount = (articleId: number): Promise<number> =>
  fetchWithZod(z.number(), {
    method: 'GET',
    url: `like/${articleId}`,
  });

export const apiGetDislikesCount = (articleId: number): Promise<number> =>
  fetchWithZod(z.number(), {
    method: 'GET',
    url: `dislike/${articleId}`,
  });

export const apiToggleLike = (articleId: number): Promise<string> =>
  fetchWithZod(z.string(), {
    method: 'POST',
    url: `like/${articleId}`,
  });

export const apiToggleDislike = (articleId: number): Promise<string> =>
  fetchWithZod(z.string(), {
    method: 'POST',
    url: `dislike/${articleId}`,
  });
