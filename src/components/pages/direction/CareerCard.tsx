import { useEffect, useState } from "react";

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

  // Animation effect when card appears
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [career.id]);

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl p-8
        transition-all duration-700 ease-out
        transform hover:scale-[1.02]
        ${index % 2 === 0 ? "" : "flex-row-reverse"}
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }
      `}
      style={{
        background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
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
        bg-gradient-to-r ${career.gradient}
        transition-opacity duration-500
      `}
      />

      {/* Content Container */}
      <div className="flex items-center gap-8 relative z-10">
        {/* Left Content */}
        <div className={`flex-1 ${index % 2 === 0 ? "order-1" : "order-2"}`}>
          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`
                text-4xl p-3 rounded-2xl
                transition-all duration-300
                ${isHovered ? "animate-bounce" : ""}
              `}
              style={{
                background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
                boxShadow: `
                  8px 8px 16px var(--color-shadow),
                  -8px -8px 16px #FAFBFF
                `,
              }}
            >
              {career.icon}
            </div>
            <h3
              className="text-2xl font-bold transition-colors duration-300"
              style={{
                color: "var(--color-text-primary)",
              }}
            >
              {career.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="mb-6 leading-relaxed transition-colors duration-300 text-[16px]"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            {career.description}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {career.skills.map((skill, skillIndex) => (
              <span
                key={skill}
                className={`
                  px-4 py-2 text-sm font-medium
                  rounded-full border
                  transform hover:scale-105
                  transition-all duration-300
                  ${isHovered ? "animate-pulse" : ""}
                `}
                style={{
                  color: "var(--color-text-primary)",
                  background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`,
                  borderColor: "var(--color-border)",
                  boxShadow: `
                    4px 4px 8px var(--color-shadow),
                    -4px -4px 8px #FAFBFF
                  `,
                  animationDelay: `${skillIndex * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(90deg, var(--color-accent), #3aefc4)`;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.boxShadow = `
                    6px 6px 12px var(--color-shadow),
                    -6px -6px 12px #FAFBFF,
                    0 0 15px var(--color-accent)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, var(--color-background) 0%, var(--color-secondary) 100%)`;
                  e.currentTarget.style.color = "var(--color-text-primary)";
                  e.currentTarget.style.boxShadow = `
                    4px 4px 8px var(--color-shadow),
                    -4px -4px 8px #FAFBFF
                  `;
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Opportunities */}
          <div className="mb-6">
            <p
              className="text-sm italic"
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
              px-8 py-3 text-white font-semibold rounded-2xl
              transform hover:scale-105 active:scale-95
              transition-all duration-200 ease-out
              relative overflow-hidden
              ${isHovered ? "animate-pulse" : ""}
            `}
            style={{
              background: `linear-gradient(90deg, var(--color-accent) 0%, #3aefc4 100%)`,
              boxShadow: `
                8px 8px 16px var(--color-shadow),
                -8px -8px 16px rgba(255,255,255,0.1)
              `,
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
            <span className="relative z-10 flex items-center gap-2 cursor-pointer">
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
          className={`flex-shrink-0 ${index % 2 === 0 ? "order-2" : "order-1"}`}
        >
          <div
            className={`
              w-80 h-64 rounded-3xl overflow-hidden
              transition-all duration-500
              transform group-hover:scale-105
              relative
            `}
            style={{
              background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)`,
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
              bg-gradient-to-br ${career.gradient} opacity-20
              group-hover:opacity-30 transition-opacity duration-300
            `}
            >
              <div
                className={`
                text-6xl opacity-50 group-hover:opacity-70 
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
              absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
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
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-2 h-2 rounded-full
              opacity-0 group-hover:opacity-40
              transition-all duration-1000 ease-out
              ${isHovered ? "animate-ping" : ""}
            `}
            style={{
              background: `linear-gradient(90deg, var(--color-accent), #3aefc4)`,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};