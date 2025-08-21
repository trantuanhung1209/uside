import React, { useEffect, useState } from 'react';

interface RobotImageLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
  robotImage?: string; // đường dẫn đến hình ảnh robot
}

const RobotImageLoader: React.FC<RobotImageLoaderProps> = ({ 
  isVisible, 
  onComplete, 
  duration = 3000,
  robotImage = '/images_uside/mascot_robot.png'
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [stage, setStage] = useState<'appearing' | 'working' | 'lifting' | 'complete'>('appearing');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Tự động scroll lên đầu trang khi component mount


  useEffect(() => {
    if (!isVisible) return;

    const timer1 = setTimeout(() => setStage('working'), 500);
    const timer2 = setTimeout(() => setStage('lifting'), duration - 1000);
    const timer3 = setTimeout(() => {
      setStage('complete');
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVisible, duration, onComplete]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center
      transition-all duration-1000 ease-in-out
      ${stage === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-20">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Curtain effect - Left */}
      <div className={`
        absolute top-0 left-0 w-1/2 h-full z-10
        transition-transform duration-1000 ease-in-out
        ${stage === 'lifting' || stage === 'complete' ? '-translate-y-full' : 'translate-y-0'}
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
      `}>
        {/* Curtain details */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-purple-600 to-purple-400 shadow-lg" />
          <div className="absolute bottom-2 left-0 right-0 h-1 bg-purple-300" />
          {/* Curtain folds */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-8 w-px bg-gray-700 opacity-30"
              style={{ left: `${20 + i * 15}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Curtain effect - Right */}
      <div className={`
        absolute top-0 right-0 w-1/2 h-full z-10
        transition-transform duration-1000 ease-in-out
        ${stage === 'lifting' || stage === 'complete' ? '-translate-y-full' : 'translate-y-0'}
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
      `}>
        {/* Curtain details */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-purple-600 to-purple-400 shadow-lg" />
          <div className="absolute bottom-2 left-0 right-0 h-1 bg-purple-300" />
          {/* Curtain folds */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-8 w-px bg-gray-700 opacity-30"
              style={{ left: `${20 + i * 15}%` }}
            />
          ))}
        </div>
      </div>

      {/* Robot Container */}
      <div className={`
        relative z-20 flex flex-col items-center
        transition-all duration-500 ease-out
        ${stage === 'appearing' ? 'scale-0 rotate-12 opacity-0' : 'scale-100 rotate-0 opacity-100'}
        ${stage === 'lifting' ? 'translate-y-8 scale-110' : 'translate-y-0'}
      `}>
        {/* Robot Image */}
        <div className={`
          relative mb-8
          transition-all duration-500
          ${stage === 'working' ? 'animate-bounce' : ''}
          ${stage === 'lifting' ? 'animate-pulse' : ''}
        `}>
          <div className="relative">
            {/* Robot Shadow */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black opacity-20 rounded-full blur-md" />
            
            {/* Robot Image */}
            <img 
              src={robotImage} 
              alt="Loading Robot"
              className={`
                w-32 h-32 object-contain drop-shadow-2xl
                transition-all duration-300
                ${!imageLoaded ? 'opacity-0' : 'opacity-100'}
                ${stage === 'lifting' ? 'filter brightness-110 contrast-110' : ''}
              `}
              onLoad={handleImageLoad}
              onError={() => setImageLoaded(true)} // Fallback if image fails to load
            />
            
            {/* Glow effect */}
            <div className={`
              absolute inset-0 rounded-full
              ${stage === 'lifting' ? 'bg-blue-400 opacity-20 animate-ping' : ''}
            `} />
          </div>
          
          {/* Robot working indicators */}
          {stage === 'working' && (
            <>
              {/* Spinning gears */}
              <div className="absolute top-2 right-2 w-4 h-4 border-2 border-purple-400 border-dotted rounded-full animate-spin" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-2 border-blue-400 border-dotted rounded-full animate-spin" 
                   style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
            </>
          )}
        </div>

        {/* Rope/Chain effect for lifting */}
        {stage === 'lifting' && (
          <>
            {/* Left rope */}
            <div className="absolute top-16 left-8 w-1 h-32 bg-gradient-to-b from-purple-600 to-purple-800 transform -rotate-12">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-1 bg-purple-500 rounded-full left-1/2 transform -translate-x-1/2"
                  style={{ top: `${i * 2}px` }}
                />
              ))}
            </div>
            
            {/* Right rope */}
            <div className="absolute top-16 right-8 w-1 h-32 bg-gradient-to-b from-purple-600 to-purple-800 transform rotate-12">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-1 bg-purple-500 rounded-full left-1/2 transform -translate-x-1/2"
                  style={{ top: `${i * 2}px` }}
                />
              ))}
            </div>
            
            {/* Pulleys */}
            <div className="absolute top-12 left-8 w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-400 animate-spin" />
            <div className="absolute top-12 right-8 w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-400 animate-spin" 
                 style={{ animationDirection: 'reverse' }} />
          </>
        )}

        {/* Loading Text */}
        <div className="text-center">
          <div className={`
            text-white text-2xl font-bold mb-4 drop-shadow-lg
            transition-all duration-300
            ${stage === 'appearing' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {stage === 'appearing' && 'Khởi tạo USide...'}
              {stage === 'working' && 'Robot đang chuẩn bị...'}
              {stage === 'lifting' && 'Đang mở màn...'}
            </span>
          </div>
          
          {/* Loading Progress */}
          <div className="w-80 h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-600">
            <div className={`
              h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full
              transition-all duration-1000 ease-out relative
              ${stage === 'appearing' ? 'w-0' : ''}
              ${stage === 'working' ? 'w-3/4' : ''}
              ${stage === 'lifting' ? 'w-full' : ''}
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
            </div>
          </div>
          
          {/* Loading Percentage */}
          <div className="mt-2 text-gray-300 text-sm font-medium">
            {stage === 'appearing' && '0%'}
            {stage === 'working' && '75%'}
            {stage === 'lifting' && '100%'}
          </div>
        </div>
      </div>

      {/* Magic Sparkles */}
      {stage === 'lifting' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />
              <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      )}
      
      {/* Light rays effect */}
      {stage === 'lifting' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-96 bg-gradient-to-t from-transparent via-purple-200 to-transparent opacity-20"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  transformOrigin: 'center bottom',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotImageLoader;
