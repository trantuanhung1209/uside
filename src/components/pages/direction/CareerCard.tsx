import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  image?: string; // Optional for future use
  icon: string;
  skills: string[];
  opportunities: string;
  gradient: string;
}

interface CareerCardProps {
  career: CareerPath;
  index: number;
}

export const CareerCard: React.FC<CareerCardProps> = ({ career, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Animation effect when card appears
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [career.id]);

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl 
        p-4 sm:p-6 md:p-8
        transition-all duration-700 ease-out
        transform hover:scale-[1.02]
        ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }
      `}
      style={{
        background: `var(--color-background)`,
        boxShadow: `
          10px 10px 20px var(--color-shadow),
          -10px -10px 20px #FAFBFF
        `,
        transition: "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        // Update hover shadow using CSS variables
        const element = document.querySelector(
          `[data-career="${career.id}"]`
        ) as HTMLElement;
        if (element) {
          element.style.boxShadow = `
            25px 25px 50px var(--color-shadow),
            -25px -25px 50px #FAFBFF,
            0 0 30px rgba(0, 210, 255, 0.1)
          `;
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        // Reset to default shadow
        const element = document.querySelector(
          `[data-career="${career.id}"]`
        ) as HTMLElement;
        if (element) {
          element.style.boxShadow = `
            10px 10px 20px var(--color-shadow),
            -10px -10px 20px #FAFBFF
          `;
        }
      }}
      data-career={career.id}
    >
      {/* Animated gradient overlay */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-10
        bg-accent
        transition-opacity duration-500
      `}
      />

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 lg:gap-8 relative z-10">
        {/* Left Content */}
        <div className={`flex-1 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
          {/* Icon and Title */}
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div
              className={`
                text-2xl sm:text-3xl lg:text-4xl p-2 sm:p-3 rounded-xl sm:rounded-2xl
                transition-all duration-300
                ${isHovered ? "animate-bounce" : ""}
              `}
              style={{
                background: `var(--color-background)`,
                boxShadow: `
                  8px 8px 16px var(--color-shadow),
                  -8px -8px 16px #FAFBFF
                `,
              }}
            >
              {career.icon}
            </div>
            <h3
              className="text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300"
              style={{
                color: "var(--color-text-primary)",
              }}
            >
              {career.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="mb-4 sm:mb-6 leading-relaxed transition-colors duration-300 text-sm sm:text-base"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            {career.description}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {career.skills.map((skill, skillIndex) => (
              <span
                key={skill}
                className={`
                  px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium
                  rounded-full border
                `}
                style={{
                  color: "var(--color-text-primary)",
                  borderColor: "var(--color-border)",
                  boxShadow: `
                    4px 4px 8px var(--color-shadow),
                    -4px -4px 8px #FAFBFF
                  `,
                  animationDelay: `${skillIndex * 100}ms`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Opportunities */}
          <div className="mb-4 sm:mb-6">
            <p
              className="text-xs sm:text-sm italic"
              style={{
                color: "var(--color-text-secondary)",
              }}
            >
              💡 {career.opportunities}
            </p>
          </div>

          {/* Learn More Button */}
          <button
            className={`
              px-6 sm:px-8 py-2.5 sm:py-3 text-white font-semibold rounded-xl sm:rounded-2xl
              text-sm sm:text-base
              transform hover:scale-105 active:scale-95
              transition-all duration-200 ease-out
              relative overflow-hidden
              w-full sm:w-auto
              ${isHovered ? "animate-pulse" : ""}
            `}
            style={{
              background: `var(--color-accent)`,
              boxShadow: `
                8px 8px 16px var(--color-shadow),
                -8px -8px 16px rgba(255,255,255,0.1)
              `,
            }}
            onClick={() => {
              navigate(`/dinh-huong/${career.id}`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                12px 12px 24px var(--color-shadow),
                -12px -12px 24px rgba(255,255,255,0.2),
                0 0 20px var(--color-accent)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                8px 8px 16px var(--color-shadow),
                -8px -8px 16px rgba(255,255,255,0.1)
              `;
            }}
          >
            <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 cursor-pointer">
              Tìm hiểu thêm
              <span
                className={`
                transform transition-transform duration-300
                ${isHovered ? "translate-x-1" : ""}
              `}
              >
                →
              </span>
            </span>
          </button>
        </div>

        {/* Right Image */}
        <div
          className={`flex-shrink-0 mt-4 lg:mt-0 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
        >
          <div
            className={`
              w-full sm:w-72 lg:w-80 h-48 sm:h-56 lg:h-64 rounded-2xl sm:rounded-3xl overflow-hidden
              transition-all duration-500
              transform group-hover:scale-105
              relative mx-auto
            `}
            style={{
              background: `var(--color-secondary)`,
              boxShadow: `
                inset 8px 8px 16px var(--color-shadow),
                inset -8px -8px 16px #FAFBFF
              `,
            }}
          >
            {/* Placeholder for image */}
            <div
              className={`
              w-full h-full flex items-center justify-center
              bg-accent opacity-20
              group-hover:opacity-30 transition-opacity duration-300
            `}
            >
              <div
                className={`
                text-4xl sm:text-5xl lg:text-6xl opacity-50 group-hover:opacity-70 
                transition-all duration-300
                ${isHovered ? "animate-pulse scale-110" : ""}
              `}
              >
                {career.icon}
              </div>
            </div>

            {/* Animated overlay effect */}
            <div
              className={`
              absolute inset-0 bg-white
              opacity-0 group-hover:opacity-20
              transform -skew-x-12 -translate-x-full group-hover:translate-x-full
              transition-all duration-1000 ease-out
            `}
            />
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full
              opacity-0 group-hover:opacity-40
              transition-all duration-1000 ease-out
              ${isHovered ? "animate-ping" : ""}
            `}
            style={{
              background: `var(--color-accent)`,
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};