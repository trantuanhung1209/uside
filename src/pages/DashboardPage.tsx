import React, { useState, useEffect } from "react";
import {
  Plus,
  RefreshCw,
  Search,
  Filter,
  Download,
  LogOut,
} from "lucide-react";
import NewsFormModal from "../components/ui/NewsFormModal";
import NewsTable from "../components/ui/NewsTable";
import StatsCards from "../components/ui/StatsCards";
import { newsService } from "../services/newsService";
import type { NewsFormData, FirestoreNewsItem } from "../services/newsService";
import { useScrollToTop, useAccentColor } from "../hooks";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  useScrollToTop();
  const { currentAccentColor } = useAccentColor();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const [news, setNews] = useState<(FirestoreNewsItem & { id: string })[]>([]);
  const [filteredNews, setFilteredNews] = useState<
    (FirestoreNewsItem & { id: string })[]
  >([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
    pinned: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<
    (FirestoreNewsItem & { id: string }) | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const categories = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "update", label: "Cập nhật" },
    { value: "security", label: "Bảo mật" },
    { value: "partnership", label: "Đối tác" },
    { value: "recruitment", label: "Tuyển dụng" },
    { value: "technology", label: "Công nghệ" },
    { value: "event", label: "Sự kiện" },
  ];

  const statuses = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "published", label: "Đã xuất bản" },
    { value: "draft", label: "Bản nháp" },
    { value: "archived", label: "Đã lưu trữ" },
  ];

  // Load data
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [newsData, statsData] = await Promise.all([
        newsService.getAllNews(),
        newsService.getNewsStats(),
      ]);

      setNews(newsData);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter news
  useEffect(() => {
    let filtered = [...news];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.author &&
            item.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.tags &&
            item.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((item) => item.status === selectedStatus);
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
      console.error("Error submitting form:", error);
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
      console.error("Error deleting news:", error);
      alert("Có lỗi xảy ra khi xóa tin tức");
    }
  };

  // Handle toggle pin
  const handleTogglePin = async (newsId: string, pinned: boolean) => {
    try {
      await newsService.togglePinNews(newsId, pinned);
      await loadData();
    } catch (error) {
      console.error("Error toggling pin:", error);
      alert("Có lỗi xảy ra khi cập nhật ghim");
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    loadData();
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
      navigate("/admin/login");
    }
  };

  // Export data (placeholder)
  const handleExport = () => {
    const dataStr = JSON.stringify(filteredNews, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "news-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        minHeight: "100vh",
      }}
    >

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <StatsCards stats={stats} isLoading={isLoading} />

          {/* Header Actions */}
          <div
            className="rounded-2xl p-6 mb-8 transition-all duration-300"
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Quản lý Tin tức
                </h2>
                <p style={{ color: "#94a3b8" }}>
                  Tạo, chỉnh sửa và quản lý tất cả tin tức của bạn
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor =
                      currentAccentColor + "40";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                  Làm mới
                </button>

                <button
                  onClick={handleExport}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor =
                      currentAccentColor + "40";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <Download className="w-4 h-4" />
                  Xuất dữ liệu
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#fca5a5",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    boxShadow:
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background =
                      "rgba(239, 68, 68, 0.15)";
                    e.currentTarget.style.borderColor =
                      "rgba(239, 68, 68, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                    e.currentTarget.style.borderColor =
                      "rgba(239, 68, 68, 0.3)";
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>

                <button
                  onClick={() => {
                    setEditingNews(null);
                    setIsModalOpen(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 text-white font-semibold cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${currentAccentColor} 0%, ${currentAccentColor}dd 100%)`,
                    boxShadow: `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-2px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.15), 0 0 20px ${currentAccentColor}70`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`;
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
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter
                className="w-5 h-5"
                style={{ color: currentAccentColor }}
              />
              <h3
                className="text-lg font-semibold"
                style={{ color: "#f1f5f9" }}
              >
                Bộ lọc
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Tìm kiếm
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                    style={{ color: "#94a3b8" }}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm theo tiêu đề, nội dung..."
                    className="w-full pl-10 pr-3 py-2 rounded-lg transition-all duration-300"
                    style={{
                      background: "rgba(30, 41, 59, 0.8)",
                      color: "#f1f5f9",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow:
                        "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.08), 0 0 8px ${currentAccentColor}40`;
                      e.currentTarget.style.borderColor =
                        currentAccentColor + "40";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow =
                        "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.1)";
                    }}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {categories.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                      style={{ background: "#1e293b", color: "#f1f5f9" }}
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Trạng thái
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {statuses.map((status) => (
                    <option
                      key={status.value}
                      value={status.value}
                      style={{ background: "#1e293b", color: "#f1f5f9" }}
                    >
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Kết quả
                </label>
                <div
                  className="h-10 flex items-center px-3 py-2 rounded-lg"
                  style={{
                    background: "rgba(51, 65, 85, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.03)",
                  }}
                >
                  <span
                    className="text-sm"
                    style={{ color: currentAccentColor, fontWeight: "600" }}
                  >
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
    </div>
  );
};

export default DashboardPage;
