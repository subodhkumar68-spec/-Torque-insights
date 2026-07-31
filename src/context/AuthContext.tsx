import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../services/dbService';
import { FREE_MODE } from '../config';

interface AuthContextType {
  user: User | null;
  session: Session | null;
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
  signup: (
    name: string,
    email: string,
    password?: string,
    role?: User['role'],
    schoolName?: string,
    collegeName?: string,
    companyName?: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  googleLogin: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updatedUser: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
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
      avatarUrl: sbUser.user_metadata?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(sbUser.email || '')}`,
      plan: FREE_MODE ? 'Premium' : sbUser.user_metadata?.plan || 'Premium',
      credits: FREE_MODE ? 'Unlimited' : sbUser.user_metadata?.credits || 'Unlimited',
      subscription: FREE_MODE ? 'Active' : sbUser.user_metadata?.subscription || 'Active',
      status: FREE_MODE ? 'Active' : sbUser.user_metadata?.status || 'Active',
      reportsCount: FREE_MODE ? 'Unlimited' : sbUser.user_metadata?.reportsCount || 'Unlimited',
      aiSessionsCount: FREE_MODE ? 'Unlimited' : sbUser.user_metadata?.aiSessionsCount || 'Unlimited',
      downloadsCount: FREE_MODE ? 'Unlimited' : sbUser.user_metadata?.downloadsCount || 'Unlimited'
    };
  };

  const syncSupabaseProfile = async (mappedUser: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', mappedUser.id)
        .single();

      if (error || !data) {
        await supabase
          .from('profiles')
          .insert([{
            id: mappedUser.id,
            name: mappedUser.name,
            email: mappedUser.email,
            role: mappedUser.role,
            plan: mappedUser.plan,
            subscription: mappedUser.subscription,
            credits: mappedUser.credits,
            status: mappedUser.status
          }]);
      } else {
        await supabase
          .from('profiles')
          .update({
            name: mappedUser.name,
            role: mappedUser.role,
            plan: mappedUser.plan,
            subscription: mappedUser.subscription,
            credits: mappedUser.credits,
            status: mappedUser.status
          })
          .eq('id', mappedUser.id);
      }
    } catch (err) {
      console.warn('Supabase profiles synchronization skipped (table/RLS check):', err);
    }
  };

  useEffect(() => {
    let active = true;

    console.log('[AuthContext] Initializing session check...');
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session: sbSession } }) => {
      if (!active) return;
      console.log('[AuthContext] getSession result:', sbSession);
      setSession(sbSession);
      if (sbSession?.user) {
        const mapped = mapUser(sbSession.user);
        console.log('[AuthContext] Authenticated user loaded:', mapped);
        setUser(mapped);
        if (mapped) {
          localStorage.setItem('careerdna_current_user', JSON.stringify(mapped));
          syncSupabaseProfile(mapped);
        }
      } else {
        console.log('[AuthContext] No active session found during initialization.');
        setUser(null);
        localStorage.removeItem('careerdna_current_user');
      }
      setLoading(false);
    });

    // 2. Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sbSession) => {
      if (!active) return;
      console.log(`[AuthContext] onAuthStateChange event [${event}]:`, sbSession);
      setSession(sbSession);
      if (sbSession?.user) {
        const mapped = mapUser(sbSession.user);
        console.log('[AuthContext] Authenticated user changed:', mapped);
        setUser(mapped);
        if (mapped) {
          localStorage.setItem('careerdna_current_user', JSON.stringify(mapped));
          syncSupabaseProfile(mapped);
        }
      } else {
        console.log('[AuthContext] Session cleared.');
        setUser(null);
        localStorage.removeItem('careerdna_current_user');
      }
      setLoading(false);
    });

    return () => {
      active = false;
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
    setSession(null);
    localStorage.removeItem('careerdna_current_user');
    setLoading(false);
  };

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('careerdna_current_user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = !!session;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        signUp,
        signup: signUp,
        loginWithGoogle,
        googleLogin: loginWithGoogle,
        resetPassword,
        logout,
        updateProfile,
        isAuthenticated,
      }}
    >
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
