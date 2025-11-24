import React, { useState, useEffect } from 'react';
import { AdminAuthContext } from './AdminAuthContextCore';
import type { AdminAuthContextType } from './AdminAuthContextCore';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  // Check if user has admin role
  const isUserAdmin = (userData: User | null): boolean => {
    if (!userData) return false;
    const role = userData.user_metadata?.role;
    return role === 'admin';
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setIsAuthenticated(false);
          setUser(null);
          setHasAdminRole(false);
          setShowUnauthorized(false);
        } else if (session?.user) {
          const isAdmin = isUserAdmin(session.user);
          setIsAuthenticated(true);
          setUser(session.user);
          setHasAdminRole(isAdmin);
          setShowUnauthorized(!isAdmin); // Show unauthorized if not admin
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setHasAdminRole(false);
          setShowUnauthorized(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
        setUser(null);
        setHasAdminRole(false);
        setShowUnauthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const isAdmin = isUserAdmin(session.user);
          setIsAuthenticated(true);
          setUser(session.user);
          setHasAdminRole(isAdmin);
          setShowUnauthorized(!isAdmin); // Show unauthorized if not admin
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setHasAdminRole(false);
          setShowUnauthorized(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`,
        },
      });

      if (error) {
        console.error('Google login error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setHasAdminRole(false);
        setShowUnauthorized(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: AdminAuthContextType = {
    isAuthenticated: isAuthenticated && hasAdminRole,
    user: hasAdminRole ? user : null,
    loginWithGoogle,
    logout,
    loading,
    hasAdminRole,
    showUnauthorized
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {showUnauthorized ? (
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            className="rounded-3xl p-8 max-w-md w-full text-center"
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔐</div>
            <h2 style={{ color: "#f1f5f9", fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
              Truy Cập Bị Từ Chối
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "24px", lineHeight: "1.6" }}>
              Tài khoản của bạn không có quyền truy cập vào khu vực quản trị này. Vui lòng liên hệ với quản trị viên để nhận quyền truy cập.
            </p>
            <button
              onClick={logout}
              className="w-full px-6 py-3 rounded-lg transition-all duration-300 text-white font-semibold cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                boxShadow: "inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px rgba(239, 68, 68, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.15), 0 0 20px rgba(239, 68, 68, 0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px rgba(239, 68, 68, 0.5)";
              }}
            >
              Đăng Xuất
            </button>
            <p style={{ color: "#64748b", marginTop: "16px", fontSize: "12px" }}>
              📧 {user?.email}
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </AdminAuthContext.Provider>
  );
};
