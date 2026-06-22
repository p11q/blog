import {
  clearTokens,
  getTokens,
  setTokens,
} from '@/providers/Auth/tokenStorage';
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const API_BASE_URL = 'http://localhost:3000/';

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    const tokens = getTokens();

    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (error: unknown) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

let refreshPromise: null | Promise<string> = null;

const refreshAccessToken = async (): Promise<string> => {
  const tokens = getTokens();

  if (!tokens?.refreshToken) {
    throw new Error('No refresh token');
  }

  const { data } = await axios.post<{
    accessToken: string;
    refreshToken: string;
  }>(`${API_BASE_URL}auth/refresh-token`, { token: tokens.refreshToken });

  setTokens(data);

  return data.accessToken;
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const isRefreshRequest = original?.url?.includes('auth/refresh-token');
    const shouldRefresh =
      error.response?.status === 401 &&
      !!original &&
      !original._retry &&
      !isRefreshRequest;

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      refreshPromise =
        refreshPromise ??
        refreshAccessToken().finally(() => {
          refreshPromise = null;
        });

      const accessToken = await refreshPromise;
      original.headers.Authorization = `Bearer ${accessToken}`;

      return await instance(original);
    } catch (refreshError) {
      clearTokens();

      return Promise.reject(
        refreshError instanceof Error
          ? refreshError
          : new Error(String(refreshError)),
      );
    }
  },
);

export default instance;
