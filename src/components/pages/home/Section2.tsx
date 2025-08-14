import { useState } from "react";
import Title from "../../ui/Title";

export default function Section2() {
  const [shuffleKey, setShuffleKey] = useState(0);

  // Data cho các cards - sử dụng state để có thể shuffle
  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "Dịch vụ tư vấn",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Giải pháp công nghệ",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "Hỗ trợ 24/7",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      title: "Đào tạo chuyên nghiệp",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);

  const centerCard = {
    id: 5,
    title: "Tầm nhìn & Sứ mệnh",
    content:
      "Chúng tôi cam kết mang đến những giải pháp tối ưu nhất cho khách hàng thông qua công nghệ tiên tiến và dịch vụ chuyên nghiệp.",
    isCenter: true,
  };

  const handleCardClick = (cardId: number) => {
    if (cardId !== 5) {
      // Không shuffle nếu click vào card giữa
      setShuffleKey((prev) => prev + 1);
      // Xáo trộn mảng cardData
      const shuffledData = [...cardData].sort(() => Math.random() - 0.5);
      setCardData(shuffledData);
    }
  };
  return (
    <>
      <section className="section-2 py-10 sm:py-16 lg:py-20 border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            title="Giới thiệu về chúng tôi"
            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum."
          />

          <div className="inner-wrap pt-6 sm:pt-8 lg:pt-12">
            {/* Card Layout Container */}
            <div className="relative" key={shuffleKey}>
              {/* Mobile Layout - Single Column */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:hidden">
                {/* Center Card First on Mobile */}
                <div
                  className="relative cursor-pointer transition-all duration-300 hover:scale-105 order-first"
                  onClick={() => handleCardClick(centerCard.id)}
                >
                  <div
                    className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[200px]"
                    style={{
                      boxShadow:
                        "-15px -15px 30px #FAFBFF, 15px 15px 30px rgba(22, 17, 29, 0.15)",
                    }}
                  >
                    {/* Center decoration */}
                    <div
                      className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #00d2ff, #3aefc4)",
                        boxShadow:
                          "inset -6px -6px 12px rgba(255,255,255,0.2), inset 6px 6px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="text-white text-xl font-bold">✨</div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {centerCard.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {centerCard.content}
                    </p>

                    {/* Bottom decoration */}
                    <div className="mt-4 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"
                        style={{ animationDelay: "1s" }}
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
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">
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
                    className="relative cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => handleCardClick(centerCard.id)}
                  >
                    <div
                      className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[240px]"
                      style={{
                        boxShadow:
                          "-20px -20px 40px #FAFBFF, 20px 20px 40px rgba(22, 17, 29, 0.2)",
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #00d2ff, #3aefc4)",
                          boxShadow:
                            "inset -6px -6px 12px rgba(255,255,255,0.2), inset 6px 6px 12px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="text-white text-xl font-bold">✨</div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        {centerCard.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {centerCard.content}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"
                          style={{ animationDelay: "1s" }}
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
                    className="relative transition-all duration-700 bg-background rounded-2xl p-6 xl:p-8"
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
                    className="relative transition-all duration-700 bg-background rounded-2xl p-6 xl:p-8"
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
                  className="relative cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => handleCardClick(centerCard.id)}
                >
                  <div
                    className="p-6 rounded-3xl h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[440px]"
                    style={{
                      boxShadow:
                        "-20px -20px 40px #FAFBFF, 20px 20px 40px rgba(22, 17, 29, 0.2)",
                    }}
                  >
                    {/* Center decoration */}
                    <div
                      className="w-20 h-20 rounded-full mb-6 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #00d2ff, #3aefc4)",
                        boxShadow:
                          "inset -8px -8px 16px rgba(255,255,255,0.2), inset 8px 8px 16px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="text-white text-2xl font-bold">✨</div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {centerCard.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {centerCard.content}
                    </p>

                    {/* Bottom decoration */}
                    <div className="mt-6 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                      <div
                        className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Card 3 */}
                  <div
                    className="relative transition-all duration-700 bg-background rounded-2xl p-6 xl:p-8"
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
                    className="relative transition-all duration-700 bg-background rounded-2xl p-6 xl:p-8"
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

              {/* Shuffle hint */}
              {/* <div className="text-center mt-8">
                <p className="text-gray-500 text-sm">💡 Click vào bất kỳ card nào (trừ card giữa) để xáo trộn bố cục</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
