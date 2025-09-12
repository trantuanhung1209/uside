import { useState } from "react";

interface FlipCardsProps {
  onSequenceComplete?: (success: boolean) => void;
}

const FlipCards = ({ onSequenceComplete }: FlipCardsProps) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [sequenceOrder, setSequenceOrder] = useState<number[]>([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  
  const targetSequence = [2, 4, 3, 1]; // Thứ tự cần lật: 2-4-3-1
  const cardNumbers = [1, 2, 3, 4]; // Số thứ tự của từng thẻ

  const handleFlip = (cardIndex: number) => {
    // Không cho phép lật thẻ đã lật hoặc khi game đã hoàn thành
    if (flippedCards.has(cardIndex) || isGameCompleted) return;
    
    const cardNumber = cardNumbers[cardIndex];
    const newFlippedCards = new Set(flippedCards).add(cardIndex);
    const newSequenceOrder = [...sequenceOrder, cardNumber];
    
    setFlippedCards(newFlippedCards);
    setSequenceOrder(newSequenceOrder);
    
    // Kiểm tra nếu đã lật đủ 4 thẻ
    if (newSequenceOrder.length === 4) {
      const isCorrectSequence = JSON.stringify(newSequenceOrder) === JSON.stringify(targetSequence);
      setIsGameCompleted(true);
      onSequenceComplete?.(isCorrectSequence);
      
      // Reset với thời gian khác nhau: đúng 5s, sai 200ms
      const resetDelay = isCorrectSequence ? 5000 : 200;
      setTimeout(() => {
        setFlippedCards(new Set());
        setSequenceOrder([]);
        setIsGameCompleted(false);
      }, resetDelay);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-6 mb-10">
        {/* Flip Card 1 - Code */}
        <div
          className="flip-card relative h-50 xl:h-64 [perspective:1000px] cursor-pointer"
          onClick={() => handleFlip(0)}
        >
          <div
            className={
              "flip-card-inner relative w-full h-full transition-transform duration-300 [transform-style:preserve-3d]" +
              (flippedCards.has(0) ? " [transform:rotateY(180deg)]" : "")
            }
          >
            {/* Front */}
            <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
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
              <h3 className="text-lg font-bold mb-3">Frontend & Backend</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                React, TypeScript - chúng mình code những thứ thú vị mỗi ngày!
                🚀
              </p>
            </div>
          </div>
        </div>

        {/* Flip Card 2 - Design */}
        <div
          className="flip-card relative h-50 xl:h-64 [perspective:1000px] cursor-pointer"
          onClick={() => handleFlip(1)}
        >
          <div
            className={
              "flip-card-inner relative w-full h-full transition-transform duration-300 [transform-style:preserve-3d]" +
              (flippedCards.has(1) ? " [transform:rotateY(180deg)]" : "")
            }
          >
            <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="w-16 h-16 mb-4 rounded-2xl bg-background shadow-[-8px_-8px_16px_#FAFBFF,8px_8px_16px_rgba(22,17,29,0.2)] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
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
                Figma, Photoshop, After Effects - tạo ra những giao diện đẹp và
                trải nghiệm mượt mà! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Flip Card 3 - Innovation */}
        <div
          className="flip-card relative h-50 xl:h-64 [perspective:1000px] cursor-pointer"
          onClick={() => handleFlip(2)}
        >
          <div
            className={
              "flip-card-inner relative w-full h-full transition-transform duration-300 [transform-style:preserve-3d]" +
              (flippedCards.has(2) ? " [transform:rotateY(180deg)]" : "")
            }
          >
            <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
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
                Chúng mình không ngừng tìm kiếm giải pháp sáng tạo để giải quyết vấn đề thực tế!
              </p>
            </div>
          </div>
        </div>

        {/* Flip Card 4 - Teamwork */}
        <div
          className="flip-card relative h-50 xl:h-64 [perspective:1000px] cursor-pointer"
          onClick={() => handleFlip(3)}
        >
          <div
            className={
              "flip-card-inner relative w-full h-full transition-transform duration-300 [transform-style:preserve-3d]" +
              (flippedCards.has(3) ? " [transform:rotateY(180deg)]" : "")
            }
          >
            <div className="flip-card-front absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-background shadow-[-4px_-4px_8px_#FAFBFF,4px_4px_8px_rgba(22,17,29,0.25)]">
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                  4
                </div>
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
                Git, Slack, Discord - teamwork makes the dream work! Cùng nhau
                coding và chill! 🎮
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FlipCards;