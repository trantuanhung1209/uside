import { BannerBreadcrumb } from "../components";
import { Layout } from "../components/layout";
import Title from "../components/ui/Title";
import { useState } from "react";

const AboutPage: React.FC = () => {
  const [factNumber, setFactNumber] = useState(() => Math.floor(Math.random() * 99) + 1);

  return (
    <Layout>
      <BannerBreadcrumb
        pageName="Giới thiệu"
        image="/images_uside/banner_about.png"
      />

      <section className="inner-about pt-[80px]">
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                        Sinh viên K67
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
                      <p className="text-sm text-text-secondary">IUH - ĐHCN TP.Hồ Chí Minh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flip Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {/* Flip Card 1 - Code */}
              <div className="flip-card group relative h-64 [perspective:1000px]">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="w-16 h-16 mb-4 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-accent"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Code Magic
                      </h3>
                      <p className="text-sm text-text-secondary mt-2">
                        Biến ý tưởng thành hiện thực
                      </p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-gradient-to-br from-accent to-[#3aefc4] p-6 flex flex-col justify-center text-center text-white">
                    <h3 className="text-lg font-bold mb-3">
                      Frontend & Backend
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      React, TypeScript - chúng mình code những
                      thứ thú vị mỗi ngày! 🚀
                    </p>
                  </div>
                </div>
              </div>

              {/* Flip Card 2 - Design */}
              <div className="flip-card group relative h-64 [perspective:1000px]">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="w-16 h-16 mb-4 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21,15 16,10 5,21" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Design Vibes
                      </h3>
                      <p className="text-sm text-text-secondary mt-2">
                        UI/UX đẹp mắt, trendy
                      </p>
                    </div>
                  </div>

                  <div className="flip-card-back absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 flex flex-col justify-center text-center text-white">
                    <h3 className="text-lg font-bold mb-3">Creative UI/UX</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Figma, Photoshop, After Effects - tạo ra những giao diện
                      đẹp và trải nghiệm mượt mà! ✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Flip Card 3 - Innovation */}
              <div className="flip-card group relative h-64 [perspective:1000px]">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="w-16 h-16 mb-4 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Innovation
                      </h3>
                      <p className="text-sm text-text-secondary mt-2">
                        Sáng tạo không giới hạn
                      </p>
                    </div>
                  </div>

                  <div className="flip-card-back absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 flex flex-col justify-center text-center text-white">
                    <h3 className="text-lg font-bold mb-3">Think Different</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Chúng mình không ngừng tìm kiếm giải pháp sáng tạo để giải quyết những thách thức thực tế!
                    </p>
                  </div>
                </div>
              </div>

              {/* Flip Card 4 - Teamwork */}
              <div className="flip-card group relative h-64 [perspective:1000px]">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="w-16 h-16 mb-4 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-accent"
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
                      <h3 className="text-lg font-bold text-text-primary">
                        Teamwork
                      </h3>
                      <p className="text-sm text-text-secondary mt-2">
                        Cùng nhau thành công
                      </p>
                    </div>
                  </div>

                  <div className="flip-card-back absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-gradient-to-br from-green-500 to-teal-500 p-6 flex flex-col justify-center text-center text-white">
                    <h3 className="text-lg font-bold mb-3">Squad Goals</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Git, Slack, Discord - teamwork makes the dream work! Cùng
                      nhau coding và chill! 🎮
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bridge Connection - Flowing transition to next section */}
            <div className="relative mb-0 z-1">
              {/* Flow path container */}
              <div className="relative h-78 overflow-visible">
                {/* Curved flow path SVG */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 800 400"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Main flow curve */}
                  <path
                    d="M50 100 Q400 50 400 200 Q400 350 750 300"
                    stroke="url(#flowGradient)"
                    strokeWidth="6"
                    fill="none"
                    className="opacity-30"
                  />

                  {/* Secondary flow curve */}
                  <path
                    d="M100 120 Q400 80 400 200 Q400 320 700 280"
                    stroke="url(#flowGradient2)"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-20"
                  />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient
                      id="flowGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.6" />
                      <stop
                        offset="50%"
                        stopColor="#3aefc4"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="#00d2ff"
                        stopOpacity="0.4"
                      />
                    </linearGradient>
                    <linearGradient
                      id="flowGradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3aefc4" stopOpacity="0.4" />
                      <stop
                        offset="50%"
                        stopColor="#00d2ff"
                        stopOpacity="0.6"
                      />
                      <stop
                        offset="100%"
                        stopColor="#3aefc4"
                        stopOpacity="0.3"
                      />
                    </linearGradient>
                  </defs>

                  {/* Animated flow particles */}
                  <circle r="3" fill="#00d2ff" opacity="0.8">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#flowPath" />
                    </animateMotion>
                  </circle>

                  <circle r="2" fill="#3aefc4" opacity="0.6">
                    <animateMotion
                      dur="5s"
                      repeatCount="indefinite"
                      rotate="auto"
                      begin="1s"
                    >
                      <mpath href="#flowPath" />
                    </animateMotion>
                  </circle>

                  {/* Hidden path for animation */}
                  <path
                    id="flowPath"
                    d="M50 100 Q400 50 400 200 Q400 350 750 300"
                    opacity="0"
                  />
                </svg>

                {/* Central Bridge Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative group z-1">
                    {/* Main bridge circle with neumorphic design */}
                    <div className="w-32 h-32 rounded-full bg-background relative overflow-hidden">
                      {/* Neumorphic shadow layers */}
                      <div className="absolute inset-0 rounded-full shadow-[-15px_-15px_30px_#FAFBFF,15px_15px_30px_rgba(22,17,29,0.25)] group-hover:shadow-[-20px_-20px_40px_#FAFBFF,20px_20px_40px_rgba(22,17,29,0.3),0_0_30px_rgba(0,210,255,0.2)] transition-all duration-700"></div>

                      {/* Inner pressed effect */}
                      <div className="absolute inset-3 rounded-full bg-background shadow-[inset_-8px_-8px_16px_#FAFBFF,inset_8px_8px_16px_rgba(22,17,29,0.15)] "></div>

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
                  </div>
                </div>

                {/* Flow connection points */}
                <div className="absolute top-20 left-12 w-3 h-3 bg-accent/30 rounded-full animate-pulse"></div>
                <div
                  className="absolute bottom-20 right-12 w-3 h-3 bg-[#3aefc4]/30 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Connecting flow elements */}
                <div className="absolute top-16 left-1/4 w-4 h-1 bg-gradient-to-r from-accent to-transparent rounded-full opacity-40"></div>
                <div className="absolute bottom-16 right-1/4 w-4 h-1 bg-gradient-to-l from-[#3aefc4] to-transparent rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-2 pb-[80px] bg-gradient-to-br from-background to-primary/5 relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Title and Description */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="xs:text-[26px] lg:text-4xl font-bold text-text-primary leading-tight">
                  Tại sao{" "}
                  <span className="bg-gradient-to-r from-accent to-[#3aefc4] bg-clip-text text-transparent">
                    USIDE
                  </span>
                  <br />
                  Ra đời?
                </h2>

                <p className="text-lg text-text-secondary leading-relaxed max-w-md">
                  Chúng mình muốn tạo ra những sản phẩm công nghệ thú vị, kết
                  nối mọi người và mang lại giá trị thực tiễn. Từ ý tưởng của
                  sinh viên, cho sinh viên!
                </p>
              </div>

              {/* Wireframe Illustration */}
              <div className="relative">
                <div className="lg:w-80 xs:w-88 h-64 relative">
                  {/* Neumorphic container */}
                  <div className="absolute inset-0 rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.2)]"></div>

                  {/* Wireframe geometric shape */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <svg
                      className="w-full h-full text-text-secondary/40 hover:text-accent/60 transition-colors duration-500"
                      viewBox="0 0 200 150"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {/* Outer rectangle */}
                      <rect x="20" y="20" width="160" height="110" rx="8" />

                      {/* Diagonal lines */}
                      <line x1="20" y1="20" x2="180" y2="130" />
                      <line x1="180" y1="20" x2="20" y2="130" />

                      {/* Center cross */}
                      <line x1="100" y1="20" x2="100" y2="130" />
                      <line x1="20" y1="75" x2="180" y2="75" />

                      {/* Corner decorative elements */}
                      <circle cx="20" cy="20" r="3" fill="currentColor" />
                      <circle cx="180" cy="20" r="3" fill="currentColor" />
                      <circle cx="20" cy="130" r="3" fill="currentColor" />
                      <circle cx="180" cy="130" r="3" fill="currentColor" />
                      <circle cx="100" cy="75" r="4" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Floating dots animation */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-60 animate-ping"></div>
                  <div
                    className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-[#3aefc4] rounded-full opacity-40 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right Side - Robot Fun Fact Box */}
            <div className="space-y-6">
              {/* Robot Fun Fact Box */}
              <div className="group relative p-8 rounded-3xl bg-background overflow-hidden">
                {/* Neumorphic shadow */}
                <div className="absolute inset-0 rounded-3xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)]"></div>

                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-[#3aefc4]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Robot Avatar */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-background shadow-[-6px_-6px_12px_#FAFBFF,6px_6px_12px_rgba(22,17,29,0.15)] flex items-center justify-center group-hover:shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] transition-all duration-300">
                      <svg
                        className="w-10 h-10 text-accent transition-all duration-300 group-hover:scale-110"
                        viewBox="0 0 64 64"
                        fill="currentColor"
                      >
                        <rect x="20" y="16" width="24" height="20" rx="4" />
                        <circle cx="26" cy="24" r="2" />
                        <circle cx="38" cy="24" r="2" />
                        <rect x="30" y="28" width="4" height="2" rx="1" />
                        <rect x="18" y="36" width="28" height="16" rx="6" />
                        <rect x="12" y="20" width="6" height="8" rx="3" />
                        <rect x="46" y="20" width="6" height="8" rx="3" />
                        <circle cx="16" cy="8" r="2" />
                        <circle cx="48" cy="8" r="2" />
                        <line
                          x1="16"
                          y1="10"
                          x2="16"
                          y2="16"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="48"
                          y1="10"
                          x2="48"
                          y2="16"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold text-text-primary">
                          USide Bot
                        </h3>
                        <div className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                          Fun Fact!
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Fun Fact Content */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-background shadow-[inset_-4px_-4px_8px_#FAFBFF,inset_4px_4px_8px_rgba(22,17,29,0.1)] group-hover:shadow-[inset_-6px_-6px_12px_#FAFBFF,inset_6px_6px_12px_rgba(22,17,29,0.15)] transition-all duration-300">
                      <p className="text-text-primary font-medium mb-2">
                        🤖 Random Fun Fact #{factNumber}
                      </p>
                      <p
                        className="text-text-secondary text-sm leading-relaxed"
                        id="funFactText"
                      >
                        Team USide đã uống hơn 1000 cốc cà phê trong quá trình
                        phát triển dự án này! ☕ Và có thể chúng mình đã debug
                        tới 3AM nhiều hơn số lần ngủ đủ 8 tiếng... 😅
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        className="flex-1 py-2 px-4 rounded-xl neumorphic-button"
                        onClick={() => {
                          const facts = [
                            "Team USide đã commit code vào lúc 3:33 AM nhiều nhất - coincidence? 🌙",
                            "Chúng mình đã refactor component Button tới 7 lần để có được phiên bản hoàn hảo! 💯",
                            "Tổng cộng đã viết hơn 50,000 dòng code và... 5,000 dòng comment (mostly 'TODO') 📝",
                            "Team có thể uống 12 cốc trà sữa trong 1 buổi brainstorm và vẫn tỉnh táo! 🧋",
                            "Mascot robot của USide được thiết kế dựa trên con robot giấy mà leader vẽ lúc nhỏ 🤖",
                            "Chúng mình đã thử 15 color palette khác nhau trước khi chọn được combo màu hiện tại! 🎨",
                            "Có bug từng mất 3 ngày để fix… hóa ra chỉ thiếu 1 dấu chấm phẩy ; 😅",
                            "Slack channel #random của team có hơn 100 meme tự chế 🐸",
                            "Một lần deploy production xong mới phát hiện… quên đổi API key 🔑",
                            "Team từng bàn luận nghiêm túc 30 phút chỉ để đặt tên cho một biến 🏷️",
                            "Có 1 commit message chỉ viết đúng 1 chữ: 'fix' — nhưng lại sửa được cả hệ thống 🔥",
                            "Trong lần hackathon, mọi người code xuyên đêm với… 20 gói mì tôm 🍜",
                            "Leader từng merge nhầm branch và cả team phải rollback ngay trong buổi họp 🤯",
                            "Có ít nhất 3 file trong repo được đặt tên là `final_final_v2.js` 📂",
                            "Team từng dành hẳn 1 ngày chỉ để tranh luận dark mode đẹp hơn hay light mode đẹp hơn 🌗",
                            "Một bug nhỏ trong CSS đã khiến giao diện biến thành rainbow mode 🌈",
                          ];
                          const randomFact =
                            facts[Math.floor(Math.random() * facts.length)];
                          const newFactNumber = Math.floor(Math.random() * 99) + 1;
                          
                          setFactNumber(newFactNumber);
                          const element =
                            document.getElementById("funFactText");
                          if (element) {
                            element.textContent = randomFact;
                          }
                        }}
                      >
                        <span className="mr-1">🎲</span>
                        Random Fact
                      </button>

                      <button className="py-2 px-4 rounded-xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)] text-accent text-sm font-medium hover:shadow-[-6px_-6px_12px_#FAFBFF,6px_6px_12px_rgba(22,17,29,0.2)] hover:bg-accent hover:text-white transition-all duration-300">
                        <span>❤️</span>
                      </button>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent/40 rounded-full animate-bounce"></div>
                  <div
                    className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-[#3aefc4]/40 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)]">
                  <div className="text-2xl font-bold text-accent mb-1">50+</div>
                  <div className="text-xs text-text-secondary">
                    Projects Done
                  </div>
                </div>

                <div className="text-center p-4 rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)]">
                  <div className="text-2xl font-bold text-accent mb-1">
                    24/7
                  </div>
                  <div className="text-xs text-text-secondary">
                    Always Learning
                  </div>
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
