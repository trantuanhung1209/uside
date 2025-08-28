import React, { useState, useEffect } from 'react';
import { AdminAuthContext } from './AdminAuthContextCore';
import type { AdminAuthContextType } from './AdminAuthContextCore';

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLoggedIn = localStorage.getItem('admin_authenticated') === 'true';
        setIsAuthenticated(isLoggedIn);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simple check for admin credentials
      if (username === 'usideAdmin' && password === 'usideAdmin') {
        setIsAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const value: AdminAuthContextType = {
    isAuthenticated,
    login,
    logout,
    loading
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
