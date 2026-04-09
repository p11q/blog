import { useAuth } from '@/providers/Auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const RequireNotAuth = ({ children }: { children: React.ReactNode }) => {
  const { tokens } = useAuth();

  if (tokens) {
    return <Navigate to="/" replace />;
  }

  return children;
};
