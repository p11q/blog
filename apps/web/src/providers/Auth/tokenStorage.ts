import { z } from 'zod';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const STORAGE_KEY = 'tokens';
export const TOKENS_CHANGED_EVENT = 'tokens-changed';

const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const getTokens = (): null | Tokens => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const result = tokensSchema.safeParse(JSON.parse(raw));

    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

export const setTokens = (tokens: Tokens): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  window.dispatchEvent(new Event(TOKENS_CHANGED_EVENT));
};

export const clearTokens = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(TOKENS_CHANGED_EVENT));
};
