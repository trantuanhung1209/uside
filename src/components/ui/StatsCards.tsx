import React from 'react';
import { FileText, Eye, Pin, Archive, TrendingUp } from 'lucide-react';
import { useAccentColor } from '../../hooks/useAccentColor';

interface StatsCardsProps {
  stats: {
    total: number;
    published: number;
    draft: number;
    archived: number;
    pinned: number;
  };
  isLoading?: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, isLoading = false }) => {
  const { currentAccentColor } = useAccentColor();
  
  const cards = [
    {
      title: 'Tổng tin tức',
      value: stats.total,
      icon: FileText,
      color: currentAccentColor,
      bgColor: `${currentAccentColor}20`,
      textColor: currentAccentColor
    },
    {
      title: 'Đã xuất bản',
      value: stats.published,
      icon: Eye,
      color: '#10B981',
      bgColor: '#10B98120',
      textColor: '#10B981'
    },
    {
      title: 'Bản nháp',
      value: stats.draft,
      icon: TrendingUp,
      color: '#F59E0B',
      bgColor: '#F59E0B20',
      textColor: '#F59E0B'
    },
    {
      title: 'Tin ghim',
      value: stats.pinned,
      icon: Pin,
      color: '#EF4444',
      bgColor: '#EF444420',
      textColor: '#EF4444'
    },
    {
      title: 'Đã lưu trữ',
      value: stats.archived,
      icon: Archive,
      color: '#6B7280',
      bgColor: '#6B728020',
      textColor: '#6B7280'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index} 
            className="p-6 animate-pulse rounded-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 8px 8px 16px rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 rounded w-20 mb-2" style={{ backgroundColor: "rgba(51, 65, 85, 0.6)" }}></div>
                <div className="h-8 rounded w-12" style={{ backgroundColor: "rgba(51, 65, 85, 0.6)" }}></div>
              </div>
              <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: "rgba(51, 65, 85, 0.6)" }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 8px 8px 16px rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `inset -12px -12px 24px rgba(0, 0, 0, 0.5), inset 12px 12px 24px rgba(255, 255, 255, 0.08), 0 0 20px ${card.color}40`;
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.borderColor = `${card.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 8px 8px 16px rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "#94a3b8" }}>
                  {card.title}
                </p>
                <p className="text-3xl font-bold" style={{ color: card.textColor }}>
                  {card.value.toLocaleString()}
                </p>
              </div>
              <div 
                className="p-3 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: card.bgColor,
                  boxShadow: `inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)`
                }}
              >
                <Icon className="w-6 h-6" style={{ color: card.textColor }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
