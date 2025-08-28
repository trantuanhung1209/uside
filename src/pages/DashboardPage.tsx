import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Search, Filter, Download, LogOut } from 'lucide-react';
import { Layout } from '../components/layout';
import { BannerBreadcrumb } from '../components';
import NewsFormModal from '../components/ui/NewsFormModal';
import NewsTable from '../components/ui/NewsTable';
import StatsCards from '../components/ui/StatsCards';
import { newsService } from '../services/newsService';
import type { NewsFormData, FirestoreNewsItem } from '../services/newsService';
import { useScrollToTop, useAccentColor } from '../hooks';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  useScrollToTop();
  const { currentAccentColor } = useAccentColor();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  
  const [news, setNews] = useState<(FirestoreNewsItem & { id: string })[]>([]);
  const [filteredNews, setFilteredNews] = useState<(FirestoreNewsItem & { id: string })[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
    pinned: 0
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<(FirestoreNewsItem & { id: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'update', label: 'Cập nhật' },
    { value: 'security', label: 'Bảo mật' },
    { value: 'partnership', label: 'Đối tác' },
    { value: 'recruitment', label: 'Tuyển dụng' },
    { value: 'technology', label: 'Công nghệ' },
    { value: 'event', label: 'Sự kiện' }
  ];

  const statuses = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'published', label: 'Đã xuất bản' },
    { value: 'draft', label: 'Bản nháp' },
    { value: 'archived', label: 'Đã lưu trữ' }
  ];

  // Load data
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [newsData, statsData] = await Promise.all([
        newsService.getAllNews(),
        newsService.getNewsStats()
      ]);
      
      setNews(newsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter news
  useEffect(() => {
    let filtered = [...news];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    setFilteredNews(filtered);
  }, [news, searchTerm, selectedCategory, selectedStatus]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData: NewsFormData) => {
    try {
      setIsSubmitting(true);
      
      if (editingNews) {
        await newsService.updateNews(editingNews.id, formData);
      } else {
        await newsService.createNews(formData);
      }
      
      await loadData();
      setIsModalOpen(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (newsItem: FirestoreNewsItem & { id: string }) => {
    setEditingNews(newsItem);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (newsId: string) => {
    try {
      setIsLoading(true);
      await newsService.deleteNews(newsId);
      await loadData();
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Có lỗi xảy ra khi xóa tin tức');
    }
  };

  // Handle toggle pin
  const handleTogglePin = async (newsId: string, pinned: boolean) => {
    try {
      await newsService.togglePinNews(newsId, pinned);
      await loadData();
    } catch (error) {
      console.error('Error toggling pin:', error);
      alert('Có lỗi xảy ra khi cập nhật ghim');
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    loadData();
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
      navigate('/admin/login');
    }
  };

  // Export data (placeholder)
  const handleExport = () => {
    const dataStr = JSON.stringify(filteredNews, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'news-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Dashboard Quản lý Tin tức"
        image="/images_uside/banner_news.png"
      />
      
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <StatsCards stats={stats} isLoading={isLoading} />

          {/* Header Actions */}
          <div 
            className="rounded-2xl p-6 mb-8 transition-all duration-300"
            style={{
              background: "var(--color-background)",
              boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)"
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Quản lý Tin tức
                </h2>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  Tạo, chỉnh sửa và quản lý tất cả tin tức của bạn
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    boxShadow: "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.12)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.12)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Làm mới
                </button>
                
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    boxShadow: "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.12)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.12)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Download className="w-4 h-4" />
                  Xuất dữ liệu
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: "var(--color-background)",
                    color: "#ff3b30",
                    boxShadow: "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.12)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "rgba(255, 59, 48, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.12)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "var(--color-background)";
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
                
                <button
                  onClick={() => {
                    setEditingNews(null);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 text-white font-semibold"
                  style={{
                    background: currentAccentColor,
                    boxShadow: `inset -6px -6px 12px rgba(22, 17, 29, 0.15), inset 4px 4px 8px #FAFBFF, 0 0 15px ${currentAccentColor}40`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(22, 17, 29, 0.2), inset 4px 4px 8px #FAFBFF, 0 0 20px ${currentAccentColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(22, 17, 29, 0.15), inset 4px 4px 8px #FAFBFF, 0 0 15px ${currentAccentColor}40`;
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Tạo tin tức mới
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div 
            className="rounded-2xl p-6 mb-8 transition-all duration-300"
            style={{
              background: "var(--color-background)",
              boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)"
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5" style={{ color: currentAccentColor }} />
              <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Bộ lọc</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Tìm kiếm
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-text-secondary)" }} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm theo tiêu đề, nội dung..."
                    className="w-full pl-10 pr-3 py-2 rounded-lg transition-all duration-300"
                    style={{
                      background: "var(--color-background)",
                      color: "var(--color-text-primary)",
                      border: "1px solid rgba(224, 247, 250, 0.2)",
                      boxShadow: "inset -4px -4px 8px rgba(22, 17, 29, 0.1), inset 4px 4px 8px #FAFBFF"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(22, 17, 29, 0.15), inset 6px 6px 12px #FAFBFF, 0 0 8px ${currentAccentColor}40`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "inset -4px -4px 8px rgba(22, 17, 29, 0.1), inset 4px 4px 8px #FAFBFF";
                    }}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    border: "1px solid rgba(224, 247, 250, 0.2)",
                    boxShadow: "inset -4px -4px 8px rgba(22, 17, 29, 0.1), inset 4px 4px 8px #FAFBFF"
                  }}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Trạng thái
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: "var(--color-background)",
                    color: "var(--color-text-primary)",
                    border: "1px solid rgba(224, 247, 250, 0.2)",
                    boxShadow: "inset -4px -4px 8px rgba(22, 17, 29, 0.1), inset 4px 4px 8px #FAFBFF"
                  }}
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
                  Kết quả
                </label>
                <div 
                  className="h-10 flex items-center px-3 py-2 rounded-lg"
                  style={{
                    background: "var(--color-background-secondary)",
                    border: "1px solid rgba(224, 247, 250, 0.2)",
                    boxShadow: "inset -2px -2px 4px rgba(22, 17, 29, 0.08), inset 2px 2px 4px #FAFBFF"
                  }}
                >
                  <span className="text-sm" style={{ color: currentAccentColor, fontWeight: "600" }}>
                    {filteredNews.length} / {news.length} tin tức
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* News Table */}
          <NewsTable
            news={filteredNews}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePin={handleTogglePin}
            isLoading={isLoading}
          />

          {/* Form Modal */}
          <NewsFormModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingNews(null);
            }}
            onSubmit={handleSubmit}
            editingNews={editingNews}
            isLoading={isSubmitting}
          />
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
