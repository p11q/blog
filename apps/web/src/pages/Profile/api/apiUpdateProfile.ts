import { fetchWithZod } from '@/lib/fetchWithZod';
import { type ProfileResponse, profileSchema } from './apiGetProfile';

export interface UpdateProfileDTO {
  email: string;
  name: string;
}

export const apiUpdateProfile = (
  payload: UpdateProfileDTO,
): Promise<ProfileResponse> =>
  fetchWithZod(profileSchema, {
    data: payload,
    method: 'POST',
    url: 'users/update',
  });
