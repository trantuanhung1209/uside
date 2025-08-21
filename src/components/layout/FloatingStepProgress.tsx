import { useState, useEffect, useMemo } from "react";

interface Section {
  id: string;
  name: string;
  position: number;
}

const FloatingStepProgress = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const [isManuallyHidden, setIsManuallyHidden] = useState(false);

  // Định nghĩa các sections của trang chủ
  const sections: Section[] = useMemo(
    () => [
      { id: "hero", name: "Trang chủ", position: 0 },
      { id: "section-1", name: "Hoạt động", position: 1 },
      { id: "section-2", name: "Tin tức", position: 2 },
      { id: "section-3", name: "Định hướng", position: 3 },
      { id: "section-4", name: "Giới thiệu", position: 4 },
      { id: "section-5", name: "FAQ & Liên hệ", position: 5 },
    ],
    []
  );

  // Theo dõi scroll để cập nhật progress và current section
  useEffect(() => {
    const handleScroll = () => {
      // Tính scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));

      // Tìm section hiện tại dựa trên vị trí scroll
      const windowHeight = window.innerHeight;
      const currentScrollY = scrollTop + windowHeight / 2;
      let foundSection = false;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          // Kiểm tra nếu đang ở trong section
          if (currentScrollY >= elementTop && currentScrollY <= elementBottom) {
            setCurrentSection(i);
            foundSection = true;
            break;
          }
        }
      }

      // Tự động hiện/ẩn component dựa trên việc có đang ở trong section không
      setIsInSection(foundSection);
      if (foundSection && !isVisible && !isExpanded && !isManuallyHidden) {
        // Tự động hiện khi vào section (chỉ khi chưa bị ẩn thủ công)
        setIsVisible(true);
        setIsExpanded(true);
      } else if (!foundSection && isVisible && isExpanded && !isManuallyHidden) {
        // Tự động ẩn khi ra khỏi tất cả sections (có delay nhỏ)
        setTimeout(() => {
          setIsVisible(false);
          setIsExpanded(false);
        }, 1000);
      }
    };

    // Gọi ngay lần đầu
    handleScroll();

    // Thêm event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, isVisible, isExpanded, isManuallyHidden]);


  const handleToggleVisibility = () => {
    if (isVisible || isExpanded) {
      // Đang hiển thị -> Ẩn đi (đánh dấu là ẩn thủ công)
      setIsVisible(false);
      setIsExpanded(false);
      setIsManuallyHidden(true);
    } else {
      // Đang ẩn -> Hiển thị (bỏ đánh dấu ẩn thủ công)
      setIsVisible(true);
      setIsExpanded(true);
      setIsManuallyHidden(false);
    }
  };

  const handleSectionClick = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    
    // Scroll to section
    const sectionId = sections[sectionIndex].id;
    console.log('Clicking section:', sectionId, 'index:', sectionIndex); // Debug log
    
    const element = document.getElementById(sectionId);
    console.log('Found element:', element); // Debug log
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      console.log('Scrolled to:', sectionId); // Debug log
    } else {
      console.warn('Element not found:', sectionId); // Debug log
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div 
        className=" sticky left-2 top-1/2  transition-all duration-700 ease-out"
        style={{ 
          transform: 'translateY(-50%)'
        }}
      >
        <button
          onClick={handleToggleVisibility}
          className={`bg-background p-3 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group ${
            isInSection 
              ? 'opacity-100 border-accent shadow-accent/20' 
              : isVisible || isExpanded 
                ? 'opacity-100' 
                : 'opacity-60 hover:opacity-100'
          }`}
          title={
            isVisible || isExpanded 
              ? "Đóng thanh tiến trình" 
              : isInSection 
                ? `Mở thanh tiến trình (Section: ${sections[currentSection]?.name})` 
                : "Mở thanh tiến trình"
          }
        >
          <svg
            className={`w-5 h-5 transition-all duration-300 ${
              isVisible || isExpanded 
                ? 'text-accent' 
                : isInSection 
                  ? 'text-accent scale-110'
                  : 'text-gray-600'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isVisible || isExpanded ? (
              // Arrow left khi đang hiện (ẩn đi)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            ) : (
              // Arrow right khi đang ẩn (hiện ra)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Main Progress Component */}
      <div 
        className={`sticky left-5 top-1/2 z-40 transition-all duration-700 ease-out w-[100px] ${
          (isVisible || isExpanded) 
            ? 'opacity-100 pointer-events-auto scale-100' 
            : 'opacity-0 pointer-events-none scale-95'
        }`}
        style={{ 
          transform: `translateY(-50%) ${
            (isVisible || isExpanded) 
              ? 'translateX(3rem)' 
              : 'translateX(0)'
          }`
        }}
      >
        {/* Container với neumorphic design */}
        <div className="relative bg-background p-4 rounded-3xl border-gray-200 shadow-sm hover:scale-105 transition-all duration-300 hover:shadow-lg">
          {/* Progress line */}
          <div className="absolute left-6 top-4 bottom-4 w-1 max-h-full bg-secondary rounded-full shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.15)]">
            <div
              className="bg-accent rounded-full transition-all duration-700 ease-out relative shadow-[0_0_15px_rgba(0,210,255,0.4)]"
              style={{
                height: `${(scrollProgress / 100) * 100}%`,
                width: "100%",
              }}
            >
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-accent rounded-full animate-pulse opacity-50"></div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col space-y-6 ml-5">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="relative flex items-center cursor-pointer group"
                onClick={() => handleSectionClick(index)}
              >
                {/* Step circle */}
                <div
                  className={`
                  w-4 h-4 rounded-full border-2 transition-all duration-300 relative z-10 transform
                  ${
                    index === currentSection
                      ? "bg-accent border-accent shadow-[0_0_15px_rgba(0,210,255,0.6)] scale-110"
                      : "bg-gray-400 border-gray-400 shadow-[inset_-3px_-3px_6px_#FAFBFF,inset_3px_3px_6px_rgba(22,17,29,0.15)]"
                  }
                  group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.8)]
                `}
                >
                  {/* Inner glow for active step */}
                  {index === currentSection && (
                    <div className="absolute inset-0 bg-accent rounded-full animate-pulse opacity-70"></div>
                  )}

                  {/* Check mark for completed steps */}
                  {index < currentSection && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-2 h-2 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Step label */}
                <div
                  className={`
                  ml-4 px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-300 transform origin-left opacity-100
                  ${
                    index === currentSection
                      ? "bg-accent/20 text-accent scale-105 shadow-[inset_-4px_-4px_8px_#FAFBFF,inset_4px_4px_8px_rgba(22,17,29,0.1)]"
                      : index < currentSection
                      ? "text-gray-400 bg-accent/10 shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.08)]"
                      : "text-text-secondary bg-accent/20 shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.08)] group-hover:text-accent group-hover:scale-105"
                  }
                  whitespace-nowrap
                  group-hover:bg-background group-hover:shadow-[inset_-4px_-4px_8px_#FAFBFF,inset_4px_4px_8px_rgba(22,17,29,0.1)]
                  group-hover:translate-x-1
                `}
                >
                  {section.name}
                </div>

                {/* Hover effect background */}
                <div className="absolute -inset-2 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </div>
            ))}
          </div>

          {/* Progress percentage */}
          <div className="mt-6 pt-4 pl-[20px] border-t border-border/30">
            <div className="text-end translate-x-[10px]">
              <div className="text-base font-bold text-accent">
                {Math.round(scrollProgress)}%
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-30 animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full opacity-20 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default FloatingStepProgress;
