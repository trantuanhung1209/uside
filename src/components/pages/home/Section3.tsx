import React, { useEffect, useState, useCallback } from "react";
import { CareerCard } from "../direction/CareerCard";
import { careerPaths } from "../../../data/careerPaths";
import { useNavigate } from "react-router-dom";

interface Section3Props {
  currentCareerIndex?: number;
  onCareerIndexChange?: (index: number) => void;
}

const Section3: React.FC<Section3Props> = ({ 
  currentCareerIndex: externalCurrentCareerIndex,
  onCareerIndexChange 
}) => {
  const [internalCurrentCareerIndex, setInternalCurrentCareerIndex] = useState(0);
  const [hiddenSequenceIndex, setHiddenSequenceIndex] = useState(0); // Thứ tự ẩn ý cho mini game
  const currentCareerIndex = externalCurrentCareerIndex ?? internalCurrentCareerIndex;
  const navigate = useNavigate();
  
  const handlePrevious = useCallback(() => {
    const newIndex = currentCareerIndex === 0 ? careerPaths.length - 1 : currentCareerIndex - 1;
    // Cập nhật thứ tự ẩn ý cho mini game (6 cards → pattern 4)
    const hiddenSequence = [0, 1, 2, 3, 0, 1]; // 6 cards map to 4-step pattern
    setHiddenSequenceIndex(hiddenSequence[newIndex] || 0);
    
    if (onCareerIndexChange) {
      onCareerIndexChange(newIndex);
    } else {
      setInternalCurrentCareerIndex(newIndex);
    }
  }, [currentCareerIndex, onCareerIndexChange]);

  const handleNext = useCallback(() => {
    const newIndex = currentCareerIndex === careerPaths.length - 1 ? 0 : currentCareerIndex + 1;
    // Cập nhật thứ tự ẩn ý cho mini game (6 cards → pattern 4)
    const hiddenSequence = [0, 1, 2, 3, 0, 1]; // 6 cards map to 4-step pattern
    setHiddenSequenceIndex(hiddenSequence[newIndex] || 0);
    
    if (onCareerIndexChange) {
      onCareerIndexChange(newIndex);
    } else {
      setInternalCurrentCareerIndex(newIndex);
    }
  }, [currentCareerIndex, onCareerIndexChange]);

  const setCurrentCareerIndex = useCallback((index: number) => {
    // Mapping 6 cards thành pattern 1/4 → 2/4 → 3/4 → 4/4 → 1/4 → 2/4
    const hiddenSequence = [0, 1, 2, 3, 0, 1]; // 6 cards map to 4-step pattern
    setHiddenSequenceIndex(hiddenSequence[index] || 0);
    
    if (onCareerIndexChange) {
      onCareerIndexChange(index);
    } else {
      setInternalCurrentCareerIndex(index);
    }
  }, [onCareerIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  const currentCareer = careerPaths[currentCareerIndex];

  return (
    <div className="relative" id="section-3">
      <div
        className="mt-8 xl:mt-12 bg-background rounded-4xl lg:rounded-3xl p-3 md:p-6 mb-8 relative hidden 2xl:block"
        style={{
          boxShadow:
            "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
        }}
      >
        {/* Current Career Card */}
        <div className="min-h-[400px] flex items-center justify-between gap-[20px]">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className={`
                        group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                        transition-all duration-300 ease-out
                        transform hover:scale-110 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                      `}
            style={{
              background: `var(--color-background)`,
              boxShadow: `
                          8px 8px 16px var(--color-shadow),
                          -8px -8px 16px #FAFBFF
                        `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                          12px 12px 24px var(--color-shadow),
                          -12px -12px 24px #FAFBFF,
                          0 0 20px var(--color-accent)
                        `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                          8px 8px 16px var(--color-shadow),
                          -8px -8px 16px #FAFBFF
                        `;
            }}
            aria-label="Previous career"
          >
            <span
              className="text-xl sm:text-2xl transition-all duration-300 group-hover:scale-125"
              style={{ color: "var(--color-text-primary)" }}
            >
              ←
            </span>
          </button>
          <CareerCard
            key={`${currentCareer.id}-${currentCareerIndex}`}
            career={currentCareer}
            index={0}
          />
          {/* Next Button */}
          <button
            onClick={handleNext}
            className={`
                        group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                        transition-all duration-300 ease-out
                        transform hover:scale-110 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                      `}
            style={{
              background: `var(--color-background)`,
              boxShadow: `
                          8px 8px 16px var(--color-shadow),
                          -8px -8px 16px #FAFBFF
                        `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                          12px 12px 24px var(--color-shadow),
                          -12px -12px 24px #FAFBFF,
                          0 0 20px var(--color-accent)
                        `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                          8px 8px 16px var(--color-shadow),
                          -8px -8px 16px #FAFBFF
                        `;
            }}
            aria-label="Next career"
          >
            <span
              className="text-xl sm:text-2xl transition-all duration-300 group-hover:scale-125"
              style={{ color: "var(--color-text-primary)" }}
            >
              →
            </span>
          </button>
        </div>

        {/* Pagination Controls */}
        <div className="text-center mt-6">
          {/* Career Counter & Indicators */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            {/* Career Progress */}
            <div
              className="text-xs sm:text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {hiddenSequenceIndex + 1} / 4
              {/* mini game */}
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center gap-1 sm:gap-2">
              {careerPaths.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCareerIndex(index)}
                  className={`
                              w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-0 cursor-pointer
                              transition-all duration-300 ease-out
                              transform hover:scale-125 focus:outline-none focus:scale-150
                              ${
                                index === currentCareerIndex
                                  ? "animate-pulse"
                                  : ""
                              }
                            `}
                  style={{
                    background:
                      index === currentCareerIndex
                        ? `var(--color-accent)`
                        : `var(--color-border)`,
                    boxShadow:
                      index === currentCareerIndex
                        ? `
                                  -4px -4px 8px #FAFBFF,
                                  4px 4px 8px var(--color-shadow),
                                  0 0 12px var(--color-accent)
                                `
                        : `
                                  -2px -2px 4px #FAFBFF,
                                  2px 2px 4px var(--color-shadow)
                                `,
                  }}
                  aria-label={`Go to ${careerPaths[index].title}`}
                />
              ))}
            </div>

            {/* Career Title */}
            <div
              className="text-center font-semibold text-sm sm:text-base px-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              {currentCareer.title}
            </div>
          </div>
        </div>

        {/* Career Navigation Info */}
        <div
          className="text-center mt-6 space-y-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <div className="text-xs">
            Tìm hiểu lĩnh vực bạn quan tâm và khám phá con đường sự nghiệp phù
            hợp.
          </div>
          <button
            className="neumorphic-button"
            onClick={() => {
              // Lưu vị trí section 3 vào sessionStorage
              sessionStorage.setItem('homeScrollToSection', 'section-3');
              navigate(`/direction/${currentCareer.id}`);
            }}
          >
            Bắt đầu khám phá →
          </button>
        </div>
      </div>

      {/* Career Paths Section */}
      <div
        className="mt-12 bg-background rounded-2xl p-4 sm:p-6 md:p-8 mb-8 relative 2xl:hidden block"
        style={{
          boxShadow:
            "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
        }}
      >
        {/* Current Career Card */}
        <div className="min-h-[400px]">
          <CareerCard
            key={`${currentCareer.id}-${currentCareerIndex}`}
            career={currentCareer}
            index={0}
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-8 px-4 sm:px-0">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className={`
                  group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                  transition-all duration-300 ease-out
                  transform hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                `}
            style={{
              background: `var(--color-background)`,
              boxShadow: `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                    12px 12px 24px var(--color-shadow),
                    -12px -12px 24px #FAFBFF,
                    0 0 20px var(--color-accent)
                  `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `;
            }}
            aria-label="Previous career"
          >
            <span
              className="text-xl sm:text-2xl transition-all duration-300 group-hover:scale-125"
              style={{ color: "var(--color-text-primary)" }}
            >
              ←
            </span>
          </button>

          {/* Career Counter & Indicators */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            {/* Career Progress */}
            <div
              className="text-xs sm:text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {hiddenSequenceIndex + 1} / 4
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center gap-1 sm:gap-2">
              {careerPaths.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCareerIndex(index)}
                  className={`
                        w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-0 cursor-pointer
                        transition-all duration-300 ease-out
                        transform hover:scale-125 focus:outline-none focus:scale-150
                        ${index === currentCareerIndex ? "animate-pulse" : ""}
                      `}
                  style={{
                    background:
                      index === currentCareerIndex
                        ? `var(--color-accent)`
                        : `var(--color-border)`,
                    boxShadow:
                      index === currentCareerIndex
                        ? `
                            -4px -4px 8px #FAFBFF,
                            4px 4px 8px var(--color-shadow),
                            0 0 12px var(--color-accent)
                          `
                        : `
                            -2px -2px 4px #FAFBFF,
                            2px 2px 4px var(--color-shadow)
                          `,
                  }}
                  aria-label={`Go to ${careerPaths[index].title}`}
                />
              ))}
            </div>

            {/* Career Title */}
            <div
              className="text-center font-semibold text-sm sm:text-base px-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              {currentCareer.title}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className={`
                  group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                  transition-all duration-300 ease-out
                  transform hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                `}
            style={{
              background: `var(--color-background)`,
              boxShadow: `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                    12px 12px 24px var(--color-shadow),
                    -12px -12px 24px #FAFBFF,
                    0 0 20px var(--color-accent)
                  `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                    8px 8px 16px var(--color-shadow),
                    -8px -8px 16px #FAFBFF
                  `;
            }}
            aria-label="Next career"
          >
            <span
              className="text-xl sm:text-2xl transition-all duration-300 group-hover:scale-125"
              style={{ color: "var(--color-text-primary)" }}
            >
              →
            </span>
          </button>
        </div>

        {/* Career Navigation Info */}
        <div
          className="text-center mt-6 space-y-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <div className="text-xs">
            Tìm hiểu lĩnh vực bạn quan tâm và khám phá con đường sự nghiệp phù
            hợp.
          </div>
          <button
            className="neumorphic-button"
            onClick={() => {
              // Lưu vị trí section 3 vào sessionStorage
              sessionStorage.setItem('homeScrollToSection', 'section-3');
              navigate(`/direction/${currentCareer.id}`);
            }}
          >
            Bắt đầu khám phá →
          </button>
        </div>
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 z-[-1] hidden lg:block">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              background: "var(--color-accent)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Mobile background particles - fewer for performance */}
      <div className="absolute inset-0 z-[-1] lg:hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              background: "var(--color-accent)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Section3;
