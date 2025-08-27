import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { TbPinned } from "react-icons/tb";

interface NewsCardProps {
  article: NewsItem;
  index: number;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  pinned?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Navigate = useNavigate();

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl p-6 cursor-pointer
        transition-all duration-500 ease-out
        transform hover:scale-101 hover:-translate-y-2
        opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]
      `}
      style={{
        background: `var(--color-background)`,
        boxShadow: `
          -4px -4px 8px #FAFBFF,
          4px 4px 8px var(--color-shadow)
        `,
        animationDelay: `${index * 200}ms`,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        Navigate(`/news/${article.id}`)
      }}
    >
      {/* Gradient overlay */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-5
        bg-accent
        transition-opacity duration-500
      `}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Image */}
        {article.image && (
          <div
            className={`
            h-40 overflow-hidden rounded-xl mb-4
            transform transition-transform duration-500
            ${isHovered ? "scale-110" : "scale-100"}
          `}
            style={{
              boxShadow: `
              inset -6px -6px 12px #FAFBFF,
              inset 6px 6px 12px var(--color-shadow)
            `,
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Category & Date & Pinned */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {/* Pinned Badge */}
            {article.pinned && (
              <span
                className="px-2 py-1 text-xs rounded-full font-semibold bg-red-500 text-white 
                         flex items-center gap-1 animate-pulse"
                style={{
                  boxShadow: "-2px -2px 4px #FAFBFF, 2px 2px 4px rgba(22, 17, 29, 0.15)",
                }}
              >
                <TbPinned className="w-3 h-3" />
                Ghim
              </span>
            )}
            
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-300 cursor-pointer`}
              style={{
                boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                background:
                  article.category === "update"
                    ? "linear-gradient(90deg, #9fc9e8, #00d2ff)" // xanh dương pastel
                    : article.category === "security"
                    ? "linear-gradient(90deg, #e8a9c4, #d98bb0)" // hồng pastel đậm
                    : article.category === "partnership"
                    ? "linear-gradient(90deg, #eabf94, #e89b5c)" // cam đào ấm
                    : article.category === "recruitment"
                    ? "linear-gradient(90deg, #e8e39a, #d6cf66)" // vàng pastel đậm
                    : article.category === "technology"
                    ? "linear-gradient(90deg, #a9d7a1, #7ecb85)" // xanh lá mint
                    : "linear-gradient(90deg, #d4ecfa, #9fc9e8)", // default: xanh pastel
                color: "white",
              }}
            >
              {article.category === "update"
                ? "Cập nhật"
                : article.category === "security"
                ? "Bảo mật"
                : article.category === "partnership"
                ? "Hợp tác"
                : article.category === "recruitment"
                ? "Tuyển dụng"
                : article.category === "technology"
                ? "Công nghệ"
                : "Sự kiện"}
            </span>
          </div>
          
          <span
            className="text-xs"
            style={{ color: "var(--color-text-placeholder)" }}
          >
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h4
          className={`
            font-bold text-lg mb-3 line-clamp-1 leading-tight
            transition-colors duration-300
            ${isHovered ? "text-[var(--color-accent)]" : ""}
          `}
          style={{
            color: isHovered
              ? "var(--color-accent)"
              : "var(--color-text-primary)",
          }}
          title={article.title}
        >
          {article.title}
        </h4>

        {/* Excerpt */}
        <p
          className="text-sm line-clamp-3 mb-4 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {article.excerpt}
        </p>

        {/* Author */}
        {article.author && (
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: `var(--color-accent)`,
                color: "white",
                boxShadow: `
                  -3px -3px 6px #FAFBFF,
                  3px 3px 6px var(--color-shadow)
                `,
              }}
            >
              {article.author.charAt(0)}
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {article.author}
            </span>
          </div>
        )}

        {/* Read More Button */}
        <div className="w-full text-center">
          <button
          className={`
            neumorphic-button w-full text-center
          `}
        >
          Đọc thêm
          <span
            className={`
            transition-transform duration-300
            ${isHovered ? "translate-x-1" : ""}
          `}
          >
            →
          </span>
        </button>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1.5 h-1.5 rounded-full
              opacity-0 group-hover:opacity-60
              transition-all duration-1000 ease-out
              ${isHovered ? "animate-ping" : ""}
            `}
            style={{
              background: `var(--color-accent)`,
              left: `${30 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 300}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCard;