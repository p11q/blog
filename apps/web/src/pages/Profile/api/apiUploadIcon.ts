import { API_BASE_URL } from '@/lib/axios';
import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const uploadIconSchema = z.object({
  icon: z
    .string()
    .nullish()
    .transform((value) =>
      value ? new URL(value, API_BASE_URL).toString() : null,
    ),
});

export const apiUploadIcon = (
  file: File,
): Promise<z.infer<typeof uploadIconSchema>> => {
  const formData = new FormData();
  formData.append('icon', file);

  return fetchWithZod(uploadIconSchema, {
    data: formData,
    method: 'POST',
    url: 'users/uploadIcon',
  });
};
