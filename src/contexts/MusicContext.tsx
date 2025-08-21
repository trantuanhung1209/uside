import React, { createContext, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  currentTrack: number;
  volume: number;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
  playSpecificTrack: (trackUrl: string) => void;
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
  const [volume, setVolumeState] = useState(0.7);
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
      audio.volume = volume;
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Separate effect for volume changes to prevent audio interruption
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      console.log('Volume effect triggered:', volume, 'Audio paused:', audio.paused);
      audio.volume = volume;
    }
  }, [volume]);

  // Set volume function
  const setVolume = (newVolume: number) => {
    // Clamp volume between 0 and 1
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    console.log('Setting volume to:', clampedVolume, 'Current playing:', isPlaying);
    setVolumeState(clampedVolume);
    
    // Volume will be updated via useEffect to prevent audio interruption
    // The separate useEffect will handle audio.volume = clampedVolume
  };

  // Xử lý khi bài nhạc kết thúc
  const handleTrackEnd = () => {
    // Chuyển sang bài tiếp theo
    const nextTrack = (currentTrack + 1) % musicTracks.length;
    setCurrentTrack(nextTrack);
    if (audioRef.current) {
      audioRef.current.src = musicTracks[nextTrack];
      // Đảm bảo volume được set đúng cho bài tiếp theo
      audioRef.current.volume = volume;
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
        // Đảm bảo volume được set đúng trước khi phát
        audioRef.current.volume = volume;
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

  // Play specific track by URL
  const playSpecificTrack = (trackUrl: string) => {
    if (audioRef.current) {
      // Pause current track if playing
      if (isPlaying) {
        audioRef.current.pause();
      }
      
      // Set new track
      audioRef.current.src = trackUrl;
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 0;
      
      // Play new track
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Không thể phát nhạc:", error);
        });
    }
  };

  const value = {
    isPlaying,
    currentTrack,
    volume,
    toggleMusic,
    setVolume,
    playSpecificTrack,
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
