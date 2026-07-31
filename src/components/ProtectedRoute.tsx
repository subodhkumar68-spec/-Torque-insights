import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();

  console.log('[ProtectedRoute] Evaluating route access:', { session, loading });

  if (loading) {
    console.log('[ProtectedRoute] Session is currently loading. Rendering loader...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    console.warn('[ProtectedRoute] Access blocked: No active session detected. Redirecting to /login...');
    return <Navigate to="/login" replace />;
  }

  console.log('[ProtectedRoute] Access permitted.');
  return <>{children}</>;
};
