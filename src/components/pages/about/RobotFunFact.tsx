import { useEffect, useState } from "react";

interface RobotFunFactProps {
  sequenceCompleted?: boolean;
}

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

const RobotFunFact = ({ sequenceCompleted }: RobotFunFactProps) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [factNumber, setFactNumber] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (sequenceCompleted) {
      setShowSuccessMessage(true);
      // Ẩn thông báo sau 8 giây để sync với reset của FlipCards
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 80000);
    }
  }, [sequenceCompleted]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showSuccessMessage) { // Không đổi fact khi đang hiển thị thông báo thành công
        const newIndex = Math.floor(Math.random() * funFacts.length);
        setCurrentFactIndex(newIndex);
        setFactNumber((prev) => prev + 1);
      }
    }, 5000); // Random mỗi 5 giây

    return () => clearInterval(interval);
  }, [showSuccessMessage]);
  return (
    <>
      <div className="lg:col-span-2">
        <div className="group relative p-8 rounded-3xl bg-background overflow-hidden">
          <div className="absolute inset-0 rounded-3xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-[#3aefc4]/5 rounded-3xl opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
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

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-background shadow-[inset_-4px_-4px_8px_#FAFBFF,inset_4px_4px_8px_rgba(22,17,29,0.1)] group-hover:shadow-[inset_-6px_-6px_12px_#FAFBFF,inset_6px_6px_12px_rgba(22,17,29,0.15)] transition-all duration-300">
                {showSuccessMessage ? (
                  <>
                    <p className="text-green-600 font-bold mb-2 flex items-center">
                      🎉 Chúc mừng! Tôi đã sửa lại mật khẩu chính xác cho bạn
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Mật khẩu của bạn là <span className="font-bold text-accent">120905</span> hãy nhập vào ô bên dưới để biết nhiệm vụ tiếp theo!
                      <br />
                      <span className="text-accent font-medium">
                        Thẻ sẽ tự động reset sau vài giây để bạn có thể thử lại!
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-text-primary font-medium mb-2">
                      🤖 Random Fun Fact #{factNumber}
                    </p>
                    <p
                      className="text-text-secondary text-sm leading-relaxed"
                      id="funFactText"
                    >
                      {funFacts[currentFactIndex]}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="absolute top-4 right-4 w-2 h-2 bg-accent/40 rounded-full animate-bounce"></div>
            <div
              className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-[#3aefc4]/40 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RobotFunFact;
