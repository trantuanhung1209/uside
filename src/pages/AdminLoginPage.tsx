import React, { useEffect } from 'react';
import { LogIn, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAccentColor } from '../hooks';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, loading, isAuthenticated } = useAdminAuth();
  const { currentAccentColor } = useAccentColor();

  // If already authenticated, redirect to admin page
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const success = await loginWithGoogle();
      if (!success) {
        console.error('Google login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)" }}>
        <div 
          className="flex items-center gap-3 px-6 py-4 rounded-2xl"
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 8px 8px 16px rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <div className="loading-spinner"></div>
          <span style={{ color: "#e2e8f0" }}>Đang kiểm tra quyền truy cập...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-20 animate-float-slow"
          style={{ background: currentAccentColor }}
        />
        <div 
          className="absolute top-40 right-32 w-24 h-24 rounded-lg opacity-20 animate-float-medium"
          style={{ background: currentAccentColor, transform: "rotate(45deg)" }}
        />
        <div 
          className="absolute bottom-32 left-32 w-40 h-40 rounded-full opacity-20 animate-float-fast"
          style={{ background: currentAccentColor }}
        />
        <div 
          className="absolute bottom-20 right-20 w-20 h-20 rounded-lg opacity-20 animate-float-slow"
          style={{ background: currentAccentColor, transform: "rotate(30deg)" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl mb-6 cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}

            onClick={() => navigate('/')}
          >
            <img 
              src="/images_uside/pet_cloud_uside.png" 
              alt="USide Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>
                USide
              </h1>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Admin Panel
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6" style={{ color: currentAccentColor }} />
            <h2 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
              Đăng nhập Admin
            </h2>
          </div>
          <p style={{ color: "#94a3b8" }}>
            Vui lòng đăng nhập để truy cập bảng điều khiển
          </p>
        </div>

        {/* Login Form */}
        <div 
          className="rounded-3xl p-8 relative overflow-hidden backdrop-blur-lg"
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: "inset -20px -20px 40px rgba(0, 0, 0, 0.5), inset 20px 20px 40px rgba(255, 255, 255, 0.03), 0 25px 50px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Form glow effect */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${currentAccentColor} 0%, transparent 70%)`
            }}
          />

          <form onSubmit={(e) => { e.preventDefault(); handleGoogleLogin(); }} className="space-y-6 relative z-10">
            {/* Google Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${currentAccentColor} 0%, ${currentAccentColor}dd 100%)`,
                boxShadow: `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.15), 0 0 20px ${currentAccentColor}70`;
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`;
                }
              }}
            >
              {loading ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  Đang kết nối...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Đăng nhập với Google
                </>
              )}
            </button>

            {/* Info Text */}
            <div 
              className="p-4 rounded-xl text-sm text-center"
              style={{
                background: "rgba(59, 130, 246, 0.15)",
                color: "#93c5fd",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              Đăng nhập bằng Google để truy cập bảng điều khiển admin
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm transition-all duration-300"
            style={{ color: "#94a3b8" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentAccentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            ← Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
