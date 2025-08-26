import { useMusic } from '../../hooks';
import { useAccentColor } from '../../hooks/useAccentColor';

const FloatingMusicControl = () => {
  const { isPlaying, toggleMusic } = useMusic();
  const { currentAccentColor } = useAccentColor();

  return (
    <div className="inline-block fixed bottom-[3%] left-[85%] lg:left-[95%] z-50">
      <button
        className="lg:w-14 lg:h-14 w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden flex items-center justify-center focus:outline-none cursor-pointer shadow-lg section-neumorphic"
        onClick={toggleMusic}
        title={isPlaying ? "Dừng nhạc" : "Phát nhạc"}
        style={{
          focusRingColor: `color-mix(in srgb, ${currentAccentColor} 20%, transparent)`,
          '--focus-ring': `0 0 0 4px color-mix(in srgb, ${currentAccentColor} 20%, transparent)`,
          borderRadius: "50%",
        } as React.CSSProperties}
        onFocus={(e) => {
          (e.target as HTMLElement).style.boxShadow = `0 0 0 4px color-mix(in srgb, ${currentAccentColor} 20%, transparent)`;
        }}
        onBlur={(e) => {
          (e.target as HTMLElement).style.boxShadow = '';
        }}
      >
        {/* Play/Stop Icon */}
        <div className="relative z-10">
          {isPlaying ? (
            // Stop Icon
            <svg
              className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ 
                color: currentAccentColor,
                filter: `drop-shadow(0 0 4px ${currentAccentColor}30)`
              }}
            >
              <path d="M6 6h12v12H6z" />
            </svg>
          ) : (
            // Play Icon
            <svg
              className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ 
                color: currentAccentColor,
                filter: `drop-shadow(0 0 4px ${currentAccentColor}30)`
              }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Inner neumorphic effect */}
        <div
          className="absolute inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "var(--color-background)",
            boxShadow:
              "inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px rgba(22, 17, 29, 0.15)",
          }}
        ></div>

        {/* Subtle glow effect - enhanced when playing */}
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
            isPlaying 
              ? "opacity-30 animate-pulse" 
              : "opacity-0 group-hover:opacity-20"
          }`}
          style={{
            background: `linear-gradient(90deg, ${currentAccentColor} 0%, #3aefc4 50%, ${currentAccentColor} 100%)`
          }}
        ></div>

        {/* Sound waves animation when playing */}
        {isPlaying && (
          <div className="absolute -inset-6 pointer-events-none">
            <div 
              className="absolute inset-0 rounded-full border-2 opacity-20 animate-ping"
              style={{ borderColor: currentAccentColor }}
            ></div>
            <div 
              className="absolute inset-2 rounded-full border-2 opacity-30 animate-ping"
              style={{ 
                borderColor: `color-mix(in srgb, ${currentAccentColor} 80%, white)`,
                animationDelay: "0.5s" 
              }}
            ></div>
          </div>
        )}

        {/* Hover glow effect */}
        <div 
          className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${currentAccentColor} 0%, transparent 70%)`,
            filter: 'blur(8px)'
          }}
        ></div>
      </button>
    </div>
  );
};

export default FloatingMusicControl;
