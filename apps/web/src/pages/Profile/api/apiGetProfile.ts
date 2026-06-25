import { API_BASE_URL } from '@/lib/axios';
import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

export const profileSchema = z.object({
  email: z.string(),
  icon: z
    .string()
    .nullish()
    .transform((value) =>
      value ? new URL(value, API_BASE_URL).toString() : null,
    ),
  id: z.number(),
  name: z.string(),
  role: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;

export const apiGetProfile = (): Promise<z.infer<typeof profileSchema>> =>
  fetchWithZod(profileSchema, {
    method: 'GET',
    url: 'users/profile',
  });
