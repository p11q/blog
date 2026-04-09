import { useAuth } from '@/providers/Auth';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { tokens } = useAuth();

  if (!tokens) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};
