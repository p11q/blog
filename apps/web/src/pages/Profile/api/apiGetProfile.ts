import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

export const apiGetProfile = () =>
  fetchWithZod(profileSchema, {
    method: 'GET',
    url: 'users/profile',
  });
