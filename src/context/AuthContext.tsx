import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../services/dbService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    name: string,
    email: string,
    password?: string,
    role?: User['role'],
    schoolName?: string,
    collegeName?: string,
    companyName?: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const mapUser = (sbUser: any): User | null => {
    if (!sbUser) return null;
    return {
      id: sbUser.id,
      name: sbUser.user_metadata?.name || sbUser.email?.split('@')[0] || 'User',
      email: sbUser.email || '',
      role: sbUser.user_metadata?.role || 'student',
      schoolName: sbUser.user_metadata?.schoolName,
      collegeName: sbUser.user_metadata?.collegeName,
      companyName: sbUser.user_metadata?.companyName,
      avatarUrl: sbUser.user_metadata?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(sbUser.email || '')}`
    };
  };

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const mapped = mapUser(session.user);
        setUser(mapped);
        if (mapped) {
          localStorage.setItem('careerdna_current_user', JSON.stringify(mapped));
        }
      } else {
        setUser(null);
        localStorage.removeItem('careerdna_current_user');
      }
      setLoading(false);
    });

    // 2. Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const mapped = mapUser(session.user);
        setUser(mapped);
        if (mapped) {
          localStorage.setItem('careerdna_current_user', JSON.stringify(mapped));
        }
      } else {
        setUser(null);
        localStorage.removeItem('careerdna_current_user');
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || '',
      });

      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const mapped = mapUser(data.user);
        setUser(mapped);
        if (mapped) {
          localStorage.setItem('careerdna_current_user', JSON.stringify(mapped));
        }
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, error: 'User session not created.' };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Login failed.' };
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password?: string,
    role?: User['role'],
    schoolName?: string,
    collegeName?: string,
    companyName?: string
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password || '',
        options: {
          data: {
            name,
            role: role || 'student',
            schoolName,
            collegeName,
            companyName,
            avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
          }
        }
      });

      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const mapped = mapUser(data.user);
        if (data.session) {
          setUser(mapped);
          if (mapped) {
            localStorage.setItem('careerdna_current_user', JSON.stringify(mapped));
          }
        }
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, error: 'Registration failed.' };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Registration failed.' };
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) {
      setLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }
      setLoading(false);
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Password reset request failed.' };
    }
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('careerdna_current_user');
    setLoading(false);
  };

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('careerdna_current_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, loginWithGoogle, resetPassword, logout, updateProfile }}>
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
