import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User } from '../services/dbService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, role: User['role'], schoolName?: string, collegeName?: string, companyName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const activeUser = authService.getCurrentUser();
    setUser(activeUser);
    setLoading(false);
  }, []);

  const login = async (email: string, role?: string) => {
    setLoading(true);
    const result = authService.login(email, role);
    if (result.success && result.user) {
      setUser(result.user);
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, error: result.error };
  };

  const signUp = async (
    name: string,
    email: string,
    role: User['role'],
    schoolName?: string,
    collegeName?: string,
    companyName?: string
  ) => {
    setLoading(true);
    const result = authService.signUp(name, email, role, schoolName, collegeName, companyName);
    if (result.success && result.user) {
      setUser(result.user);
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, error: result.error };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = (updatedUser: User) => {
    const savedUser = authService.updateProfile(updatedUser);
    setUser(savedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
