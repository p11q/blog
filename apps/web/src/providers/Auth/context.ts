import { createContext, useContext } from 'react';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContext {
  tokens: Tokens | null;
  onLogin: (data: Tokens) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
