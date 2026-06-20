// src/context/AuthContext.tsx
//
// Manages the logged-in user's session: stores the JWT and user
// profile in localStorage, exposes login/logout/signup helpers,
// and provides the current user to the rest of the app.

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch } from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    role: 'BUYER' | 'SELLER';
    phone?: string;
    address?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('lsm-token');
    const storedUser = localStorage.getItem('lsm-user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Corrupted storage; clear it.
        localStorage.removeItem('lsm-user');
        localStorage.removeItem('lsm-token');
      }
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.success) {
      const { user: loggedInUser, token: newToken } = res.data;
      setUser(loggedInUser);
      setToken(newToken);
      localStorage.setItem('lsm-token', newToken);
      localStorage.setItem('lsm-user', JSON.stringify(loggedInUser));
      return { success: true };
    }
    return { success: false, message: res.message };
  }

  async function signup(data: {
    name: string;
    email: string;
    password: string;
    role: 'BUYER' | 'SELLER';
    phone?: string;
    address?: string;
  }) {
    const res = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success) {
      const { user: newUser, token: newToken } = res.data;
      setUser(newUser);
      setToken(newToken);
      localStorage.setItem('lsm-token', newToken);
      localStorage.setItem('lsm-user', JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, message: res.message };
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('lsm-token');
    localStorage.removeItem('lsm-user');
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
