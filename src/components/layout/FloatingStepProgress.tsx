import { ActivityIcon, NewspaperIcon } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FaHome } from "react-icons/fa";
import { GrDirections } from "react-icons/gr";
import { IoInformationCircle } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";

interface Section {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: number;
}

const FloatingStepProgress = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Định nghĩa các sections
  const sections: Section[] = useMemo(
    () => [
      { id: "hero", name: "Trang chủ", position: 0, icon: <FaHome className="w-6 h-6" /> },
      { id: "section-1", name: "Hoạt động", position: 1, icon: <ActivityIcon className="w-6 h-6" /> },
      { id: "section-2", name: "Tin tức", position: 2, icon: <NewspaperIcon className="w-6 h-6" /> },
      { id: "section-3", name: "Định hướng", position: 3, icon: <GrDirections className="w-6 h-6" /> },
      { id: "section-4", name: "Giới thiệu", position: 4, icon: <IoInformationCircle className="w-6 h-6" /> },
      { id: "section-5", name: "FAQ & Liên hệ", position: 5, icon: <MdContactSupport className="w-6 h-6" /> },
    ],
    []
  );

  // Check if screen is xl or smaller
  const isXlOrSmaller = () => {
    return window.innerWidth <= 576; // xl breakpoint is 576px
  };

  // Handle scroll progress and active section detection
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));

    // Section detection
    const windowHeight = window.innerHeight;
    const currentScrollY = scrollTop + windowHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i].id);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        if (currentScrollY >= elementTop && currentScrollY <= elementBottom) {
          setCurrentSection(i);
          break;
        }
      }
    }
  }, [sections]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle window resize to show/hide based on screen size
    const handleResize = () => {
      if (!isXlOrSmaller()) {
        // On larger screens (>576px), always show the component
        setIsVisible(true);
        setIsExpanded(true);
      } else {
        // On smaller screens (<=576px), reset to hidden state
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    // Initialize visibility based on current screen size
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll]);

  // Toggle thủ công
  const handleToggleVisibility = () => {
    if (isVisible || isExpanded) {
      setIsVisible(false);
      setIsExpanded(false);
    } else {
      setIsVisible(true);
      setIsExpanded(true);
    }
  };

  const handleSectionClick = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    const sectionId = sections[sectionIndex].id;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="relative">
        {/* Toggle Button - Only show on small screens */}
        <div
          className="transition-all duration-700 ease-out 3xl:hidden xs:translate-x-[-10px] xs:scale-70 sm:scale-100 sm:hidden"
        >
          <button
            onClick={handleToggleVisibility}
            className={`bg-background p-3 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group ${
              isVisible || isExpanded
                ? "opacity-100 border-accent shadow-accent/20"
                : "opacity-60 hover:opacity-100"
            }`}
            title={isVisible || isExpanded ? "Đóng thanh tiến trình" : "Mở thanh tiến trình"}
          >
            <svg
              className={`w-5 h-5 transition-all duration-300 ${
                isVisible || isExpanded ? "text-accent" : "text-gray-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isVisible || isExpanded ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>

        {/* Main Progress Component */}
        <div
          className={`transition-opacity duration-300 ease-out xs:w-[100px] 2xl:w-[135px] 2xl:translate-x-[-50px] xs:ml-[-120px] 2xl:ml-0 xs:translate-x-[100px] xs:scale-70 sm:scale-80 md:scale-85 5xl:scale-95 6xl:scale-100 ${
            isVisible || isExpanded ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
          }`}
        >
          {/* Container */}
          <div className="relative bg-background pt-[10px] rounded-3xl shadow-sm hover:scale-101 transition-all duration-300 hover:shadow-lg xs:translate-y-[-30%] lg:translate-y-0">
            {/* Progress line */}
            <div className="absolute left-3 top-4 bottom-4 w-1 max-h-full bg-secondary rounded-full shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.15)]">
              <div
                className="bg-accent rounded-full transition-all duration-700 ease-out relative shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                style={{ height: `${scrollProgress}%`, width: "100%" }}
              >
                <div className="absolute inset-0 bg-accent rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col space-y-6 lg:ml-6 ml-10 translate-y-[12px]">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="relative flex items-center cursor-pointer group"
                  onClick={() => handleSectionClick(index)}
                >
                  <div
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-300 transform origin-left opacity-100
                    ${
                      index === currentSection
                        ? "bg-accent/20 text-accent scale-105 shadow-[inset_-4px_-4px_8px_#FAFBFF,inset_4px_4px_8px_rgba(22,17,29,0.1)]"
                        : index < currentSection
                        ? "text-gray-400 bg-accent/10 shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.08)]"
                        : "text-text-secondary bg-accent/20 shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.08)] group-hover:text-accent group-hover:scale-105"
                    }`}
                  >
                    <span className="2xl:hidden w-[24px] h-[24px] text-lg flex items-center justify-center">{section.icon}</span>
                    <span className="2xl:block hidden">{section.name}</span>
                  </div>
                  <div className="absolute -inset-2 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                </div>
              ))}
            </div>

            {/* Progress percentage */}
            <div className="mt-6 pt-4 pl-[20px] border-t border-border/30">
              <div className="text-end translate-x-[-10px] translate-y-[-20px]">
                <div className="text-base font-bold text-accent">{Math.round(scrollProgress)}%</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-30 animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingStepProgress;
