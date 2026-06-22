import { queryOptions } from '@tanstack/react-query';
import { apiGetArticle } from './apiGetArticle';
import { apiGetArticles } from './apiGetArticles';
import { apiGetComments } from './apiGetComments';
import { apiGetImages } from './apiImages';
import { apiGetDislikesCount, apiGetLikesCount } from './apiReactions';

export const articlesQueryFactory = {
  commentsOptions: (id: number) =>
    queryOptions({
      queryFn: () => apiGetComments(id),
      queryKey: ['articles', id, 'comments'] as const,
      retry: 0,
    }),
  detailOptions: (id: number) =>
    queryOptions({
      queryFn: () => apiGetArticle(id),
      queryKey: ['articles', id] as const,
      retry: 0,
    }),
  dislikesOptions: (id: number) =>
    queryOptions({
      queryFn: () => apiGetDislikesCount(id),
      queryKey: ['articles', id, 'dislikes'] as const,
      retry: 0,
    }),
  imagesOptions: (id: number) =>
    queryOptions({
      queryFn: () => apiGetImages(id),
      queryKey: ['articles', id, 'images'] as const,
      retry: 0,
    }),
  likesOptions: (id: number) =>
    queryOptions({
      queryFn: () => apiGetLikesCount(id),
      queryKey: ['articles', id, 'likes'] as const,
      retry: 0,
    }),
  listOptions: () =>
    queryOptions({
      queryFn: () => apiGetArticles(),
      queryKey: ['articles'] as const,
      retry: 0,
    }),
};
