import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout";
import { BannerBreadcrumb } from "../components";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số tin tức mỗi trang

  const categories = [
    { id: "all", name: "Tất cả", count: 0 },
    { id: "update", name: "Cập nhật", count: 0 },
    { id: "security", name: "Bảo mật", count: 0 },
    { id: "partnership", name: "Đối tác", count: 0 },
    { id: "recruitment", name: "Tuyển dụng", count: 0 },
    { id: "technology", name: "Công nghệ", count: 0 },
    { id: "event", name: "Sự kiện", count: 0 },
  ];

  const news = [
    {
      id: 1,
      title: "USide ra mắt phiên bản 2.0",
      date: "7 tháng 8, 2025",
      excerpt:
        "Phiên bản mới với nhiều tính năng cải tiến và giao diện được thiết kế lại hoàn toàn.",
      category: "update",
      image: "/images_uside/news.png",
      author: "Đội ngũ USide",
      tags: ["UI/UX", "Performance", "Features"],
    },
    {
      id: 2,
      title: "Cập nhật bảo mật quan trọng",
      date: "5 tháng 8, 2025",
      excerpt:
        "Chúng tôi đã cập nhật các biện pháp bảo mật mới nhất để bảo vệ dữ liệu người dùng.",
      category: "security",
      image: "/images_uside/mascot_robot.png",
      author: "Team Security",
      tags: ["Security", "Privacy", "Protection"],
    },
    {
      id: 3,
      title: "Hợp tác với các đối tác công nghệ",
      date: "1 tháng 8, 2025",
      excerpt:
        "USide chính thức hợp tác với các công ty công nghệ hàng đầu để mở rộng dịch vụ.",
      category: "partnership",
      image: "/images_uside/uside_light.png",
      author: "Ban lãnh đạo",
      tags: ["Partnership", "Expansion", "Growth"],
    },
    {
      id: 4,
      title: "Tuyển dụng Frontend Developer",
      date: "15 tháng 8, 2025",
      excerpt:
        "USide đang tìm kiếm Frontend Developer tài năng để gia nhập đội ngũ phát triển.",
      category: "recruitment",
      image: "/images_uside/pet_cloud_uside.png",
      author: "HR Team",
      tags: ["React", "TypeScript", "Career"],
    },
    {
      id: 5,
      title: "Ứng dụng AI trong phát triển sản phẩm",
      date: "12 tháng 8, 2025",
      excerpt:
        "Khám phá cách USide tích hợp AI để cải thiện trải nghiệm người dùng.",
      category: "technology",
      image: "/images_uside/Coin-unscreen.gif",
      author: "AI Team",
      tags: ["AI", "Machine Learning", "Innovation"],
    },
    {
      id: 6,
      title: "USide Tech Conference 2025",
      date: "10 tháng 8, 2025",
      excerpt:
        "Sự kiện công nghệ lớn nhất năm với những chuyên gia hàng đầu trong ngành.",
      category: "event",
      image: "/images_uside/hero-unscreen.gif",
      author: "Event Team",
      tags: ["Conference", "Networking", "Learning"],
    },
  ];

  // Update category counts
  const updatedCategories = categories.map((cat) => ({
    ...cat,
    count:
      cat.id === "all"
        ? news.length
        : news.filter((item) => item.category === cat.id).length,
  }));

  // Filter news based on selected category and search term
  const filteredNews = news.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Tin tức"
        image="/images_uside/banner_news.png"
      />
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-text-primary mb-8">
            Tin tức mới nhất
          </h1>

          <div className="inner-actions py-[20px]">
            {/* Category Filter */}
            <div className="mb-4">
              <div className="flex flex-wrap justify-center gap-3">
                {updatedCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleFilterChange(category.id)}
                    className={`
                      cursor-pointer
                      group relative px-6 py-3 rounded-2xl font-medium text-sm
                      transition-all duration-300 ease-out
                      transform hover:scale-105 active:scale-95
                      flex items-center gap-2
                    `}
                    style={{
                      background:
                        selectedCategory === category.id
                          ? `var(--color-background)`
                          : `var(--color-background)`,
                      color:
                        selectedCategory === category.id
                          ? "var(--color-text-primary)"
                          : "var(--color-text-primary)",
                      boxShadow:
                        selectedCategory === category.id
                          ? `
                          -6px -6px 12px #FAFBFF,
                          6px 6px 12px var(--color-shadow)
                        `
                          : `
                          inset -6px -6px 12px #FAFBFF,
                          inset 6px 6px 12px var(--color-shadow)
                        `,
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.boxShadow = `
                          -4px -4px 8px #FAFBFF,
                          4px 4px 8px var(--color-shadow),
                          0 0 15px rgba(0, 210, 255, 0.2)
                        `;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.boxShadow = `
                          inset -4px -4px 8px #FAFBFF,
                          inset 4px 4px 8px var(--color-shadow)
                        `;
                      }
                    }}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-bold
                        ${
                          selectedCategory === category.id
                            ? "bg-white bg-opacity-20"
                            : ""
                        }
                      `}
                      style={{
                        background:
                          selectedCategory === category.id
                            ? "var(--color-accent)"
                            : `var(--color-accent)`,
                        color:
                          selectedCategory === category.id ? "white" : "white",
                      }}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-center mb-6">
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {filteredNews.length > 0
                  ? `Tìm thấy ${filteredNews.length} tin tức ${
                      selectedCategory !== "all"
                        ? `thuộc chủ đề "${
                            updatedCategories.find(
                              (c) => c.id === selectedCategory
                            )?.name
                          }"`
                        : ""
                    }`
                  : "Không tìm thấy tin tức nào phù hợp"}
                {searchTerm && ` với từ khóa "${searchTerm}"`}
                {totalPages > 1 && ` - Trang ${currentPage}/${totalPages}`}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {currentNews.length > 0 ? (
              currentNews.map((item, index) => (
                <div
                  key={item.id}
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
                    animationDelay: `${index * 100}ms`,
                  }}
                  onClick={() => navigate(`/tin-tuc/${item.id}`)}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`
                    absolute inset-0 opacity-0 group-hover:opacity-5
                    bg-accent
                    transition-opacity duration-500
                  `}
                  />

                  <div className="relative z-10 flex gap-6">
                    {/* Image */}
                    {item.image && (
                      <div
                        className={`
                        flex-shrink-0 w-32 h-24 overflow-hidden rounded-xl
                        transform transition-transform duration-500 group-hover:scale-110
                      `}
                        style={{
                          boxShadow: `
                          inset -4px -4px 8px #FAFBFF,
                          inset 4px 4px 8px var(--color-shadow)
                        `,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      {/* Category & Author */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            color: "var(--color-text-secondary)",
                            boxShadow: `
                              -3px -3px 6px #FAFBFF,
                              3px 3px 6px var(--color-shadow)
                            `,
                          }}
                        >
                          {
                            updatedCategories.find(
                              (c) => c.id === item.category
                            )?.name
                          }
                        </span>
                        {item.author && (
                          <span
                            className="text-xs font-medium"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            bởi {item.author}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2
                        className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-300"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {item.title}
                      </h2>

                      {/* Date */}
                      <p
                        className="text-sm mb-3 flex items-center gap-[10px]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        <FaCalendarAlt />  {item.date}
                      </p>

                      {/* Excerpt */}
                      <p
                        className="leading-relaxed mb-4 line-clamp-2"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {item.excerpt}
                      </p>

                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs rounded-lg"
                              style={{
                                background: `var(--color-secondary)`,
                                color: "var(--color-text-secondary)",
                                boxShadow: `
                                  -2px -2px 4px #FAFBFF,
                                  2px 2px 4px var(--color-shadow)
                                `,
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More Button */}
                      <button
                        className={`
                          neumorphic-button 
                        `}
                        style={{
                          background: `var(--color-accent)`,
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tin-tuc/${item.id}`);
                        }}
                      >
                        Đọc thêm
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
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
                          animate-ping
                        `}
                        style={{
                          background: `var(--color-accent)`,
                          left: `${20 + i * 25}%`,
                          top: `${15 + i * 20}%`,
                          animationDelay: `${i * 400}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Empty State
              <div
                className="text-center py-16 rounded-2xl"
                style={{
                  background: `var(--color-background)`,
                  boxShadow: `
                    inset -8px -8px 16px #FAFBFF,
                    inset 8px 8px 16px var(--color-shadow)
                  `,
                }}
              >
                <div className="text-6xl mb-4">📭</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Không tìm thấy tin tức
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <button
                  onClick={() => {
                    handleFilterChange("all");
                    handleSearchChange("");
                  }}
                  className="px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
                  style={{
                    background: `var(--color-accent)`,
                    color: "white",
                    boxShadow: `
                      -6px -6px 12px #FAFBFF,
                      6px 6px 12px var(--color-shadow)
                    `,
                  }}
                >
                  🔄 Đặt lại bộ lọc
                </button>
              </div>
            )}
          </div>

          <div className="pagination">
            {totalPages > 1 && (
              <div
                className="mt-12 flex items-center justify-center gap-4"
                style={{
                  background: `var(--color-background)`,
                  borderRadius: "24px",
                  padding: "20px",
                  boxShadow: `
                    inset -8px -8px 16px #FAFBFF,
                    inset 8px 8px 16px var(--color-shadow)
                  `,
                }}
              >
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`
                    group flex items-center justify-center w-12 h-12 rounded-2xl
                    transition-all duration-300 ease-out
                    transform hover:scale-110 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  `}
                  style={{
                    background:
                      currentPage === 1
                        ? `var(--color-border)`
                        : `var(--color-background)`,
                    boxShadow:
                      currentPage === 1
                        ? `inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px var(--color-shadow)`
                        : `
                        -8px -8px 16px #FAFBFF,
                        8px 8px 16px var(--color-shadow)
                      `,
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.boxShadow = `
                        -12px -12px 24px #FAFBFF,
                        12px 12px 24px var(--color-shadow),
                        0 0 20px var(--color-accent)
                      `;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.boxShadow = `
                        -8px -8px 16px #FAFBFF,
                        8px 8px 16px var(--color-shadow)
                      `;
                    }
                  }}
                >
                  <span
                    className="text-xl transition-all duration-300 group-hover:scale-125"
                    style={{
                      color:
                        currentPage === 1
                          ? "var(--color-text-placeholder)"
                          : "var(--color-text-primary)",
                    }}
                  >
                    ←
                  </span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    const isActive = pageNum === currentPage;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`
                          relative w-12 h-12 rounded-2xl font-bold text-sm
                          transition-all duration-300 ease-out
                          transform hover:scale-110 active:scale-95
                          ${isActive ? "animate-pulse" : ""}
                        `}
                        style={{
                          background: isActive
                            ? `var(--color-accent)`
                            : `var(--color-background)`,
                          color: isActive
                            ? "white"
                            : "var(--color-text-primary)",
                          boxShadow: isActive
                            ? `
                              -8px -8px 16px #FAFBFF,
                              8px 8px 16px var(--color-shadow),
                              0 0 20px var(--color-accent)
                            `
                            : `
                              -6px -6px 12px #FAFBFF,
                              6px 6px 12px var(--color-shadow)
                            `,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.boxShadow = `
                              -8px -8px 16px #FAFBFF,
                              8px 8px 16px var(--color-shadow),
                              0 0 15px rgba(0, 210, 255, 0.2)
                            `;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.boxShadow = `
                              -6px -6px 12px #FAFBFF,
                              6px 6px 12px var(--color-shadow)
                            `;
                          }
                        }}
                      >
                        {pageNum}

                        {/* Glow effect for active page */}
                        {isActive && (
                          <div
                            className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                            style={{
                              background: `var(--color-accent)`,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`
                    group flex items-center justify-center w-12 h-12 rounded-2xl
                    transition-all duration-300 ease-out
                    transform hover:scale-110 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  `}
                  style={{
                    background:
                      currentPage === totalPages
                        ? `var(--color-border)`
                        : `var(--color-background)`,
                    boxShadow:
                      currentPage === totalPages
                        ? `inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px var(--color-shadow)`
                        : `
                        -8px -8px 16px #FAFBFF,
                        8px 8px 16px var(--color-shadow)
                      `,
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) {
                      e.currentTarget.style.boxShadow = `
                        -12px -12px 24px #FAFBFF,
                        12px 12px 24px var(--color-shadow),
                        0 0 20px var(--color-accent)
                      `;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== totalPages) {
                      e.currentTarget.style.boxShadow = `
                        -8px -8px 16px #FAFBFF,
                        8px 8px 16px var(--color-shadow)
                      `;
                    }
                  }}
                >
                  <span
                    className="text-xl transition-all duration-300 group-hover:scale-125"
                    style={{
                      color:
                        currentPage === totalPages
                          ? "var(--color-text-placeholder)"
                          : "var(--color-text-primary)",
                    }}
                  >
                    →
                  </span>
                </button>

                {/* Page Info */}
                <div className="ml-4 text-center">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Trang {currentPage} / {totalPages}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
