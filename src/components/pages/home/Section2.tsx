import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccentColor } from "../../../hooks/useAccentColor";
import Title from "../../ui/Title";
import { PiShootingStarBold } from "react-icons/pi";

export default function Section2() {
  const [shuffleKey, setShuffleKey] = useState(0);
  const { currentAccentColor } = useAccentColor();
  const navigate = useNavigate();

  // Data cho các cards - giới thiệu về team USide
  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "💻 Code Wizards",
      content:
        "Team dev đam mê công nghệ, chuyên React, Node.js, và những tech stack hot nhất. Chúng mình không chỉ code mà còn tạo ra những trải nghiệm người dùng tuyệt vời! 🚀",
    },
    {
      id: 2,
      title: "🎨 Design Thinkers",
      content:
        "UI/UX designers sáng tạo, luôn đặt user experience lên hàng đầu. Từ wireframe đến prototype, mọi detail đều được chăm chút kỹ lưỡng để tạo nên giao diện đẹp mắt và dễ sử dụng! ✨",
    },
    {
      id: 3,
      title: "🤖 Tech Innovators",
      content:
        "Không ngừng học hỏi và áp dụng công nghệ mới: AI, IoT, Cloud Computing. Team mình luôn tìm kiếm những giải pháp innovative để giải quyết vấn đề thực tế! 🔥",
    },
    {
      id: 4,
      title: "🎯 Dream Makers",
      content:
        "Từ ý tưởng nhỏ đến sản phẩm hoàn chỉnh, chúng mình biến những giấc mơ thành hiện thực. Mỗi dự án đều mang dấu ấn riêng và tình yêu của cả team! 💝",
    },
  ]);

  const centerCard = {
    id: 5,
    title: "🌟 USide Team",
    content:
      "Nhóm sinh viên đam mê công nghệ, cùng nhau tạo nên những sản phẩm digital độc đáo. Muốn biết thêm về câu chuyện của chúng mình? Click để khám phá! 👥✨",
    isCenter: true,
  };

  const handleCardClick = (cardId: number) => {
    if (cardId === 5) {
      // Click vào center card -> điều hướng đến trang About
      navigate('/gioi-thieu');
    } else {
      // Click vào các card khác -> shuffle
      setShuffleKey((prev) => prev + 1);
      // Xáo trộn mảng cardData
      const shuffledData = [...cardData].sort(() => Math.random() - 0.5);
      setCardData(shuffledData);
    }
  };
  return (
    <>
      <section className="section-2 py-10 sm:py-[40px] lg:py-[60px] border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            title="Gặp gỡ Team USide"
            desc="Nhóm sinh viên đam mê công nghệ, cùng nhau tạo nên những sản phẩm digital đầy cảm hứng!"
            link="gioi-thieu"
          />

          <div className="inner-wrap pt-6 sm:pt-8 lg:pt-12">
            {/* Card Layout Container */}
            <div className="relative" key={shuffleKey}>
              {/* Mobile Layout - Single Column */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:hidden">
                {/* Center Card First on Mobile */}
                <div
                  className="relative cursor-pointer transition-all duration-300 hover:scale-105 order-first group"
                  onClick={() => handleCardClick(centerCard.id)}
                >
                  <div
                    className="p-6 rounded-2xl flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[200px] group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${currentAccentColor}15, ${currentAccentColor}25)`,
                      boxShadow:
                        "-15px -15px 30px #FAFBFF, 15px 15px 30px rgba(22, 17, 29, 0.15)",
                    }}
                  >
                    {/* Center decoration */}
                    <div
                      className="w-16 h-16 rounded-full mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${currentAccentColor}, #3aefc4)`,
                        boxShadow:
                          "inset -6px -6px 12px rgba(255,255,255,0.2), inset 6px 6px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="text-white text-xl font-bold"><PiShootingStarBold /></div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {centerCard.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {centerCard.content}
                    </p>

                    {/* Call to Action hint */}
                    <div className="mt-3 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click để tìm hiểu thêm! →
                    </div>

                    {/* Bottom decoration */}
                    <div className="mt-4 flex gap-2">
                      <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: `${currentAccentColor}80` }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ 
                          backgroundColor: `${currentAccentColor}60`,
                          animationDelay: "0.5s" 
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ 
                          backgroundColor: `${currentAccentColor}40`,
                          animationDelay: "1s" 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Regular Cards */}
                {cardData.map((card) => (
                  <div
                    key={card.id} 
                    className="relative cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-1 bg-background rounded-2xl"
                    style={{
                      boxShadow:
                        "inset -8px -8px 16px #FAFBFF, inset 8px 8px 16px rgba(22, 17, 29, 0.1)",
                    }}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div
                      className="p-4 rounded-2xl h-full bg-background transition-all duration-300 min-h-[140px]"
                      style={{
                        boxShadow:
                          "-10px -10px 20px #FAFBFF, 10px 10px 20px rgba(22, 17, 29, 0.12)",
                      }}
                    >
                      <h3 className="lg:text-lg text-base font-semibold mb-3 text-gray-800">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {card.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet Layout - 2 Columns */}
              <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                  <div
                    className="relative cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-2 bg-background rounded-2xl"
                    style={{
                      boxShadow:
                        "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                    }}
                    onClick={() => handleCardClick(cardData[0].id)}
                  >
                    <div
                      className="p-6 rounded-2xl h-full bg-background transition-all duration-300 min-h-[180px]"
                      style={{
                        boxShadow:
                          "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)",
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        {cardData[0].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {cardData[0].content}
                      </p>
                    </div>
                  </div>

                  <div
                    className="relative cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-2 bg-background rounded-2xl"
                    style={{
                      boxShadow:
                        "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                    }}
                    onClick={() => handleCardClick(cardData[2].id)}
                  >
                    <div
                      className="p-6 rounded-2xl h-full bg-background transition-all duration-300 min-h-[180px]"
                      style={{
                        boxShadow:
                          "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)",
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        {cardData[2].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {cardData[2].content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                  {/* Center Card */}
                  <div
                    className="relative cursor-pointer transition-all duration-300 hover:scale-105 group"
                    onClick={() => handleCardClick(centerCard.id)}
                  >
                    <div
                      className="p-6 rounded-3xl flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[240px] group-hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${currentAccentColor}15, ${currentAccentColor}25)`,
                        boxShadow:
                          "-20px -20px 40px #FAFBFF, 20px 20px 40px rgba(22, 17, 29, 0.2)",
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-full mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${currentAccentColor}, #3aefc4)`,
                          boxShadow:
                            "inset -6px -6px 12px rgba(255,255,255,0.2), inset 6px 6px 12px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="text-white text-xl font-bold"><PiShootingStarBold /></div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        {centerCard.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {centerCard.content}
                      </p>

                      {/* Call to Action hint */}
                      <div className="mt-3 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click để tìm hiểu thêm! →
                      </div>

                      <div className="mt-4 flex gap-2">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: `${currentAccentColor}80` }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ 
                            backgroundColor: `${currentAccentColor}60`,
                            animationDelay: "0.5s" 
                          }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ 
                            backgroundColor: `${currentAccentColor}40`,
                            animationDelay: "1s" 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="relative cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-2 bg-background rounded-2xl"
                      style={{
                        boxShadow:
                          "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                      }}
                      onClick={() => handleCardClick(cardData[1].id)}
                    >
                      <div
                        className="p-4 rounded-2xl h-full bg-background transition-all duration-300 min-h-[120px]"
                        style={{
                          boxShadow:
                            "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.12)",
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                          {cardData[1].title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                          {cardData[1].content}
                        </p>
                      </div>
                    </div>

                    <div
                      className="relative cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-2 bg-background rounded-2xl"
                      style={{
                        boxShadow:
                          "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                      }}
                      onClick={() => handleCardClick(cardData[3].id)}
                    >
                      <div
                        className="p-4 rounded-2xl h-full bg-background transition-all duration-300 min-h-[120px]"
                        style={{
                          boxShadow:
                            "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.12)",
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                          {cardData[3].title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                          {cardData[3].content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - 3 Columns (Original) */}
              <div className="hidden lg:grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-6">
                  {/* Card 1 - Top Left */}
                  <div
                    className="relative transition-all duration-700 bg-background rounded-2xl p-[5px] xl:p-[5px]"
                    style={{
                      boxShadow:
                        "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                    }}
                    onClick={() => handleCardClick(cardData[0].id)}
                  >
                    <div
                      className="p-6 rounded-2xl h-full bg-background transition-all duration-300 min-h-[200px]"
                      style={{
                        boxShadow:
                          "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)",
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        {cardData[0].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {cardData[0].content}
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div
                    className="relative transition-all duration-700 bg-background rounded-2xl p-[5px] xl:p-[5px]"
                    style={{
                      boxShadow:
                        "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                    }}
                    onClick={() => handleCardClick(cardData[1].id)}
                  >
                    <div
                      className="p-6 rounded-2xl h-full bg-background transition-all duration-300 min-h-[200px]"
                      style={{
                        boxShadow:
                          "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)",
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        {cardData[1].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {cardData[1].content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Card - Occupies middle position */}
                <div
                  className="relative transition-all duration-300 cursor-pointer group"
                  onClick={() => handleCardClick(centerCard.id)}
                >
                  <div
                    className="p-6 rounded-3xl h-full flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[440px] group-hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${currentAccentColor}15, ${currentAccentColor}25)`,
                      boxShadow:
                        "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.2)",
                    }}
                  >
                    {/* Center decoration */}
                    <div
                      className="w-20 h-20 rounded-full mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${currentAccentColor}, #3aefc4)`,
                        boxShadow:
                          "inset -8px -8px 16px rgba(255,255,255,0.2), inset 8px 8px 16px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="text-white text-2xl font-bold"><PiShootingStarBold /></div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {centerCard.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {centerCard.content}
                    </p>

                    {/* Call to Action hint */}
                    <div className="mt-4 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      👆 Click để khám phá team USide!
                    </div>

                    {/* Bottom decoration */}
                    <div className="mt-6 flex gap-2">
                      <div 
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: `${currentAccentColor}80` }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ 
                          backgroundColor: `${currentAccentColor}60`,
                          animationDelay: "0.5s" 
                        }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ 
                          backgroundColor: `${currentAccentColor}40`,
                          animationDelay: "1s" 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Card 3 */}
                  <div
                    className="relative transition-all duration-700 bg-background rounded-2xl p-[5px] xl:p-[5px]"
                    style={{
                      boxShadow:
                        "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                    }}
                    onClick={() => handleCardClick(cardData[2].id)}
                  >
                    <div
                      className="p-6 rounded-2xl h-full bg-background transition-all duration-300 min-h-[200px]"
                      style={{
                        boxShadow:
                          "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)",
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        {cardData[2].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {cardData[2].content}
                      </p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div
                    className="relative transition-all duration-700 bg-background rounded-2xl p-[5px] xl:p-[5px]"
                    style={{
                      boxShadow:
                        "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                    }}
                    onClick={() => handleCardClick(cardData[3].id)}
                  >
                    <div
                      className="p-6 rounded-2xl h-full bg-background transition-all duration-300 min-h-[200px]"
                      style={{
                        boxShadow:
                          "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.15)",
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        {cardData[3].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {cardData[3].content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction hints */}
              <div className="text-center mt-8 space-y-2">
                <p className="text-gray-500 text-sm">
                  ✨ Click vào <span className="text-accent font-medium">"USide Team"</span> để tìm hiểu thêm về chúng mình
                </p>
                <p className="text-gray-400 text-xs">
                  💡 Hoặc click các cards khác để xáo trộn bố cục
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
