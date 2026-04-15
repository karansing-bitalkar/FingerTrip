import { useState, useEffect } from 'react';
import type { User } from '@/types';

const STORAGE_KEY = 'fingertrip_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return { user, loading, login, logout };
}

export function getStoredUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function storeUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}
