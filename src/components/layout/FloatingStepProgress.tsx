import { useState, useEffect, useMemo } from 'react';

interface Section {
  id: string;
  name: string;
  position: number;
}

const FloatingStepProgress = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Định nghĩa các sections của trang chủ
  const sections: Section[] = useMemo(() => [
    { id: 'hero', name: 'Trang chủ', position: 0 },
    { id: 'section-1', name: 'Hoạt động', position: 1 },
    { id: 'section-2', name: 'Tin tức', position: 2 },
    { id: 'section-3', name: 'Định hướng', position: 3 },
    { id: 'section-4', name: 'Giới thiệu', position: 4 },
    { id: 'section-5', name: 'FAQ & Liên hệ', position: 5 },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      setScrollProgress(scrollPercent * 100);

      // Tìm section hiện tại dựa trên scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      let current = 0;
      const scrollOffset = window.innerHeight / 3; // Trigger khi section chiếm 1/3 viewport
      
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section được coi là active khi top của nó ở trong vùng trigger
          if (rect.top <= scrollOffset && rect.bottom >= scrollOffset) {
            current = index;
          }
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Offset cho header nếu có
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky left-5 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 hover:scale-105 w-[100px] h-[400px]">
      {/* Container với neumorphic design */}
      <div 
        className="relative bg-background p-4 rounded-3xl border-gray-200 shadow-sm"
      >
        {/* Progress line */}
        <div className="absolute left-6 top-4 bottom-4 w-1 bg-secondary rounded-full shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.15)]">
          <div 
            className="bg-accent rounded-full transition-all duration-700 ease-out relative shadow-[0_0_15px_rgba(0,210,255,0.4)]"
            style={{ 
              height: `${(scrollProgress / 100) * 100}%`,
              width: '100%'
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
              onClick={() => scrollToSection(section.id)}
            >
              {/* Step circle */}
              <div 
                className={`
                  w-4 h-4 rounded-full border-2 transition-all duration-300 relative z-10 transform
                  ${index === currentSection
                    ? 'bg-accent border-accent shadow-[0_0_15px_rgba(0,210,255,0.6)] scale-110'
                    : 'bg-gray-400 border-gray-400 shadow-[inset_-3px_-3px_6px_#FAFBFF,inset_3px_3px_6px_rgba(22,17,29,0.15)]'
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
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Step label */}
              <div 
                className={`
                  ml-4 px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-300 transform origin-left opacity-100
                  ${index === currentSection
                    ? 'bg-accent/20 text-accent scale-105 shadow-[inset_-4px_-4px_8px_#FAFBFF,inset_4px_4px_8px_rgba(22,17,29,0.1)]'
                    : index < currentSection 
                      ? 'text-gray-400 bg-accent/10 shadow-[inset_-2px_-2px_4px_#FAFBFF,inset_2px_2px_4px_rgba(22,17,29,0.08)]'
                      : 'text-text-secondary group-hover:text-accent group-hover:scale-105'
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
          <div className="text-center">
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
  );
};

export default FloatingStepProgress;