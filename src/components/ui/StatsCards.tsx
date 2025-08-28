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
              background: "var(--color-background)",
              boxShadow: "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.12)"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 rounded w-20 mb-2" style={{ backgroundColor: "var(--color-background-secondary)" }}></div>
                <div className="h-8 rounded w-12" style={{ backgroundColor: "var(--color-background-secondary)" }}></div>
              </div>
              <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: "var(--color-background-secondary)" }}></div>
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
              background: "var(--color-background)",
              boxShadow: "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.12)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.18), 0 0 20px ${card.color}30`;
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.12)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
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
                  boxShadow: `inset -4px -4px 8px rgba(22, 17, 29, 0.08), inset 4px 4px 8px #FAFBFF`
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
