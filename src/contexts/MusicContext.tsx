import React, { createContext, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  currentTrack: number;
  toggleMusic: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export { MusicContext };

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Danh sách các bài nhạc
  const musicTracks = [
    "/music_uside/music1.mp3",
    "/music_uside/music2.mp3", 
    "/music_uside/music3.mp3"
  ];

  // Khởi tạo audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = false;
      audio.volume = 0.7;
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Xử lý khi bài nhạc kết thúc
  const handleTrackEnd = () => {
    // Chuyển sang bài tiếp theo
    const nextTrack = (currentTrack + 1) % musicTracks.length;
    setCurrentTrack(nextTrack);
    if (audioRef.current) {
      audioRef.current.src = musicTracks[nextTrack];
      audioRef.current.play();
    }
  };

  // Toggle music play/stop
  const toggleMusic = () => {
    if (isPlaying) {
      // Đang phát -> dừng lại
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    } else {
      // Đang dừng -> phát nhạc
      // Random chọn bài nhạc
      const randomTrack = Math.floor(Math.random() * musicTracks.length);
      setCurrentTrack(randomTrack);
      
      if (audioRef.current) {
        audioRef.current.src = musicTracks[randomTrack];
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Không thể phát nhạc:", error);
          });
      }
    }
  };

  const value = {
    isPlaying,
    currentTrack,
    toggleMusic,
    audioRef,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Global Audio Element */}
      <audio 
        ref={audioRef}
        onEnded={handleTrackEnd}
        preload="none"
      />
    </MusicContext.Provider>
  );
};
