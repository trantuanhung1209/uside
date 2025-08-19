import { useMusic } from "../../../hooks";

const Television = () => {
  const { isPlaying, toggleMusic } = useMusic();
  return (
    <>
      <div className="relative">
        <div
          className="rounded-[20px] p-3 md:p-4 transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: "var(--color-background)",
            boxShadow:
              "-10px -10px 20px #FAFBFF, 10px 10px 20px var(--color-shadow)",
          }}
        >
          {/* Main content area */}
          <div
            className="h-64 md:h-80 rounded-[12px] mb-6 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: "var(--color-secondary)",
              boxShadow:
                "inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px var(--color-shadow)",
            }}
          >
            {/* Geometric illustration */}
            <div className="relative z-10">...</div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom decorative elements */}
          <div className="flex justify-between items-center">
            <button
              className="w-24 h-24 transition-all duration-500 hover:scale-110 active:scale-95 group relative overflow-hidden focus:outline-none cursor-pointer"
              onClick={toggleMusic}
              title={isPlaying ? "Dừng nhạc" : "Phát nhạc"}
            >
              {/* Robot Music Button - Play State */}
              <img
                src="/images_uside/button_play.png"
                alt="Robot Play Button"
                className={`w-full h-full object-contain transition-all duration-700 ease-in-out transform ${
                  isPlaying
                    ? "opacity-0 scale-75 rotate-12"
                    : "opacity-100 scale-100 rotate-0 group-hover:scale-105"
                }`}
                style={{
                  filter: isPlaying
                    ? "blur(2px)"
                    : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2)) brightness(1.1)",
                }}
              />

              {/* Robot Music Button - Active/Playing State */}
              <img
                src="/images_uside/button_play_active.png"
                alt="Robot Playing Button"
                className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-700 ease-in-out transform ${
                  isPlaying
                    ? "opacity-100 scale-100 rotate-0 animate-pulse"
                    : "opacity-0 scale-75 -rotate-12"
                }`}
                style={{
                  filter: isPlaying
                    ? "drop-shadow(0 6px 12px rgba(0, 210, 255, 0.4)) brightness(1.2) saturate(1.3)"
                    : "blur(2px)",
                }}
              />

              {/* Interactive glow effect */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none ${
                  isPlaying
                    ? "bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-600/30 animate-pulse scale-110"
                    : "bg-gradient-to-br from-transparent via-transparent to-transparent scale-100 group-hover:from-cyan-400/10 group-hover:via-blue-500/5 group-hover:to-purple-600/10 group-hover:scale-105"
                }`}
                style={{
                  background: isPlaying
                    ? "radial-gradient(circle, rgba(0,210,255,0.2) 0%, rgba(58,239,196,0.15) 50%, rgba(147,51,234,0.1) 100%)"
                    : undefined,
                }}
              />

              {/* Ripple effect on click */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,210,255,0.4) 0%, rgba(58,239,196,0.2) 70%, transparent 100%)",
                  animation: "ripple 0.6s ease-out",
                }}
              />
            </button>
            <div className="flex-1 mx-6 space-y-3">
              <div
                className="h-3 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--color-primary)",
                  boxShadow:
                    "inset -2px -2px 4px #FAFBFF, inset 2px 2px 4px rgba(22, 17, 29, 0.15)",
                }}
              ></div>
              <div
                className="h-3 rounded-full w-3/4 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  boxShadow:
                    "inset -2px -2px 4px #FAFBFF, inset 2px 2px 4px rgba(22, 17, 29, 0.15)",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements with neumorphic effect */}
        <div
          className="absolute -top-8 -left-8 w-16 h-16 rounded-full animate-pulse transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: "var(--color-primary)",
            boxShadow:
              "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.2)",
          }}
        ></div>
        <div
          className="absolute -top-6 -right-10 w-10 h-10 rounded-full animate-pulse transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: "var(--color-accent)",
            boxShadow:
              "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.2)",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute bottom-10 -left-10 w-12 h-12 rounded-full animate-pulse transition-all duration-300 hover:scale-110 z-10"
          style={{
            backgroundColor: "var(--color-secondary)",
            boxShadow:
              "-5px -5px 10px #FAFBFF, 5px 5px 10px rgba(22, 17, 29, 0.2)",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute bottom-10 -right-8 w-8 h-8 rounded-full animate-pulse transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: "var(--color-text-accent)",
            boxShadow:
              "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.2)",
            animationDelay: "0.5s",
          }}
        ></div>
      </div>
    </>
  );
};

export default Television;
