import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, User, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAccentColor } from '../hooks';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAdminAuth();
  const { currentAccentColor } = useAccentColor();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(formData.username, formData.password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Tài khoản hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-background)" }}>
        <div 
          className="flex items-center gap-3 px-6 py-4 rounded-2xl"
          style={{
            background: "var(--color-background)",
            boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)"
          }}
        >
          <div className="loading-spinner"></div>
          <span style={{ color: "var(--color-text-primary)" }}>Đang kiểm tra quyền truy cập...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-background)" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-10 animate-float-slow"
          style={{ background: currentAccentColor }}
        />
        <div 
          className="absolute top-40 right-32 w-24 h-24 rounded-lg opacity-10 animate-float-medium"
          style={{ background: currentAccentColor, transform: "rotate(45deg)" }}
        />
        <div 
          className="absolute bottom-32 left-32 w-40 h-40 rounded-full opacity-10 animate-float-fast"
          style={{ background: currentAccentColor }}
        />
        <div 
          className="absolute bottom-20 right-20 w-20 h-20 rounded-lg opacity-10 animate-float-slow"
          style={{ background: currentAccentColor, transform: "rotate(30deg)" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl mb-6"
            style={{
              background: "var(--color-background)",
              boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)"
            }}
          >
            <img 
              src="/images_uside/uside_dark.png" 
              alt="USide Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                USide
              </h1>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Admin Panel
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6" style={{ color: currentAccentColor }} />
            <h2 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
              Đăng nhập Admin
            </h2>
          </div>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Vui lòng đăng nhập để truy cập bảng điều khiển
          </p>
        </div>

        {/* Login Form */}
        <div 
          className="rounded-3xl p-8 relative overflow-hidden backdrop-blur-lg"
          style={{
            background: "var(--color-background)",
            boxShadow: "-20px -20px 40px #FAFBFF, 20px 20px 40px rgba(22, 17, 29, 0.15)",
            border: "1px solid rgba(224, 247, 250, 0.2)"
          }}
        >
          {/* Form glow effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${currentAccentColor} 0%, transparent 70%)`
            }}
          />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-semibold mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                Tài khoản
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5" style={{ color: currentAccentColor }} />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Nhập tài khoản admin"
                  className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 focus:outline-none"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    border: "1px solid rgba(224, 247, 250, 0.2)",
                    boxShadow: "inset -6px -6px 12px rgba(22, 17, 29, 0.1), inset 6px 6px 12px #FAFBFF"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(22, 17, 29, 0.15), inset 8px 8px 16px #FAFBFF, 0 0 12px ${currentAccentColor}30`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "inset -6px -6px 12px rgba(22, 17, 29, 0.1), inset 6px 6px 12px #FAFBFF";
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5" style={{ color: currentAccentColor }} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-12 pr-12 py-4 rounded-xl transition-all duration-300 focus:outline-none"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    border: "1px solid rgba(224, 247, 250, 0.2)",
                    boxShadow: "inset -6px -6px 12px rgba(22, 17, 29, 0.1), inset 6px 6px 12px #FAFBFF"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(22, 17, 29, 0.15), inset 8px 8px 16px #FAFBFF, 0 0 12px ${currentAccentColor}30`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "inset -6px -6px 12px rgba(22, 17, 29, 0.1), inset 6px 6px 12px #FAFBFF";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" style={{ color: "var(--color-text-secondary)" }} />
                  ) : (
                    <Eye className="w-5 h-5" style={{ color: "var(--color-text-secondary)" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="p-4 rounded-xl text-sm text-center"
                style={{
                  background: "rgba(255, 59, 48, 0.1)",
                  color: "#ff3b30",
                  border: "1px solid rgba(255, 59, 48, 0.2)"
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: currentAccentColor,
                boxShadow: `inset -6px -6px 12px rgba(22, 17, 29, 0.15), inset 4px 4px 8px #FAFBFF, 0 0 15px ${currentAccentColor}40`
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(22, 17, 29, 0.2), inset 4px 4px 8px #FAFBFF, 0 0 20px ${currentAccentColor}60`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(22, 17, 29, 0.15), inset 4px 4px 8px #FAFBFF, 0 0 15px ${currentAccentColor}40`;
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Đăng nhập
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm transition-all duration-300"
            style={{ color: "var(--color-text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentAccentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-secondary)";
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
