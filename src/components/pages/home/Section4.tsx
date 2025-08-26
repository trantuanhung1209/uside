import { useState, useEffect } from "react";
import Title from "../../ui/Title";
import { useNavigate } from "react-router-dom";
import { newsData } from "../../../data";
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiArrowRight, 
  FiEye,
  FiCalendar,
  FiUser,
  FiStar,
  FiRadio,
  FiBriefcase
} from "react-icons/fi";
import { 
  HiOutlineArrowUp,
  HiOutlineLockClosed,
  HiOutlineUsers,
  HiOutlineBolt,
  HiOutlineSparkles
} from "react-icons/hi2";

const Section4 = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handlePaginationClick = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const filteredNews =
    activeFilter === "all"
      ? newsData
      : newsData.filter((item) =>
          activeFilter === "recruitment"
            ? item.category === "recruitment"
            : activeFilter === "news"
            ? item.category && [
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
    setActiveSlide(0);
    setIsAutoPlaying(true); // Restart auto-play when filter changes
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || filteredNews.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => 
        prevSlide === filteredNews.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [filteredNews.length, isAutoPlaying]);

  // Handle click to navigate to news detail
  const handleNewsItemClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  // Make sure activeSlide doesn't exceed the filtered news length
  const safeActiveSlide = Math.min(activeSlide, filteredNews.length - 1);

  return (
    <>
      <div className="py-[20px] xs:py-[40px] lg:py-[60px] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-3 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Title
              title="Tin tức & Cập nhật"
              desc="Khám phá những thông tin mới nhất và cơ hội nghề nghiệp từ USide."
              link="news"
            />
          </div>

          {/* Main Content Container */}
          <div className="inner-content">
            <div
              className="bg-background rounded-3xl p-6 sm:p-8 md:p-10 min-h-[600px] relative overflow-hidden"
              style={{
                boxShadow:
                  "inset -15px -15px 30px #FAFBFF, inset 15px 15px 30px rgba(22, 17, 29, 0.1)",
              }}
            >
              {/* Content Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              {/* Filter Buttons */}
              <div className="relative z-10 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                  {[
                    { key: "all", label: "Tất cả", icon: FiStar, count: newsData.length },
                    { key: "news", label: "Tin tức", icon: FiRadio, count: newsData.filter(item => 
                      item.category && ["update", "security", "partnership", "technology", "event"].includes(item.category)
                    ).length },
                    { key: "recruitment", label: "Tuyển dụng", icon: FiBriefcase, count: newsData.filter(item => 
                      item.category === "recruitment"
                    ).length }
                  ].map(({ key, label, icon: Icon, count }) => (
                    <button
                      key={key}
                      onClick={() => handleFilterChange(key)}
                      className={`
                        group relative px-5 py-2.5 rounded-xl font-medium text-sm
                        transition-all duration-300 ease-out cursor-pointer
                        transform hover:scale-105 active:scale-95
                        flex items-center gap-2 min-w-[120px] justify-center
                        ${activeFilter === key ? 'bg-accent text-white' : 'bg-background text-text-primary'}
                      `}
                      style={{
                        boxShadow: activeFilter === key
                          ? `
                            -8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.2),
                            0 0 20px rgba(0, 210, 255, 0.3)
                          `
                          : `
                            -6px -6px 12px #FAFBFF,
                            6px 6px 12px rgba(22, 17, 29, 0.15)
                          `,
                      }}
                      onMouseEnter={(e) => {
                        if (activeFilter !== key) {
                          e.currentTarget.style.boxShadow = `
                            -8px -8px 16px #FAFBFF,
                            8px 8px 16px rgba(22, 17, 29, 0.2),
                            0 0 15px rgba(0, 210, 255, 0.15)
                          `;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFilter !== key) {
                          e.currentTarget.style.boxShadow = `
                            -6px -6px 12px #FAFBFF,
                            6px 6px 12px rgba(22, 17, 29, 0.15)
                          `;
                        }
                      }}
                    >
                      <Icon className="text-lg" />
                      <span className="relative z-10">{label}</span>
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-bold
                        ${activeFilter === key ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent'}
                        transition-all duration-300
                      `}>
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main News Grid */}
              <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8 relative z-10">
                
                {/* Featured News Image - Left Side */}
                <div className="2xl:col-span-2 order-2 2xl:order-1">
                  <div className="relative group">
                    {/* Auto-play indicator */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className={` 
                        px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm
                        ${isAutoPlaying ? 'bg-green-500/20 text-green-100' : 'bg-gray-500/20 text-gray-100'}
                        border border-white/20 transition-all duration-300
                      `}>
                        {isAutoPlaying ? '🔄 Auto' : '⏸️ Paused'}
                      </div>
                    </div>

                    <div
                      className="h-80 sm:h-96 md:h-[450px] w-full overflow-hidden rounded-3xl 
                               relative cursor-pointer transition-all duration-700 ease-out
                               group-hover:scale-105 group-hover:shadow-2xl"
                      onClick={() => {
                        const currentNews = filteredNews[safeActiveSlide];
                        if (currentNews) {
                          handleNewsItemClick(currentNews.id);
                        }
                      }}
                      style={{
                        boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.2)"
                      }}
                    >
                      {filteredNews.length > 0 && filteredNews[safeActiveSlide] && (
                        <>
                          <img
                            src={filteredNews[safeActiveSlide].image}
                            alt={filteredNews[safeActiveSlide].title}
                            className="w-full h-full object-cover transition-all duration-700 ease-out
                                     group-hover:scale-110"
                          />
                          
                          {/* Image Overlay with Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                                        opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                          
                          {/* Featured News Info Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                            <div className="mb-3">
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/30 inline-flex items-center gap-1"
                                style={{
                                  background: filteredNews[safeActiveSlide].category === "update"
                                    ? "linear-gradient(90deg, #9fc9e8, #00d2ff)" // xanh dương pastel
                                    : filteredNews[safeActiveSlide].category === "security"
                                    ? "linear-gradient(90deg, #e8a9c4, #d98bb0)" // hồng pastel đậm
                                    : filteredNews[safeActiveSlide].category === "partnership"
                                    ? "linear-gradient(90deg, #eabf94, #e89b5c)" // cam đào ấm
                                    : filteredNews[safeActiveSlide].category === "recruitment"
                                    ? "linear-gradient(90deg, #e8e39a, #d6cf66)" // vàng pastel đậm
                                    : filteredNews[safeActiveSlide].category === "technology"
                                    ? "linear-gradient(90deg, #a9d7a1, #7ecb85)" // xanh lá mint
                                    : "linear-gradient(90deg, #d4ecfa, #9fc9e8)", // default: xanh pastel
                                  color: "white",
                                  textShadow: "0 1px 2px rgba(0,0,0,0.5)"
                                }}
                              >
                                {filteredNews[safeActiveSlide].category === "update" ? <HiOutlineArrowUp className="w-3 h-3" />
                                : filteredNews[safeActiveSlide].category === "security" ? <HiOutlineLockClosed className="w-3 h-3" />
                                : filteredNews[safeActiveSlide].category === "partnership" ? <HiOutlineUsers className="w-3 h-3" />
                                : filteredNews[safeActiveSlide].category === "recruitment" ? <FiBriefcase className="w-3 h-3" />
                                : filteredNews[safeActiveSlide].category === "technology" ? <HiOutlineBolt className="w-3 h-3" />
                                : <HiOutlineSparkles className="w-3 h-3" />}
                                {filteredNews[safeActiveSlide].category === "update" ? "Cập nhật"
                                : filteredNews[safeActiveSlide].category === "security" ? "Bảo mật"
                                : filteredNews[safeActiveSlide].category === "partnership" ? "Hợp tác"
                                : filteredNews[safeActiveSlide].category === "recruitment" ? "Tuyển dụng"
                                : filteredNews[safeActiveSlide].category === "technology" ? "Công nghệ"
                                : "Sự kiện"}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 line-clamp-2 
                                         transform group-hover:translate-x-2 transition-transform duration-300">
                              {filteredNews[safeActiveSlide].title}
                            </h3>
                            <p className="text-sm opacity-90 line-clamp-2 mb-3
                                        transform group-hover:translate-x-1 transition-transform duration-300 delay-75">
                              {filteredNews[safeActiveSlide].excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs opacity-75">
                              <span className="flex items-center gap-1">
                                <FiCalendar className="w-3 h-3" />
                                {filteredNews[safeActiveSlide].date}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiUser className="w-3 h-3" />
                                {filteredNews[safeActiveSlide].author}
                              </span>
                            </div>
                          </div>

                          {/* Read More Button */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                        opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 
                                          shadow-lg hover:bg-white transition-colors duration-200">
                              <FiEye className="w-6 h-6 text-accent" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Enhanced Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-6">
                      <button
                        onClick={() => {
                          const newIndex = safeActiveSlide === 0 ? filteredNews.length - 1 : safeActiveSlide - 1;
                          setActiveSlide(newIndex);
                          setIsAutoPlaying(false);
                        }}
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)",
                          boxShadow: "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)"
                        }}
                      >
                        <FiChevronLeft className="w-5 h-5 text-accent" />
                      </button>

                      <div className="flex gap-2">
                        {filteredNews.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handlePaginationClick(index)}
                            className={`transition-all duration-500 rounded-full cursor-pointer ${
                              safeActiveSlide === index ? "w-8 h-3 bg-accent" : "w-3 h-3 bg-accent/30"
                            }`}
                            style={{
                              boxShadow: safeActiveSlide === index
                                ? "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.2), 0 0 10px rgba(0, 210, 255, 0.3)"
                                : "-2px -2px 4px #FAFBFF, 2px 2px 4px rgba(22, 17, 29, 0.1)"
                            }}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const newIndex = safeActiveSlide === filteredNews.length - 1 ? 0 : safeActiveSlide + 1;
                          setActiveSlide(newIndex);
                          setIsAutoPlaying(false);
                        }}
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)",
                          boxShadow: "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.15)"
                        }}
                      >
                        <FiChevronRight className="w-5 h-5 text-accent" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* News List - Right Side */}
                <div className="2xl:col-span-1 order-1 2xl:order-2 hidden 2xl:block bg-background">
                  <div 
                    className="h-[500px] overflow-y-auto scrollbar-hide p-1 bg-background"
                    style={{ 
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    <div className="space-y-3">
                      {filteredNews.map((item, index) => (
                        <div
                          key={item.id}
                          className={`
                            group relative p-3 rounded-xl cursor-pointer
                            transition-all duration-500 ease-out
                            hover:scale-[1.01] hover:-translate-y-0.5
                            ${safeActiveSlide === index 
                              ? 'bg-gradient-to-r from-accent/5 to-accent/10 border-l-3 border-accent scale-[1.01] -translate-y-0.5' 
                              : 'bg-background hover:bg-gradient-to-r hover:from-accent/3 hover:to-accent/5'
                            }
                          `}
                          style={{
                            boxShadow: safeActiveSlide === index
                              ? "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.18), 0 0 12px rgba(0, 210, 255, 0.15)"
                              : "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.08)"
                          }}
                          onMouseEnter={() => {
                            setActiveSlide(index);
                            setIsAutoPlaying(false);
                          }}
                          onClick={() => handleNewsItemClick(item.id)}
                        >
                          {/* News Item Content */}
                          <div className="flex items-start gap-3">
                            {/* Thumbnail */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300"
                                   style={{
                                     boxShadow: "-2px -2px 4px #FAFBFF, 2px 2px 4px rgba(22, 17, 29, 0.08)"
                                   }}>
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="font-semibold text-text-primary line-clamp-2 
                                             group-hover:text-accent transition-colors duration-300 
                                             text-sm leading-tight">
                                  {item.title}
                                </h3>
                                <span className="flex-shrink-0 text-xs text-text-secondary font-medium opacity-75">
                                  {item.date.split(',')[0]}
                                </span>
                              </div>

                              <p className="text-xs text-text-secondary line-clamp-1 mb-2 leading-relaxed">
                                {item.excerpt}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className={`
                                    px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1
                                    ${item.category === "update" ? "bg-blue-100 text-blue-700"
                                    : item.category === "security" ? "bg-red-100 text-red-700"
                                    : item.category === "partnership" ? "bg-orange-100 text-orange-700"
                                    : item.category === "recruitment" ? "bg-yellow-100 text-yellow-700"
                                    : item.category === "technology" ? "bg-green-100 text-green-700"
                                    : "bg-purple-100 text-purple-700"}
                                    transition-all duration-300 group-hover:scale-105
                                  `}
                                    style={{
                                      boxShadow: "-1px -1px 2px #FAFBFF, 1px 1px 2px rgba(22, 17, 29, 0.06)"
                                    }}>
                                    {item.category === "update" ? <HiOutlineArrowUp className="w-3 h-3" />
                                    : item.category === "security" ? <HiOutlineLockClosed className="w-3 h-3" />
                                    : item.category === "partnership" ? <HiOutlineUsers className="w-3 h-3" />
                                    : item.category === "recruitment" ? <FiBriefcase className="w-3 h-3" />
                                    : item.category === "technology" ? <HiOutlineBolt className="w-3 h-3" />
                                    : <HiOutlineSparkles className="w-3 h-3" />}
                                  </span>
                                  <span className="text-xs text-text-secondary truncate flex items-center gap-1">
                                    <FiUser className="w-3 h-3" />
                                    {item.author}
                                  </span>
                                </div>

                                {/* Read more indicator */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <FiArrowRight className="w-3 h-3 text-accent" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Active indicator */}
                          {safeActiveSlide === index && (
                            <div className="absolute right-2 top-2">
                              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"
                                   style={{
                                     boxShadow: "0 0 8px rgba(0, 210, 255, 0.5)"
                                   }}>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Empty state */}
                    {filteredNews.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-4"
                             style={{
                               boxShadow: "inset -6px -6px 12px #FAFBFF, inset 6px 6px 12px rgba(22, 17, 29, 0.1)"
                             }}>
                          <FiRadio className="w-12 h-12 text-accent/50" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">Không có tin tức</h3>
                        <p className="text-text-secondary">Hiện tại chưa có tin tức nào trong danh mục này.</p>
                      </div>
                    )}
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
