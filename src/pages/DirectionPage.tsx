import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import { CareerCard } from "../components/pages/direction/CareerCard";
import NewsCard from "../components/ui/NewsCard";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  image?: string; // Optional for future use
  icon: string;
  skills: string[];
  opportunities: string;
  gradient: string;
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

const careerPaths: CareerPath[] = [
  {
    id: "software-tester",
    title: "Software Tester",
    description:
      "Chuyên gia kiểm thử phần mềm, đảm bảo chất lượng và hiệu suất của các ứng dụng.",
    image: "/images_uside/career_software_tester.png",
    icon: "🔍",
    skills: [
      "Manual Testing",
      "Automation Testing",
      "API Testing",
      "Performance Testing",
    ],
    opportunities: "Nhu cầu cao trong các công ty công nghệ và dịch vụ số.",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    id: "web-developer",
    title: "Web Developer",
    description:
      "Phát triển các ứng dụng web hiện đại với công nghệ tiên tiến.",
    image: "/images_uside/career_web_developer.png",
    icon: "💻",
    skills: ["HTML/CSS", "JavaScript", "React/Vue", "Node.js", "Database"],
    opportunities: "Cơ hội việc làm đa dạng từ startup đến tập đoàn lớn.",
    gradient: "from-green-400 to-blue-500",
  },
  {
    id: "app-developer",
    title: "App Developer",
    description: "Tạo ra các ứng dụng di động sáng tạo cho iOS và Android.",
    image: "/images_uside/career_app_developer.png",
    icon: "📱",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "UI/UX Design"],
    opportunities:
      "Thị trường mobile đang bùng nổ với triển vọng tăng trưởng mạnh.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "designer",
    title: "UI/UX Designer",
    description: "Thiết kế trải nghiệm người dùng trực quan và thân thiện.",
    image: "/images_uside/career_ui_ux_designer.png",
    icon: "🎨",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    opportunities:
      "Vai trò quan trọng trong mọi dự án số hóa và chuyển đổi công nghệ.",
    gradient: "from-pink-400 to-red-500",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description:
      "Phân tích dữ liệu lớn để tạo ra những insights có giá trị cho doanh nghiệp.",
    image: "/images_uside/career_data_scientist.png",
    icon: "📊",
    skills: [
      "Python/R",
      "Machine Learning",
      "Statistics",
      "Data Visualization",
    ],
    opportunities: "Một trong những ngành hot nhất với mức lương hấp dẫn.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description:
      "Kết nối phát triển và vận hành, tự động hóa quy trình triển khai.",
    image: "/images_uside/career_devops_engineer.png",
    icon: "⚙️",
    skills: ["Docker", "Kubernetes", "AWS/Azure", "CI/CD", "Linux"],
    opportunities:
      "Nhu cầu cao trong thời đại cloud computing và microservices.",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Specialist",
    description: "Bảo vệ hệ thống và dữ liệu khỏi các mối đe dọa an ninh mạng.",
    image: "/images_uside/career_cybersecurity.png",
    icon: "🛡️",
    skills: [
      "Network Security",
      "Penetration Testing",
      "Incident Response",
      "Risk Assessment",
    ],
    opportunities:
      "Lĩnh vực quan trọng với sự phát triển mạnh mẽ của công nghệ.",
    gradient: "from-red-400 to-pink-500",
  },
  {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    description: "Phát triển các ứng dụng phi tập trung và smart contracts.",
    image: "/images_uside/career_blockchain_developer.png",
    icon: "⛓️",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "DeFi", "NFTs"],
    opportunities: "Công nghệ tương lai với nhiều cơ hội đột phá.",
    gradient: "from-yellow-400 to-orange-500",
  },
];

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "USide ra mắt phiên bản 2.0",
    date: "7 tháng 8, 2025",
    excerpt:
      "Phiên bản mới với nhiều tính năng cải tiến và giao diện được thiết kế lại hoàn toàn.",
    content: `
        <p>USide tự hào giới thiệu phiên bản 2.0 với nhiều cải tiến đáng kể trong trải nghiệm người dùng và hiệu suất.</p>
        
        <h3>Tính năng mới</h3>
        <ul>
          <li>Giao diện người dùng được thiết kế lại hoàn toàn</li>
          <li>Hiệu suất cải thiện 40% so với phiên bản trước</li>
          <li>Tích hợp AI để cá nhân hóa trải nghiệm</li>
          <li>Hỗ trợ đa ngôn ngữ</li>
        </ul>
        
        <p>Chúng tôi tin rằng phiên bản 2.0 sẽ mang lại trải nghiệm tốt nhất cho người dùng.</p>
      `,
    image: "/images_uside/news.png",
    author: "Đội ngũ USide",
    category: "Cập nhật",
  },
  {
    id: 2,
    title: "Cập nhật bảo mật quan trọng",
    date: "5 tháng 8, 2025",
    excerpt:
      "Chúng tôi đã cập nhật các biện pháp bảo mật mới nhất để bảo vệ dữ liệu người dùng.",
    content: `
        <p>Bảo mật là ưu tiên hàng đầu của USide. Chúng tôi đã triển khai các cập nhật bảo mật quan trọng.</p>
        
        <h3>Các cải tiến bảo mật</h3>
        <ul>
          <li>Mã hóa end-to-end cho tất cả dữ liệu</li>
          <li>Xác thực hai yếu tố (2FA)</li>
          <li>Kiểm tra bảo mật định kỳ</li>
          <li>Tuân thủ các tiêu chuẩn bảo mật quốc tế</li>
        </ul>
        
        <p>Dữ liệu của bạn được bảo vệ với các công nghệ bảo mật tiên tiến nhất.</p>
      `,
    image: "/images_uside/mascot_robot.png",
    author: "Team Security",
    category: "Bảo mật",
  },
  {
    id: 3,
    title: "Hợp tác với các đối tác công nghệ",
    date: "1 tháng 8, 2025",
    excerpt:
      "USide chính thức hợp tác với các công ty công nghệ hàng đầu để mở rộng dịch vụ.",
    content: `
        <p>Chúng tôi vui mừng thông báo về các quan hệ đối tác chiến lược mới với các công ty công nghệ hàng đầu.</p>
        
        <h3>Lợi ích từ việc hợp tác</h3>
        <ul>
          <li>Mở rộng phạm vi dịch vụ</li>
          <li>Tích hợp công nghệ tiên tiến</li>
          <li>Cải thiện trải nghiệm người dùng</li>
          <li>Tăng cường khả năng cạnh tranh</li>
        </ul>
        
        <p>Những hợp tác này sẽ giúp USide phát triển mạnh mẽ hơn trong tương lai.</p>
      `,
    image: "/images_uside/uside_light.png",
    author: "Ban lãnh đạo",
    category: "Đối tác",
  },
];

const DirectionPage: React.FC = () => {
  const [currentCareerIndex, setCurrentCareerIndex] = useState(0);
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
        <div className="container max-w-7xl mx-auto py-[60px]">
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
                  background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
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
                  {currentCareerIndex + 1} / {careerPaths.length}
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
                            ? `linear-gradient(90deg, var(--color-accent) 0%, #3aefc4 100%)`
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
                  background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
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
              style={{ color: "var(--color-text-placeholder)" }}
            >
              <div className="text-xs">
                Sử dụng mũi tên hoặc click vào các chấm để chuyển đổi nghề
                nghiệp
              </div>
              <div className="text-xs hidden sm:block">
                🎯 Phím mũi tên ← → để điều hướng nhanh
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          <div
            className="mt-16 pt-8 border-t border-opacity-20"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="text-center mb-8">
              <Title title="Bài viết liên quan" desc="Khám phá thêm những thông tin hữu ích về ngành công nghệ" />
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
