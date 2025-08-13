import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (name, email, password) => {
    try {
      const data = await api.register(name, email, password);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      const data = await api.login(email, password);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const signOut = async () => {
    api.logout();
    setUser(null);
    localStorage.removeItem('user');
    return { error: null };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
}