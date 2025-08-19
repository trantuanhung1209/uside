import { useState } from "react";
import Title from "../../ui/Title";
import { useNavigate } from "react-router-dom";

const Section4 = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");

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
      image: "/images_uside/pet_uside_light.png",
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

  const handlePaginationClick = (index: number) => {
    setActiveSlide(index);
  };

  const filteredNews =
    activeFilter === "all"
      ? news
      : news.filter((item) =>
          activeFilter === "recruitment"
            ? item.category === "recruitment"
            : activeFilter === "news"
            ? [
                "update",
                "security",
                "partnership",
                "technology",
                "event",
              ].includes(item.category)
            : true
        );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setActiveSlide(0); // Reset to first slide when filter changes
  };

  // Handle click to navigate to news detail
  const handleNewsItemClick = (newsId: number) => {
    navigate(`/tin-tuc/${newsId}`);
  };

  // Make sure activeSlide doesn't exceed the filtered news length
  const safeActiveSlide = Math.min(activeSlide, filteredNews.length - 1);

  return (
    <>
      <div className="section-4 py-[20px] md:py-[40px] lg:py-[60px]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            title="Tin tức mới nhất"
            desc="Cập nhật những thông tin mới nhất từ chúng tôi."
            link="tin-tuc"
          />

          <div className="inner-content">
            <div
              className="bg-background rounded-2xl p-4 sm:p-6 md:p-8 mb-8 h-[600px] overflow-hidden"
              style={{
                boxShadow:
                  "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[60px]">
                <div className="relative order-2 lg:order-1">
                  <div
                    className="h-48 sm:h-64 md:h-72 lg:h-[300px] w-full lg:w-[90%] overflow-hidden rounded-2xl hover:scale-105 transition-all duration-500 relative mx-auto lg:mx-0 cursor-pointer"
                    onClick={() => {
                      const currentNews = filteredNews[safeActiveSlide];
                      if (currentNews) {
                        handleNewsItemClick(currentNews.id);
                      }
                    }}
                  >
                    {filteredNews.length > 0 && (
                      <img
                        src={filteredNews[safeActiveSlide]?.image}
                        alt={filteredNews[safeActiveSlide]?.title}
                        className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                      />
                    )}
                  </div>

                  <div className="pagination flex justify-center gap-3 mt-4 sm:mt-6">
                    {filteredNews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePaginationClick(index)}
                        className={`pagination-dot ${
                          safeActiveSlide === index ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="inner-buttons flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4 mb-4 lg:mb-0">
                    <button
                      onClick={() => handleFilterChange("all")}
                      className={`
                      cursor-pointer
                      group relative px-6 py-3 rounded-2xl font-medium text-sm
                      transition-all duration-300 ease-out
                      transform hover:scale-105 active:scale-95
                      flex items-center gap-2
                    `}
                      style={{
                        background:
                          activeFilter === "all"
                            ? `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`
                            : `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
                        color:
                          activeFilter === "all"
                            ? "var(--color-text-primary)"
                            : "var(--color-text-primary)",
                        boxShadow:
                          activeFilter === "all"
                            ? `
                          -3px -3px 6px #FAFBFF, 3px 3px 6px var(--color-shadow)
                        `
                            : `
                          inset -3px -3px 6px #FAFBFF,
                          inset 3px 3px 6px var(--color-shadow)
                        `,
                      }}
                      onMouseEnter={(e) => {
                        if (activeFilter !== "all") {
                          e.currentTarget.style.boxShadow = `
                          -4px -4px 8px #FAFBFF,
                          4px 4px 8px var(--color-shadow),
                          0 0 15px rgba(0, 210, 255, 0.2)
                        `;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFilter !== "all") {
                          e.currentTarget.style.boxShadow = `
                          inset -3px -3px 6px #FAFBFF,
                          inset 3px 3px 6px var(--color-shadow)
                        `;
                        }
                      }}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => handleFilterChange("news")}
                      className={`
                      cursor-pointer
                      group relative px-6 py-3 rounded-2xl font-medium text-sm
                      transition-all duration-300 ease-out
                      transform hover:scale-105 active:scale-95
                      flex items-center gap-2
                    `}
                      style={{
                        background:
                          activeFilter === "news"
                            ? `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`
                            : `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
                        color:
                          activeFilter === "news"
                            ? "var(--color-text-primary)"
                            : "var(--color-text-primary)",
                        boxShadow:
                          activeFilter === "news"
                            ? `
                          -3px -3px 6px #FAFBFF, 3px 3px 6px var(--color-shadow)
                        `
                            : `
                          inset -3px -3px 6px #FAFBFF,
                          inset 3px 3px 6px var(--color-shadow)
                        `,
                      }}
                      onMouseEnter={(e) => {
                        if (activeFilter !== "news") {
                          e.currentTarget.style.boxShadow = `
                          -4px -4px 8px #FAFBFF,
                          4px 4px 8px var(--color-shadow),
                          0 0 15px rgba(0, 210, 255, 0.2)
                        `;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFilter !== "news") {
                          e.currentTarget.style.boxShadow = `
                          inset -3px -3px 6px #FAFBFF,
                          inset 3px 3px 6px var(--color-shadow)
                        `;
                        }
                      }}
                    >
                      Tin tức
                    </button>
                    <button
                      onClick={() => handleFilterChange("recruitment")}
                      className={`
                      cursor-pointer
                      group relative px-6 py-3 rounded-2xl font-medium text-sm
                      transition-all duration-300 ease-out
                      transform hover:scale-105 active:scale-95
                      flex items-center gap-2
                    `}
                      style={{
                        background:
                          activeFilter === "recruitment"
                            ? `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`
                            : `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
                        color:
                          activeFilter === "recruitment"
                            ? "var(--color-text-primary)"
                            : "var(--color-text-primary)",
                        boxShadow:
                          activeFilter === "recruitment"
                            ? `
                          -3px -3px 6px #FAFBFF, 3px 3px 6px var(--color-shadow)
                        `
                            : `
                          inset -3px -3px 6px #FAFBFF,
                          inset 3px 3px 6px var(--color-shadow)
                        `,
                      }}
                      onMouseEnter={(e) => {
                        if (activeFilter !== "recruitment") {
                          e.currentTarget.style.boxShadow = `
                          -4px -4px 8px #FAFBFF,
                          4px 4px 8px var(--color-shadow),
                          0 0 15px rgba(0, 210, 255, 0.2)
                        `;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFilter !== "recruitment") {
                          e.currentTarget.style.boxShadow = `
                          inset -3px -3px 6px #FAFBFF,
                          inset 3px 3px 6px var(--color-shadow)
                        `;
                        }
                      }}
                    >
                      Tuyển dụng
                    </button>
                  </div>

                  <div className="inner-list-news">
                    <ul className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6">
                      {filteredNews.slice(0, 3).map((item, index) => (
                        <li
                          key={item.id}
                          className={`mb-3 flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-2 p-4 rounded-2xl transition-all duration-500 cursor-pointer
                            bg-background
                            ${
                              safeActiveSlide === index
                                ? "transform translateY(-2px) scale-105"
                                : "hover:transform hover:translateY(-1px)"
                            }`}
                          style={{
                            boxShadow:
                              safeActiveSlide === index
                                ? "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.25), 0 0 20px rgba(0, 210, 255, 0.3)"
                                : "-3px -3px 6px #FAFBFF, 3px 3px 6px var(--color-shadow)",
                          }}
                          onMouseEnter={(e) => {
                            // Hover: Tự động chuyển ảnh
                            setActiveSlide(index);
                            if (safeActiveSlide !== index) {
                              (e.currentTarget as HTMLElement).style.boxShadow =
                                "-3px -3px 6px #FAFBFF, 3px 3px 6px var(--color-shadow)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (safeActiveSlide !== index) {
                              (e.currentTarget as HTMLElement).style.boxShadow =
                                "-3px -3px 6px #FAFBFF, 3px 3px 6px var(--color-shadow)";
                            }
                          }}
                          onClick={() => handleNewsItemClick(item.id)}
                        >
                          <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-[20px] items-start w-full">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm sm:text-base hover:text-accent font-semibold text-text-primary transition-all duration-300 line-clamp-2 hover:transform hover:translateX-1 cursor-pointer">
                                {item.title}
                              </span>
                              <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 mt-1 leading-relaxed">
                                {item.excerpt}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span
                                  className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-300 cursor-pointer`}
                                  style={{
                                    boxShadow:
                                      "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                                    background:
                                      item.category === "update"
                                        ? "linear-gradient(90deg, #9fc9e8, #00d2ff)" // xanh dương pastel
                                        : item.category === "security"
                                        ? "linear-gradient(90deg, #e8a9c4, #d98bb0)" // hồng pastel đậm
                                        : item.category === "partnership"
                                        ? "linear-gradient(90deg, #eabf94, #e89b5c)" // cam đào ấm
                                        : item.category === "recruitment"
                                        ? "linear-gradient(90deg, #e8e39a, #d6cf66)" // vàng pastel đậm
                                        : item.category === "technology"
                                        ? "linear-gradient(90deg, #a9d7a1, #7ecb85)" // xanh lá mint
                                        : "linear-gradient(90deg, #d4ecfa, #9fc9e8)", // default: xanh pastel
                                    color: "white",
                                  }}
                                >
                                  {item.category === "update"
                                    ? "Cập nhật"
                                    : item.category === "security"
                                    ? "Bảo mật"
                                    : item.category === "partnership"
                                    ? "Hợp tác"
                                    : item.category === "recruitment"
                                    ? "Tuyển dụng"
                                    : item.category === "technology"
                                    ? "Công nghệ"
                                    : "Sự kiện"}
                                </span>

                                <span className="text-xs text-text-secondary font-medium opacity-75 hover:opacity-100 transition-opacity duration-300">
                                  bởi {item.author}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="inner-date mt-2 sm:mt-0 flex-shrink-0">
                            <span className="text-text-secondary text-sm sm:text-base whitespace-nowrap font-medium opacity-75 hover:opacity-100 transition-opacity duration-300">
                              {item.date}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section4;
