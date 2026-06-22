import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import {
  clearTokens,
  getTokens,
  setTokens,
  TOKENS_CHANGED_EVENT,
  type Tokens,
} from './tokenStorage';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [tokens, setTokensState] = useState<null | Tokens>(() => getTokens());

  useEffect(() => {
    const sync = (): void => {
      setTokensState(getTokens());
    };

    window.addEventListener(TOKENS_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener(TOKENS_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const onLogin = useCallback((data: Tokens) => {
    setTokens(data);
  }, []);
  const onLogout = useCallback(() => {
    clearTokens();
  }, []);

  const value = useMemo(
    () => ({
      onLogin,
      onLogout,
      tokens,
    }),
    [tokens, onLogin, onLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
