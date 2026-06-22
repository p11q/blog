import { queryOptions } from '@tanstack/react-query';
import { apiGetProfile } from './apiGetProfile';

export const queryFactory = {
  profileOptions: () =>
    queryOptions({
      queryFn: () => apiGetProfile(),
      queryKey: ['profile'] as const,
      retry: 0,
    }),
};
