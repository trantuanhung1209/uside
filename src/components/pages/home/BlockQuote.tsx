import { useState, useEffect, useMemo } from "react";

const BlockQuote = () => {
  // Câu chào đặc biệt khi mới vào web
  const welcomeMessage = "Chào mừng bạn trở lại với Uside! 😍";

  // Mảng 100 câu quote thân thiện với useMemo
  const welcomeQuotes = useMemo(() => [
    "Chào mừng bạn đến với hành trình khám phá! 🌟",
    "Hôm nay là một ngày tuyệt vời để bắt đầu điều gì đó mới! ✨",
    "Mỗi bước đi đều là một cơ hội học hỏi! 🚀",
    "Bạn đang ở đúng nơi để biến ước mơ thành hiện thực! 💫",
    "Chúc bạn có những trải nghiệm tuyệt vời ở đây! 🌈",
    "Hãy để tò mò dẫn lối cho cuộc phiêu lưu của bạn! 🗺️",
    "Mỗi ý tưởng đều có tiềm năng thay đổi thế giới! 💡",
    "Bạn đã sẵn sàng để khám phá những điều tuyệt vời chưa? 🔍",
    "Hành trình ngàn dặm bắt đầu từ bước chân đầu tiên! 👣",
    "Chào bạn! Hãy cùng tạo nên những điều kỳ diệu! ✨",
    "Sự sáng tạo không có giới hạn khi bạn dám mơ ước! 🎨",
    "Mỗi thử thách đều là cơ hội để bạn trở nên mạnh mẽ hơn! 💪",
    "Bạn mang trong mình sức mạnh để thay đổi thế giới! 🌍",
    "Hôm nay là cơ hội hoàn hảo để bắt đầu dự án của bạn! 🎯",
    "Chúc bạn tìm thấy nguồn cảm hứng ở mọi góc nhìn! 🌸",
    "Sự kiên trì sẽ dẫn bạn đến thành công! 🏆",
    "Mỗi khoảnh khắc đều quý giá, hãy tận hưởng chúng! ⏰",
    "Bạn có khả năng biến những điều bình thường thành đặc biệt! ⭐",
    "Chào mừng đến với không gian của sự sáng tạo! 🏠",
    "Hãy để đam mê dẫn dắt con đường của bạn! ❤️",
    "Mỗi ngày là một trang trắng để bạn viết câu chuyện! 📖",
    "Bạn đang trên con đường đúng đắn! Hãy tiếp tục! 🛤️",
    "Niềm tin vào bản thân là chìa khóa mở mọi cánh cửa! 🔑",
    "Chúc bạn có những phút giây thú vị và bổ ích! 🎈",
    "Sự học hỏi không bao giờ kết thúc! 📚",
    "Bạn có thể làm được nhiều điều hơn bạn tưởng! 🌟",
    "Hãy biến mọi trở ngại thành bệ phóng! 🚀",
    "Chào bạn! Hôm nay bạn sẽ học được điều gì mới? 🤔",
    "Mỗi ý tưởng đều đáng được khám phá! 💭",
    "Bạn là tác giả của câu chuyện đời mình! ✍️",
    "Chúc bạn luôn giữ được tinh thần tích cực! 😊",
    "Sức mạnh của sự kiên trì không thể đo đếm được! 💎",
    "Mỗi thành công đều bắt đầu từ một quyết định! ✅",
    "Bạn đang tạo nên sự khác biệt mỗi ngày! 🌱",
    "Hãy để trí tưởng tượng bay cao như chim! 🕊️",
    "Chào mừng bạn đến với thế giới của những khả năng! 🌐",
    "Mỗi bước tiến đều đáng được tôn vinh! 🎉",
    "Bạn có sức mạnh để vượt qua mọi thử thách! ⚡",
    "Hôm nay là ngày tuyệt vời để thực hiện ước mơ! 🌅",
    "Chúc bạn luôn tìm thấy niềm vui trong hành trình! 🎭",
    "Sự tự tin là nền tảng của mọi thành công! 🏗️",
    "Mỗi khoảnh khắc đều mang đến cơ hội mới! 🎪",
    "Bạn đang viết nên lịch sử của chính mình! 📜",
    "Hãy để sự nhiệt huyết thắp sáng con đường! 🔥",
    "Chào bạn! Sẵn sàng cho một ngày tuyệt vời chưa? 🌤️",
    "Mỗi giấc mơ đều có thể thành hiện thực! 💫",
    "Bạn có khả năng tạo ra những điều kỳ diệu! 🎪",
    "Sự kiên nhẫn sẽ mang lại những kết quả ngọt ngào! 🍯",
    "Chúc bạn có những trải nghiệm đáng nhớ! 📸",
    "Mỗi nỗ lực đều có giá trị riêng của nó! 💰",
    "Hãy biến mỗi ngày thành một cuộc phiêu lưu! 🗺️",
    "Bạn đang trên con đường trở thành phiên bản tốt nhất! 🦋",
    "Chào mừng đến với hành trình khám phá bản thân! 🔍",
    "Sự sáng tạo là ngôn ngữ của tương lai! 🤖",
    "Mỗi thất bại đều là bài học quý báu! 📝",
    "Bạn có thể biến những giấc mơ thành hiện thực! 🌙",
    "Hôm nay là cơ hội để bạn tỏa sáng! ✨",
    "Chúc bạn luôn giữ được tinh thần học hỏi! 🎓",
    "Mỗi ý tưởng đều có thể thay đổi thế giới! 🌍",
    "Hãy để lòng nhiệt huyết dẫn dắt bạn! ❤️‍🔥",
    "Bạn đang tạo nên những kỷ niệm đẹp! 📷",
    "Chào bạn! Hãy cùng khám phá những điều tuyệt vời! 🔭",
    "Sức mạnh của sự tích cực không thể cản phá! 🌟",
    "Mỗi cơ hội đều đáng được nắm bắt! 🤝",
    "Bạn có khả năng làm cho mọi thứ trở nên đặc biệt! 🎨",
    "Hành trình học hỏi không bao giờ kết thúc! 🛣️",
    "Chúc bạn luôn tìm thấy cảm hứng mỗi ngày! 🌺",
    "Mỗi quyết định đều định hình tương lai! 🔮",
    "Hãy biến mỗi thách thức thành cơ hội! 🎯",
    "Bạn đang viết nên câu chuyện thành công! 📚",
    "Chào mừng đến với thế giới của sự đổi mới! 🚀",
    "Sự kiên trì là chìa khóa mở mọi cánh cửa! 🗝️",
    "Mỗi ngày là món quà để bạn mở ra! 🎁",
    "Bạn có sức mạnh để tạo ra sự thay đổi! 💪",
    "Hôm nay bạn sẽ tạo nên điều gì đặc biệt? 🌈",
    "Chúc bạn có những khoảnh khắc đầy ý nghĩa! ⭐",
    "Mỗi bước đi đều quan trọng trong hành trình! 👣",
    "Hãy để trái tim dẫn lối cho ước mơ! 💖",
    "Bạn đang trên con đường đến thành công! 🏃‍♂️",
    "Chào bạn! Sẵn sàng tạo nên kỳ tích chưa? ✨",
    "Sự tự tin sẽ mở ra vô vàn khả năng! 🦅",
    "Mỗi ý tưởng đều có thể thành hiện thực! 💡",
    "Bạn có khả năng vượt qua mọi giới hạn! 🏔️",
    "Hành trình ngàn dặm bắt đầu từ ước mơ! 🌠",
    "Chúc bạn luôn giữ được tinh thần lạc quan! 😄",
    "Mỗi ngày mới mang đến cơ hội mới! 🌅",
    "Hãy biến đam mê thành động lực! 🔋",
    "Bạn đang tạo nên dấu ấn riêng của mình! 👑",
    "Chào mừng đến với cuộc hành trình tuyệt vời! 🎪",
    "Sức mạnh của ý chí không thể ngăn cản! 💎",
    "Mỗi khoảnh khắc đều chứa đựng tiềm năng! ⚡",
    "Bạn có thể biến không thể thành có thể! 🌟",
    "Hôm nay là ngày để bạn tỏa sáng! 💫",
    "Chúc bạn tìm thấy hạnh phúc trong mỗi bước đi! 🌻",
    "Mỗi thử thách đều là cơ hội để phát triển! 🌱",
    "Hãy để sự nhiệt huyết thắp sáng ước mơ! 🕯️",
    "Bạn đang viết nên trang sử mới! 📖",
    "Chào bạn! Hãy cùng tạo nên điều kỳ diệu! ✨",
    "Sự kiên nhẫn sẽ mang lại kết quả ngọt ngào! 🍓",
    "Mỗi nỗ lực đều xứng đáng được ghi nhận! 🏅",
    "Bạn có sức mạnh để thay đổi thế giới! 🌍",
    "Hành trình học hỏi là hành trình vô tận! 🛤️",
    "Chúc bạn luôn tìm thấy niềm vui trong công việc! 🎨",
    "Mỗi ước mơ đều đáng được theo đuổi! 🎯",
    "Hãy biến mỗi ngày thành một tác phẩm nghệ thuật! 🖼️",
    "Bạn đang trên con đường trở thành huyền thoại! 🏆",
    "Chào mừng bạn đến với thế giới của những khả năng vô hạn! ♾️"
  ], []);

  // State để lưu quote hiện tại
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  // Custom hook cho typewriter effect
  useEffect(() => {
    // Lấy quote hiện tại (welcome message hoặc quote thường)
    const getCurrentQuote = () => {
      if (isFirstVisit && !hasShownWelcome) {
        return welcomeMessage;
      }
      return welcomeQuotes[currentQuoteIndex];
    };

    const currentQuote = getCurrentQuote();
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayedText.length < currentQuote.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1));
        }, 50); // Tốc độ gõ: 50ms mỗi ký tự
      } else {
        setIsTyping(false);
        
        // Nếu vừa hiển thị xong welcome message, chuyển sang quote thường
        if (isFirstVisit && !hasShownWelcome) {
          setTimeout(() => {
            setHasShownWelcome(true);
            setIsFirstVisit(false);
            setDisplayedText("");
            setIsTyping(true);
          }, 3000); // Hiển thị welcome message trong 3 giây
        }
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, currentQuoteIndex, isTyping, welcomeQuotes, isFirstVisit, hasShownWelcome, welcomeMessage]);

  // Effect để tự động đổi quote sau mỗi phút (60 giây) - chỉ sau khi đã hiển thị welcome
  useEffect(() => {
    // Chỉ bắt đầu interval sau khi đã hiển thị welcome message
    if (!hasShownWelcome) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setIsTyping(false);
      
      // Sau animation fade out (300ms), đổi quote và reset typewriter
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => 
          (prevIndex + 1) % welcomeQuotes.length
        );
        setDisplayedText("");
        setIsAnimating(false);
        setIsTyping(true);
      }, 300);
    }, 60000); // 60 giây = 1 phút

    return () => clearInterval(interval);
  }, [welcomeQuotes.length, hasShownWelcome]);

  // Reset typewriter khi component mount
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
  }, []);

  return (
    <>
      <div className="inner-quote absolute top-[-120px] left-[60px] xs:top-[-15%] xs:left-[5%] sm:top-[-15%] sm:left-[5%] md:top-[-15%] md:left-[2%] xl:top-[-30%] lg:top-[-18%] lg:left-[1%]">
        <div className="relative">
          <div className=" section-neumorphic px-[16px] py-[8px] rounded-[20px] transition-all duration-300">
            <blockquote 
              className={`text-sm text-text-secondary font-semibold transition-opacity duration-300 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              "<span className="typewriter-text">{displayedText}</span>
              <span className={`typewriter-cursor ${isTyping ? 'animate-pulse' : 'opacity-0'}`}>|</span>"
            </blockquote>
          </div>

          <div className="inner-circle flex items-center justify-center absolute top-10 left-[-40px] xs:left-[-6%]">
            {/* Thought bubbles với neumorphic style */}
            <div className="relative">
              {/* Bubble lớn nhất - gần blockquote nhất */}
              <div className="absolute bottom-[-15px] left-[20px] w-4 h-4 section-neumorphic rounded-full border-gray-200 shadow-sm animate-float-slow"></div>
              
              {/* Bubble trung bình */}
              <div className="absolute bottom-[-30px] left-[15px] w-3 h-3 section-neumorphic rounded-full border-gray-200 shadow-sm animate-float-medium delay-300"></div>

              {/* Bubble nhỏ nhất */}
              <div className="absolute bottom-[-40px] left-[12px] w-2 h-2 section-neumorphic rounded-full border-gray-200 shadow-sm animate-float-fast delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlockQuote;
