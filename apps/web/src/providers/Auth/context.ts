import { createContext, useContext } from 'react';
import type { Tokens } from './tokenStorage';

export type { Tokens };

export interface AuthContext {
  onLogin: (data: Tokens) => void;
  onLogout: () => void;
  tokens: null | Tokens;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
