import React from 'react';
import { Edit2, Trash2, Pin, PinOff, Eye, Calendar, User, Tag } from 'lucide-react';
import type { FirestoreNewsItem } from '../../services/newsService';
import { useAccentColor } from '../../hooks/useAccentColor';

interface NewsTableProps {
  news: (FirestoreNewsItem & { id: string })[];
  onEdit: (news: FirestoreNewsItem & { id: string }) => void;
  onDelete: (newsId: string) => void;
  onTogglePin: (newsId: string, pinned: boolean) => void;
  isLoading?: boolean;
}

const NewsTable: React.FC<NewsTableProps> = ({
  news,
  onEdit,
  onDelete,
  onTogglePin,
  isLoading = false
}) => {
  const { currentAccentColor } = useAccentColor();
  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      update: 'Cập nhật',
      security: 'Bảo mật',
      partnership: 'Đối tác',
      recruitment: 'Tuyển dụng',
      technology: 'Công nghệ',
      event: 'Sự kiện'
    };
    return categories[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      update: currentAccentColor,
      security: '#EF4444',
      partnership: '#10B981',
      recruitment: '#8B5CF6',
      technology: '#F59E0B',
      event: '#EC4899'
    };
    return colors[category] || '#6B7280';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      published: '#10B981',
      draft: '#F59E0B',
      archived: '#6B7280'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      published: 'Đã xuất bản',
      draft: 'Bản nháp',
      archived: 'Đã lưu trữ'
    };
    return labels[status] || status;
  };

  const formatDate = (date: Date | string | number) => {
    try {
      // Chuyển đổi về Date object nếu cần
      const dateObj = date instanceof Date ? date : new Date(date);
      
      // Kiểm tra xem Date có hợp lệ không
      if (isNaN(dateObj.getTime())) {
        return 'N/A';
      }

      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (news.length === 0) {
    return (
      <div 
        className="p-8 text-center rounded-2xl"
        style={{
          background: "var(--color-background)",
          boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)"
        }}
      >
        <div className="mb-4" style={{ color: "var(--color-text-secondary)" }}>
          <Calendar className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>Chưa có tin tức nào</h3>
        <p style={{ color: "var(--color-text-secondary)" }}>Hãy tạo tin tức đầu tiên của bạn!</p>
      </div>
    );
  }

  return (
    <div 
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--color-background)",
        boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)"
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y" style={{ borderColor: "rgba(224, 247, 250, 0.2)" }}>
          <thead style={{ background: "var(--color-background-secondary)" }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                Tin tức
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                Tác giả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                Thống kê
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ background: "var(--color-background)", borderColor: "rgba(224, 247, 250, 0.2)" }}>
            {news.map((item) => (
              <tr 
                key={item.id} 
                className="transition-all duration-300"
                style={{ background: "var(--color-background)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-background-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-background)";
                }}
              >
                {/* Tin tức */}
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold truncate" style={{ color: "var(--color-text-primary)" }}>
                          {truncateText(item.title, 50)}
                        </h3>
                        {item.pinned && (
                          <Pin className="w-4 h-4 flex-shrink-0" style={{ color: "#EF4444" }} />
                        )}
                      </div>
                      <p className="text-sm line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                        {truncateText(item.excerpt, 100)}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: `${currentAccentColor}20`,
                                color: currentAccentColor,
                                boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.05), inset 2px 2px 4px #FAFBFF`
                              }}
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                              +{item.tags.length - 3} khác
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Danh mục */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                    style={{
                      backgroundColor: getCategoryColor(item.category || 'update'),
                      boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.2), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`
                    }}
                  >
                    {getCategoryLabel(item.category || 'update')}
                  </span>
                </td>

                {/* Trạng thái */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                    style={{
                      backgroundColor: getStatusColor(item.status),
                      boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.2), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`
                    }}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                </td>

                {/* Tác giả */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: "var(--color-text-secondary)" }} />
                    <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{item.author || 'Unknown'}</span>
                  </div>
                </td>

                {/* Thống kê */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.viewCount}</span>
                    </div>
                  </div>
                </td>

                {/* Ngày tạo */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: "var(--color-text-secondary)" }} />
                    <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </td>

                {/* Thao tác */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onTogglePin(item.id, !item.pinned)}
                      className="p-2 rounded-lg transition-all duration-300"
                      style={{
                        background: "var(--color-background)",
                        color: item.pinned ? "#EF4444" : "var(--color-text-secondary)",
                        boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                      title={item.pinned ? 'Bỏ ghim' : 'Ghim tin tức'}
                      disabled={isLoading}
                    >
                      {item.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg transition-all duration-300"
                      style={{
                        background: "var(--color-background)",
                        color: currentAccentColor,
                        boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15), 0 0 8px ${currentAccentColor}40`;
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                      title="Chỉnh sửa"
                      disabled={isLoading}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
                          onDelete(item.id);
                        }
                      }}
                      className="p-2 rounded-lg transition-all duration-300"
                      style={{
                        background: "var(--color-background)",
                        color: "#EF4444",
                        boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15), 0 0 8px #EF444440";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                      title="Xóa"
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsTable;
