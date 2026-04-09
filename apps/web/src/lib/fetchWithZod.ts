import { type AxiosRequestConfig, isAxiosError } from 'axios';
import { z } from 'zod';
import axios from './axios';

export async function fetchWithZod<TData>(
  schema: z.ZodType<TData>,
  config: AxiosRequestConfig,
): Promise<TData> {
  try {
    const response = await axios.request<unknown>({
      ...config,
    });

    const result = schema.safeParse(response.data);

    if (!result.success) {
      const readableErrors = z.prettifyError(result.error);

      throw new Error(readableErrors);
    }

    return result.data;
  } catch (err) {
    if (
      isAxiosError(err) &&
      err.response?.data !== undefined &&
      err.response.data !== null &&
      typeof err.response.data === 'object' &&
      'message' in err.response.data
    ) {
      const { message } = err.response.data;

      if (message) {
        throw new Error(message, { cause: err });
      }
    }
    throw err;
  }
}
