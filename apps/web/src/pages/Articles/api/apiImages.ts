import { API_BASE_URL } from '@/lib/axios';
import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const imageSchema = z.object({
  id: z.number(),
  url: z.string().transform((url) => new URL(url, API_BASE_URL).toString()),
});

const imagesSchema = z.array(imageSchema);

export const apiGetImages = (articleId: number) =>
  fetchWithZod(imagesSchema, {
    method: 'GET',
    url: `upload/${articleId}`,
  });

export const apiUploadImage = (articleId: number, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return fetchWithZod(imageSchema, {
    method: 'POST',
    url: `upload/${articleId}`,
    data: formData,
  });
};
