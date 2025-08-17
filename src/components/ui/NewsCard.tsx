import { useState } from "react";
import {useNavigate } from "react-router-dom";

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
}

const NewsCard: React.FC<NewsCardProps> = ({ article, index }) => {
  const [isHovered, setIsHovered] = useState(false);
    const Navigate = useNavigate();

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl p-6 cursor-pointer
        transition-all duration-500 ease-out
        transform hover:scale-105 hover:-translate-y-2
        opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]
      `}
      style={{
        background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
        boxShadow: `
          -12px -12px 24px #FAFBFF,
          12px 12px 24px var(--color-shadow)
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
        Navigate(`/tin-tuc/${article.id}`)
      }}
    >
      {/* Gradient overlay */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-5
        bg-gradient-to-br from-blue-400 to-purple-500
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

        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`
              px-3 py-1 text-xs font-medium rounded-full
              transition-all duration-300
            `}
            style={{
              background: `linear-gradient(90deg, var(--color-accent), #3aefc4)`,
              color: "white",
              boxShadow: `
                -3px -3px 6px #FAFBFF,
                3px 3px 6px var(--color-shadow)
              `,
            }}
          >
            {article.category || "Tin tức"}
          </span>
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
            font-bold text-lg mb-3 line-clamp-2 leading-tight
            transition-colors duration-300
            ${isHovered ? "text-[var(--color-accent)]" : ""}
          `}
          style={{
            color: isHovered
              ? "var(--color-accent)"
              : "var(--color-text-primary)",
          }}
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
                background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
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
        <button
          className={`
            w-full py-2 px-4 text-sm font-semibold rounded-xl
            transition-all duration-300 ease-out
            transform hover:scale-105 active:scale-95
            flex items-center justify-center gap-2
          `}
          style={{
            background: `linear-gradient(90deg, var(--color-accent), #3aefc4)`,
            color: "white",
            boxShadow: `
              -6px -6px 12px #FAFBFF,
              6px 6px 12px var(--color-shadow)
            `,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `
              -8px -8px 16px #FAFBFF,
              8px 8px 16px var(--color-shadow),
              0 0 20px var(--color-accent)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `
              -6px -6px 12px #FAFBFF,
              6px 6px 12px var(--color-shadow)
            `;
          }}
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
              background: `linear-gradient(90deg, var(--color-accent), #3aefc4)`,
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