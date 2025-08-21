import { useState, useRef, useEffect } from "react";
import { useMusic } from "../../../hooks";
import { TV_CHANNELS, getNextChannel, getPreviousChannel, type TvChannel } from "../../../constants";

const Television = () => {
  const { isPlaying, toggleMusic, volume, setVolume, playSpecificTrack } = useMusic();
  const [currentChannel, setCurrentChannel] = useState<TvChannel>(TV_CHANNELS[0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle channel change
  const changeChannel = (newChannel: TvChannel) => {
    setCurrentChannel(newChannel);
    
    // Change video
    if (videoRef.current) {
      videoRef.current.src = newChannel.video;
      videoRef.current.load();
      videoRef.current.play().catch(console.error);
    }
    
    // Change music if playing
    if (isPlaying) {
      playSpecificTrack(newChannel.music);
    }
  };

  const nextChannel = () => {
    const next = getNextChannel(currentChannel.id);
    changeChannel(next);
  };

  const previousChannel = () => {
    const previous = getPreviousChannel(currentChannel.id);
    changeChannel(previous);
  };

  // Override toggle music to play current channel's music
  const handleToggleMusic = () => {
    if (!isPlaying) {
      playSpecificTrack(currentChannel.music);
    } else {
      toggleMusic();
    }
  };

  // Update video source when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = currentChannel.video;
      videoRef.current.load();
    }
  }, [currentChannel.video]);

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
            {/* Video content */}
            <div className="relative z-10 w-full h-full rounded-[8px] overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={currentChannel.video} type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/images_uside/pet_uside_dark.png" 
                    alt="USide Pet" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </video>
              
              {/* Channel Info Overlay */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                <div className="font-semibold">{currentChannel.name}</div>
                {currentChannel.description && (
                  <div className="text-xs opacity-75">{currentChannel.description}</div>
                )}
              </div>
              
              {/* Video overlay for better visual integration */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(45deg, transparent 30%, var(--color-accent)5 50%, transparent 70%)",
                  mixBlendMode: "overlay"
                }}
              />
            </div>

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

          {/* Bottom Controls */}
          <div className="flex justify-between items-center">
            {/* Channel Controls */}
            <div className="flex items-center space-x-3">
              {/* Previous Channel Button */}
              <button
                onClick={previousChannel}
                className="w-12 h-12 section-neumorphic transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden focus:outline-none cursor-pointer rounded-full flex items-center justify-center"
                title="Kênh trước"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderRadius: "50%",
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--color-accent)" }}>
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              {/* Channel Number Display */}
              <div 
                className="px-4 py-2 rounded-lg text-sm font-bold min-w-[60px] text-center"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-accent)",
                  boxShadow: "inset -2px -2px 4px #FAFBFF, inset 2px 2px 4px rgba(22, 17, 29, 0.15)"
                }}
              >
                CH {currentChannel.id}
              </div>
              
              {/* Next Channel Button */}
              <button
                onClick={nextChannel}
                className="w-12 h-12 section-neumorphic transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden focus:outline-none cursor-pointer rounded-full flex items-center justify-center"
                title="Kênh sau"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderRadius: "50%",
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--color-accent)" }}>
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>

            {/* Music Play Button */}
            <button
              className="w-16 h-16 section-neumorphic transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden focus:outline-none cursor-pointer rounded-full flex items-center justify-center"
              onClick={handleToggleMusic}
              title={isPlaying ? "Dừng nhạc" : "Phát nhạc"}
              style={{
                backgroundColor: "var(--color-background)",
                borderRadius: "50%",
              }}
            >
              {/* Play/Stop Icon */}
              <div className="relative z-20">
                {isPlaying ? (
                  // Stop Icon
                  <svg
                    className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{
                      color: "var(--color-accent)",
                      filter: `drop-shadow(0 0 4px var(--color-accent)30)`,
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
                      color: "var(--color-accent)",
                      filter: `drop-shadow(0 0 4px var(--color-accent)30)`,
                    }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>

              {/* Subtle glow effect */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
                  isPlaying
                    ? "bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-purple-600/10 scale-105"
                    : "bg-gradient-to-br from-transparent via-transparent to-transparent scale-100 group-hover:from-cyan-400/5 group-hover:via-blue-500/3 group-hover:to-purple-600/5 group-hover:scale-102"
                }`}
              />
            </button>
            
            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              {/* Volume Icon */}
              <div className="flex items-center">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "var(--color-accent)" }}
                >
                  {volume === 0 ? (
                    // Muted icon
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  ) : volume < 0.5 ? (
                    // Low volume icon
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  ) : (
                    // High volume icon
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  )}
                </svg>
              </div>
              
              {/* Volume Slider */}
              <div className="relative w-20">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    console.log('Setting volume to:', newVolume); // Debug log
                    setVolume(newVolume);
                  }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${volume * 100}%, var(--color-secondary) ${volume * 100}%, var(--color-secondary) 100%)`,
                    boxShadow: "inset -1px -1px 2px #FAFBFF, inset 1px 1px 2px rgba(22, 17, 29, 0.1)"
                  }}
                />
                
                {/* Volume percentage display */}
                <div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-75"
                  style={{ color: "var(--color-accent)" }}
                >
                  {Math.round(volume * 100)}%
                </div>
              </div>
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
