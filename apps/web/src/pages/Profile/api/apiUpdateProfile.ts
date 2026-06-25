import { fetchWithZod } from '@/lib/fetchWithZod';
import { type Profile, profileSchema } from './apiGetProfile';

export interface UpdateProfilePayload {
  email: string;
  name: string;
}

export const apiUpdateProfile = (
  payload: UpdateProfilePayload,
): Promise<Profile> =>
  fetchWithZod(profileSchema, {
    data: payload,
    method: 'POST',
    url: 'users/update',
  });
