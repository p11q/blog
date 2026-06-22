import { queryOptions } from '@tanstack/react-query';
import { apiGetProfile } from './apiGetProfile';

export const queryFactory = {
  profileOptions: () =>
    queryOptions({
      queryKey: ['profile'] as const,
      queryFn: () => apiGetProfile(),
      retry: 0,
      staleTime: Infinity,
    }),
};
