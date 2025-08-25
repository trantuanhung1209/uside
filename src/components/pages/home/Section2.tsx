import { useState, useEffect } from "react";
import Title from "../../ui/Title";

const funFacts = [
  "Team USide đã uống hơn 1000 cốc cà phê trong quá trình phát triển dự án này! ☕ Và có thể chúng mình đã debug tới 3AM nhiều hơn số lần ngủ đủ 8 tiếng... 😅",
  "Trong lúc code, chúng mình đã nghe hơn 500 bài nhạc! 🎵 Playlist yêu thích: Lo-fi Hip Hop và nhạc Epic để boost energy! 🚀",
  "USide Bot được tạo ra sau 42 lần thử nghiệm! 🤖 Lần đầu tiên nó chỉ biết nói 'Hello World', giờ thì... vẫn chỉ thế thôi! 😂",
  "Tổng cộng đã có 1,337 dòng code bị xóa vì 'có thể làm tốt hơn'! 💻 Và 2,024 lần commit với message 'fix bug' 🐛",
  "Mascot robot của USide được thiết kế dựa trên hình ảnh con robot trong mơ của team leader! 🌟 Plot twist: anh ấy mơ thấy robot làm bánh mì... 🥖",
  "Chúng mình đã test website trên 15 thiết bị khác nhau! 📱💻 Bao gồm cả chiếc iPhone 6 cũ kỹ mà vẫn hoạt động tốt! 📲",
  "Tính đến hiện tại, team đã ăn 27 tô phở, 43 ly trà sữa và 156 gói snack trong quá trình làm dự án! 🍜🧋 Fuel for coding! ⛽",
  "Lần đầu tiên deploy thành công, cả team đã hét 'YESSSS!' to đến mức hàng xóm phải gõ cửa hỏi... 🎉 Worth it! 💯",
];

export default function Section2() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [factNumber, setFactNumber] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * funFacts.length);
      setCurrentFactIndex(newIndex);
      setFactNumber((prev) => prev + 1);
    }, 5000); // Random mỗi 5 giây

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section className="section-2 py-[20px] xl:py-[40px] border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="inner-about">
            <Title
              title="Về Đội Ngũ USide"
              desc="Team sinh viên đam mê công nghệ, tạo ra những trải nghiệm số thú vị và sáng tạo!"
              link="about"
            />

            <div className="inner-content">
              <div className="">
                {/* Team Info Banner */}
                <div className="mb-10">
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
                          <h3 className="font-bold text-text-primary">
                            Công Nghệ
                          </h3>
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
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-text-primary">
                            15+ Dự Án
                          </h3>
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
                          <h3 className="font-bold text-text-primary">
                            Khoa CNTT
                          </h3>
                          <p className="text-sm text-text-secondary">
                            IUH - ĐHCN TP.Hồ Chí Minh
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flip Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-10">
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
                          React, TypeScript - chúng mình code những thứ thú vị
                          mỗi ngày! 🚀
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
                        <h3 className="text-lg font-bold mb-3">
                          Creative UI/UX
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                          Figma, Photoshop, After Effects - tạo ra những giao
                          diện đẹp và trải nghiệm mượt mà! ✨
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
                        <h3 className="text-lg font-bold mb-3">
                          Think Different
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                          Chúng mình không ngừng tìm kiếm giải pháp sáng tạo để
                          giải quyết những thách thức thực tế!
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
                          Git, Slack, Discord - teamwork makes the dream work!
                          Cùng nhau coding và chill! 🎮
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flip Card 5 - Core Values */}
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
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold text-text-primary">
                            Core Values
                          </h3>
                          <p className="text-sm text-text-secondary mt-2">
                            Giá trị cốt lõi
                          </p>
                        </div>
                      </div>

                      <div className="flip-card-back absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex flex-col justify-center text-center text-white">
                        <h3 className="text-lg font-bold mb-3">
                          Values First
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                          Chất lượng, đam mê, học hỏi và chia sẻ - những giá trị làm nên USide! 💎 Clean code, clean heart! ❤️
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Robot Fun Fact Box & Bridge Connection */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Robot Fun Fact Box */}
                  <div className="lg:col-span-2">
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
                              {funFacts[currentFactIndex]}
                            </p>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="text-center p-4 rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)]">
                            <div className="text-2xl font-bold text-accent mb-1">
                              500+
                            </div>
                            <div className="text-xs text-text-secondary">
                              Bài Nhạc
                            </div>
                          </div>
                          <div className="text-center p-4 rounded-2xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.15)]">
                            <div className="text-2xl font-bold text-accent mb-1">
                              10+
                            </div>
                            <div className="text-xs text-text-secondary">
                              Bot Versions
                            </div>
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
                  </div>

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
                            <polygon
                              points="60,25 85,75 35,75"
                              opacity="0.9"
                            />
                            <polygon
                              points="50,40 75,75 25,75"
                              opacity="0.7"
                            />
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
        </div>
      </section>
    </>
  );
}
