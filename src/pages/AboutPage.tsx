import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";
import Title from "../components/ui/Title";
import { useState } from "react";
import { useScrollToTop } from "../hooks";
import FlipCards from "../components/pages/about/FlipCards";
import RobotFunFact from "../components/pages/about/RobotFunFact";

const AboutPage: React.FC = () => {
  const [sequenceCompleted, setSequenceCompleted] = useState(false);
  useScrollToTop();

  const handleSequenceComplete = (success: boolean) => {
    if (success) {
      setSequenceCompleted(true);
      // Reset sau khi thông báo đã hiển thị
      setTimeout(() => {
        setSequenceCompleted(false);
      }, 8000);
    }
  };

  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Giới thiệu"
        image="/images_uside/banner_about.png"
      />

      <section className="inner-about xl:pt-[80px] xs:pt-[40px]">
        <Title
          title="Về Đội Ngũ USide"
          desc="Team sinh viên đam mê công nghệ, tạo ra những trải nghiệm số thú vị và sáng tạo!"
        />

        <div className="inner-content">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Team Info Banner */}
            <div className="mb-16">
              <div className="relative p-8 rounded-3xl bg-background">
                <div className="absolute inset-0 rounded-3xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)]"></div>

                <div className="relative z-10 text-center">
                  <div className="grid grid-cols-2 xl:grid-cols-5 gap-6">
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-accent"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                          <polyline
                            points="2,17 12,22 22,17"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </div>
                      <h3 className="font-bold text-text-primary">
                        Team USide
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Đội ngũ sáng tạo
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-text-primary">Công Nghệ</h3>
                      <p className="text-sm text-text-secondary">
                        Web & Mobile Dev
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-text-primary">
                        8 Thành Viên
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Sinh viên IUH
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-text-primary">15+ Dự Án</h3>
                      <p className="text-sm text-text-secondary">
                        Đã hoàn thành
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-text-primary">Khoa CNTT</h3>
                      <p className="text-sm text-text-secondary">
                        IUH - ĐHCN TP.Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flip Cards Grid */}
            <FlipCards onSequenceComplete={handleSequenceComplete} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Robot Fun Fact Box */}
              <RobotFunFact sequenceCompleted={sequenceCompleted} />

              {/* Bridge Connection Element */}
              <div className="lg:col-span-1 flex justify-center">
                <div className="relative group">
                  {/* Main bridge circle with neumorphic design */}
                  <div className="w-32 h-32 rounded-full bg-background relative overflow-hidden">
                    {/* Neumorphic shadow layers */}
                    <div className="absolute inset-0 rounded-full shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25)] group-hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.3),0_0_30px_rgba(0,210,255,0.2)] transition-all duration-700"></div>

                    {/* Inner pressed effect */}
                    <div className="absolute inset-3 rounded-full bg-background shadow-[inset_-8px_-8px_16px_#FAFBFF,inset_8px_8px_16px_rgba(22,17,29,0.15)]"></div>

                    {/* Mountain illustration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-accent"
                        viewBox="0 0 120 120"
                        fill="currentColor"
                      >
                        <polygon points="60,25 85,75 35,75" opacity="0.9" />
                        <polygon points="50,40 75,75 25,75" opacity="0.7" />
                        <circle cx="75" cy="40" r="6" opacity="0.8" />
                        <circle cx="30" cy="35" r="1.5" opacity="0.6" />
                        <circle cx="85" cy="30" r="1" opacity="0.6" />
                      </svg>
                    </div>

                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-[#3aefc4] opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-all duration-300"></div>

                    {/* Floating particles around bridge */}
                    <div
                      className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-accent rounded-full opacity-70 animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="absolute -bottom-3 -left-3 w-1 h-1 bg-[#3aefc4] rounded-full opacity-50 animate-bounce"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute -top-3 -left-2 w-1 h-1 bg-accent rounded-full opacity-60 animate-bounce"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>

                  {/* Orbiting elements */}
                  <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "20s" }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent/40 rounded-full"></div>
                    <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#3aefc4]/40 rounded-full"></div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent/30 rounded-full"></div>
                  </div>

                  {/* Connection lines to Fun Fact Box */}
                  <div className="absolute top-1/2 -left-8 w-6 h-0.5 bg-gradient-to-r from-accent/30 to-transparent rounded-full transform -translate-y-1/2 hidden lg:block"></div>
                  <div className="absolute top-1/3 -left-6 w-4 h-0.5 bg-gradient-to-r from-[#3aefc4]/30 to-transparent rounded-full transform -translate-y-1/2 hidden lg:block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
