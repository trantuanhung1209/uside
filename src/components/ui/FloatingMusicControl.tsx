import { useMusic } from '../../hooks';

const FloatingMusicControl = () => {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <div className="inline-block sticky bottom-10 left-[95%] z-50">
      <button
        className="w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-cyan-200 cursor-pointer shadow-lg"
        style={{
          backgroundColor: "var(--color-background)",
          boxShadow:
            "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.3)",
        }}
        onClick={toggleMusic}
        title={isPlaying ? "Dừng nhạc" : "Phát nhạc"}
      >
        {/* Play/Stop Icon */}
        <div className="relative z-10">
          {isPlaying ? (
            // Stop Icon
            <svg
              className="w-6 h-6 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 6h12v12H6z" />
            </svg>
          ) : (
            // Play Icon
            <svg
              className="w-6 h-6 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
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
            background: "linear-gradient(90deg, #00d2ff 0%, #3aefc4 50%, #00d2ff 100%)"
          }}
        ></div>

        {/* Sound waves animation when playing */}
        {isPlaying && (
          <div className="absolute -inset-6 pointer-events-none">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-20 animate-ping"></div>
            <div 
              className="absolute inset-2 rounded-full border-2 border-cyan-300 opacity-30 animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingMusicControl;
