import { useCallback, useMemo, useState } from 'react';
import z from 'zod';
import { AuthContext, type Tokens } from './context';

const storedUserSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const parsedUserFromLocalStorage = localStorage.getItem('tokens');

    const parsedUser = z
      .string()
      .transform((value) => {
        try {
          const objectFromString = JSON.parse(value) as unknown;

          if (
            typeof objectFromString !== 'object' ||
            objectFromString === null ||
            Object.keys(objectFromString).length === 0
          ) {
            return null;
          }

          return objectFromString;
        } catch {
          return null;
        }
      })
      .pipe(storedUserSchema.nullable())
      .safeParse(parsedUserFromLocalStorage);

    return parsedUser.success ? parsedUser.data : null;
  });

  const onLogin = useCallback((data: Tokens) => {
    localStorage.setItem('tokens', JSON.stringify(data));

    setTokens(data);
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem('tokens');

    setTokens(null);
  }, []);

  const value = useMemo(
    () => ({
      tokens,
      onLogin,
      onLogout,
    }),
    [tokens, onLogin, onLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
