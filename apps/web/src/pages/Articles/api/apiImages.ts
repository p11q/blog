import { API_BASE_URL } from '@/lib/axios';
import { fetchWithZod } from '@/lib/fetchWithZod';
import { z } from 'zod';

const imageSchema = z.object({
  id: z.number(),
  url: z.string().transform((url) => new URL(url, API_BASE_URL).toString()),
});

const imagesSchema = z.array(imageSchema);

export const apiGetImages = (
  articleId: number,
): Promise<z.infer<typeof imagesSchema>> =>
  fetchWithZod(imagesSchema, {
    method: 'GET',
    url: `upload/${articleId}`,
  });

export const apiUploadImage = (
  articleId: number,
  file: File,
): Promise<z.infer<typeof imageSchema>> => {
  const formData = new FormData();
  formData.append('file', file);

  return fetchWithZod(imageSchema, {
    data: formData,
    method: 'POST',
    url: `upload/${articleId}`,
  });
};
