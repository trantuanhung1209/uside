import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import { CareerCard } from "../components/pages/direction/CareerCard";
import NewsCard from "../components/ui/NewsCard";
import { careerPaths } from "../data/careerPaths";
import { newsData } from "../data/newsData";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../hooks";

const DirectionPage: React.FC = () => {
  const [currentCareerIndex, setCurrentCareerIndex] = useState(0);
  const navigate = useNavigate();
  useScrollToTop();

  const handlePrevious = () => {
    setCurrentCareerIndex((prev) =>
      prev === 0 ? careerPaths.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentCareerIndex((prev) =>
      prev === careerPaths.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentCareer = careerPaths[currentCareerIndex];

  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Định hướng phát triển"
        image="/images_uside/banner_direction.png"
      />

      <section className="inner-about">
        <div className="container max-w-7xl mx-auto py-[60px] px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <Title
            title="Định hướng nghề nghiệp"
            desc="Chúng tôi mang đến cho bạn cái nhìn tổng quan về các lộ trình nghề nghiệp trong ngành công nghệ thông tin."
          />

          {/* Career Paths Section */}
          <div
            className="mt-12 bg-background rounded-2xl p-4 sm:p-6 md:p-8 mb-8 relative"
            style={{
              boxShadow:
                "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
            }}
          >
            {/* Current Career Card */}
            <div className="min-h-[400px]">
              <CareerCard
                key={`${currentCareer.id}-${currentCareerIndex}`}
                career={currentCareer}
                index={0}
              />
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-8 px-4 sm:px-0">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className={`
                  group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                  transition-all duration-300 ease-out
                  transform hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                `}
                style={{
                  background: `var(--color-background)`,
                  boxShadow: `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    12px 12px 24px var(--color-shadow),
                    -12px -12px 24px #FAFBFF,
                    0 0 20px var(--color-accent)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `;
                }}
                aria-label="Previous career"
              >
                <span
                  className="text-xl sm:text-2xl transition-all duration-300 group-hover:scale-125"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  ←
                </span>
              </button>

              {/* Career Counter & Indicators */}
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                {/* Career Progress */}
                <div
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                 Vị trí: {currentCareerIndex + 1} / {careerPaths.length}
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {careerPaths.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCareerIndex(index)}
                      className={`
                        w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-0 cursor-pointer
                        transition-all duration-300 ease-out
                        transform hover:scale-125 focus:outline-none focus:scale-150
                        ${index === currentCareerIndex ? "animate-pulse" : ""}
                      `}
                      style={{
                        background:
                          index === currentCareerIndex
                            ? `var(--color-accent)`
                            : `var(--color-border)`,
                        boxShadow:
                          index === currentCareerIndex
                            ? `
                            -4px -4px 8px #FAFBFF,
                            4px 4px 8px var(--color-shadow),
                            0 0 12px var(--color-accent)
                          `
                            : `
                            -2px -2px 4px #FAFBFF,
                            2px 2px 4px var(--color-shadow)
                          `,
                      }}
                      aria-label={`Go to ${careerPaths[index].title}`}
                    />
                  ))}
                </div>

                {/* Career Title */}
                <div
                  className="text-center font-semibold text-sm sm:text-base px-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {currentCareer.title}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className={`
                  group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                  transition-all duration-300 ease-out
                  transform hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                `}
                style={{
                  background: `var(--color-background)`,
                  boxShadow: `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    12px 12px 24px var(--color-shadow),
                    -12px -12px 24px #FAFBFF,
                    0 0 20px var(--color-accent)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `;
                }}
                aria-label="Next career"
              >
                <span
                  className="text-xl sm:text-2xl transition-all duration-300 group-hover:scale-125"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  →
                </span>
              </button>
            </div>

            {/* Career Navigation Info */}
            <div
              className="text-center mt-6 space-y-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <div className="text-xs">
                Tìm hiểu lĩnh vực bạn quan tâm và khám phá con đường sự nghiệp
                phù hợp.
              </div>
              <button
                className="neumorphic-button"
                onClick={() => {
                  navigate(`/direction/${currentCareer.id}`);
                }}
              >
                Bắt đầu khám phá →
              </button>
            </div>
          </div>

          {/* Related Articles Section */}
          <div
            className="mt-16 pt-8 border-t border-opacity-20"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="text-center mb-8">
              <Title
                title="Bài viết liên quan"
                desc="Khám phá thêm những thông tin hữu ích về ngành công nghệ"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.slice(0, 3).map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DirectionPage;
