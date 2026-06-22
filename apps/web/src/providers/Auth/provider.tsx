import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import {
  clearTokens,
  getTokens,
  setTokens,
  TOKENS_CHANGED_EVENT,
  type Tokens,
} from './tokenStorage';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokensState] = useState<Tokens | null>(() => getTokens());

  useEffect(() => {
    const sync = () => setTokensState(getTokens());

    window.addEventListener(TOKENS_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener(TOKENS_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const onLogin = useCallback((data: Tokens) => setTokens(data), []);
  const onLogout = useCallback(() => clearTokens(), []);

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
