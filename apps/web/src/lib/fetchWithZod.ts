import { type AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import axios from './axios';

export async function fetchWithZod<TData>(
  schema: z.ZodType<TData>,
  config: AxiosRequestConfig,
): Promise<TData> {
  const response = await axios.request<unknown>({
    ...config,
  });

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const result = schema.safeParse(response.data);

  if (!result.success) {
    const readableErrors = z.prettifyError(result.error);

    throw new Error(readableErrors);
  }

  return result.data;
}
