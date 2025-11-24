import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Newspaper, Users, Zap, LogOut, Home } from 'lucide-react';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAdminAuth();

  const menuItems = [
    {
      id: 'news',
      title: 'Quản lý Tin tức',
      description: 'Tạo, chỉnh sửa và quản lý tin tức của hệ thống',
      icon: Newspaper,
      path: '/admin/news',
      color: '#3b82f6'
    },
    {
      id: 'guilds',
      title: 'Quản lý Guilds',
      description: 'Quản lý các guild, sự kiện và cơ hội cho thành viên',
      icon: Users,
      path: '/admin/guilds',
      color: '#8b5cf6'
    },
    {
      id: 'opportunities',
      title: 'Quản lý Opportunities',
      description: 'Tạo và quản lý các sự kiện, cơ hội cho các guild',
      icon: Zap,
      path: '/admin/opportunities',
      color: '#f59e0b'
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      await logout();
      navigate('/admin/login');
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Navigation Header */}
      <div
        className="py-6 px-4 border-b"
        style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              boxShadow: 'inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 8px 8px 16px rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onClick={() => navigate('/')}
          >
            <img
              src="/images_uside/pet_cloud_uside.png"
              alt="USide Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold" style={{ color: '#f1f5f9' }}>
                USide Admin
              </h1>
              <p className="text-xs" style={{ color: '#94a3b8' }}>
                Control Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Info & Avatar */}
            <div
              className="flex items-center gap-3 px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)',
              }}
            >
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata?.full_name || 'User'}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  }}
                >
                  <span style={{ color: '#f1f5f9', fontWeight: 'bold', fontSize: '12px' }}>
                    {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <span style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: '600' }}>
                  {user?.user_metadata?.full_name || 'Admin User'}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '11px' }}>
                  {user?.email}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                color: '#f1f5f9',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Home className="w-4 h-4" />
              Trang chủ
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                boxShadow: 'inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
              }}
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div
            className="rounded-3xl p-8 mb-12 text-center"
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(20px)',
              boxShadow: 'inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#f1f5f9' }}>
              Chào mừng đến bảng điều khiển Admin
            </h2>
            <p style={{ color: '#94a3b8' }} className="max-w-2xl mx-auto">
              Quản lý toàn bộ hệ thống USide từ đây. Chọn một trong các tùy chọn bên dưới để bắt đầu.
            </p>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="group cursor-pointer transition-all duration-300"
                >
                  <div
                    className="rounded-3xl p-8 h-full flex flex-col items-center text-center hover:scale-105 transition-all duration-300"
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: 'inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      const element = e.currentTarget;
                      element.style.boxShadow = `inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.08), 0 25px 50px ${item.color}30`;
                      element.style.borderColor = item.color + '50';
                    }}
                    onMouseLeave={(e) => {
                      const element = e.currentTarget;
                      element.style.boxShadow = 'inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.2)';
                      element.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    {/* Icon Container */}
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                        border: `2px solid ${item.color}40`,
                        boxShadow: `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05), 0 0 20px ${item.color}30`,
                      }}
                    >
                      <IconComponent
                        className="w-10 h-10 transition-all duration-300 group-hover:scale-125"
                        style={{ color: item.color }}
                      />
                    </div>

                    {/* Content */}
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: '#f1f5f9' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: '#94a3b8' }}
                    >
                      {item.description}
                    </p>

                    {/* Action Button */}
                    <button
                      className="mt-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                        boxShadow: `inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.1), 0 0 12px ${item.color}40`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                        e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 2px 2px 4px rgba(255, 255, 255, 0.15), 0 0 20px ${item.color}60`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = `inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.1), 0 0 12px ${item.color}40`;
                      }}
                    >
                      Đi tới →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Section */}
          <div
            className="rounded-2xl p-6 mt-12"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: 'inset -8px -8px 16px rgba(0, 0, 0, 0.3), inset 8px 8px 16px rgba(255, 255, 255, 0.03)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Hệ thống', value: 'USide v1.0' },
                { label: 'Trạng thái', value: 'Hoạt động bình thường' },
                { label: 'Phiên bản', value: 'Production' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <p style={{ color: '#94a3b8' }} className="text-sm mb-1">
                    {item.label}
                  </p>
                  <p style={{ color: '#f1f5f9' }} className="font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
