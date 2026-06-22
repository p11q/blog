import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

export const profileSchema = z.object({
  email: z.string(),
  id: z.number(),
  name: z.string(),
  role: z.string(),
});

export const apiGetProfile = (): Promise<z.infer<typeof profileSchema>> =>
  fetchWithZod(profileSchema, {
    method: 'GET',
    url: 'users/profile',
  });
