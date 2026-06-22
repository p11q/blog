import { queryOptions } from '@tanstack/react-query';
import { apiGetArticle } from './apiGetArticle';
import { apiGetArticles } from './apiGetArticles';
import { apiGetComments } from './apiGetComments';
import { apiGetImages } from './apiImages';
import { apiGetDislikesCount, apiGetLikesCount } from './apiReactions';

export const articlesQueryFactory = {
  listOptions: () =>
    queryOptions({
      queryKey: ['articles'] as const,
      queryFn: () => apiGetArticles(),
      retry: 0,
    }),
  detailOptions: (id: number) =>
    queryOptions({
      queryKey: ['articles', id] as const,
      queryFn: () => apiGetArticle(id),
      retry: 0,
    }),
  commentsOptions: (id: number) =>
    queryOptions({
      queryKey: ['articles', id, 'comments'] as const,
      queryFn: () => apiGetComments(id),
      retry: 0,
    }),
  likesOptions: (id: number) =>
    queryOptions({
      queryKey: ['articles', id, 'likes'] as const,
      queryFn: () => apiGetLikesCount(id),
      retry: 0,
    }),
  dislikesOptions: (id: number) =>
    queryOptions({
      queryKey: ['articles', id, 'dislikes'] as const,
      queryFn: () => apiGetDislikesCount(id),
      retry: 0,
    }),
  imagesOptions: (id: number) =>
    queryOptions({
      queryKey: ['articles', id, 'images'] as const,
      queryFn: () => apiGetImages(id),
      retry: 0,
    }),
};
