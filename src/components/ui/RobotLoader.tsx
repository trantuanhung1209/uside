import React, { useEffect, useState } from 'react';

interface RobotLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number; // thời gian loading (ms)
}

const RobotLoader: React.FC<RobotLoaderProps> = ({ 
  isVisible, 
  onComplete, 
  duration = 3000 
}) => {
  const [stage, setStage] = useState<'appearing' | 'working' | 'lifting' | 'complete'>('appearing');

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

  if (!isVisible) return null;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center
      transition-all duration-1000 ease-in-out
      ${stage === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" />
      
      {/* Curtain effect - Left */}
      <div className={`
        absolute top-0 left-0 w-1/2 h-full bg-gray-800 z-10
        transition-transform duration-1000 ease-in-out
        ${stage === 'lifting' || stage === 'complete' ? '-translate-y-full' : 'translate-y-0'}
      `}>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-600 to-gray-800 shadow-lg" />
      </div>
      
      {/* Curtain effect - Right */}
      <div className={`
        absolute top-0 right-0 w-1/2 h-full bg-gray-800 z-10
        transition-transform duration-1000 ease-in-out
        ${stage === 'lifting' || stage === 'complete' ? '-translate-y-full' : 'translate-y-0'}
      `}>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-600 to-gray-800 shadow-lg" />
      </div>

      {/* Robot Container */}
      <div className={`
        relative z-20 flex flex-col items-center
        transition-all duration-500 ease-out
        ${stage === 'appearing' ? 'scale-0 rotate-12' : 'scale-100 rotate-0'}
        ${stage === 'lifting' ? 'translate-y-8 scale-110' : 'translate-y-0'}
      `}>
        {/* Robot */}
        <div className={`
          relative w-32 h-32 mb-8
          transition-all duration-300
          ${stage === 'working' ? 'animate-bounce' : ''}
          ${stage === 'lifting' ? 'animate-pulse' : ''}
        `}>
          {/* Robot Body */}
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 via-white to-gray-300 rounded-3xl relative shadow-2xl mx-auto">
            {/* Robot Eyes */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className={`
                w-4 h-4 bg-gray-600 rounded-full relative
                ${stage === 'working' ? 'animate-ping' : ''}
              `}>
                <div className="absolute inset-1 bg-white rounded-full" />
              </div>
              <div className={`
                w-4 h-4 bg-gray-600 rounded-full relative
                ${stage === 'working' ? 'animate-ping' : ''}
              `}>
                <div className="absolute inset-1 bg-white rounded-full" />
              </div>
            </div>
            
            {/* Robot Mouth */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-3 bg-gray-600 rounded-full" />
            </div>
            
            {/* Robot Ears */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-gray-300 rounded-full" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-300 rounded-full" />
          </div>
          
          {/* Robot Arms */}
          <div className={`
            absolute top-12 -left-6 w-8 h-8 bg-gray-300 rounded-full
            transition-all duration-300
            ${stage === 'lifting' ? 'rotate-45 -translate-y-2' : 'rotate-0'}
          `} />
          <div className={`
            absolute top-12 -right-6 w-8 h-8 bg-gray-300 rounded-full
            transition-all duration-300
            ${stage === 'lifting' ? '-rotate-45 -translate-y-2' : 'rotate-0'}
          `} />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <div className={`
            text-white text-xl font-semibold mb-2
            transition-all duration-300
            ${stage === 'appearing' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}>
            {stage === 'appearing' && 'Đang khởi tạo...'}
            {stage === 'working' && 'Robot đang làm việc...'}
            {stage === 'lifting' && 'Đang mở cánh cửa...'}
          </div>
          
          {/* Loading Progress */}
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className={`
              h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full
              transition-all duration-1000 ease-out
              ${stage === 'appearing' ? 'w-0' : ''}
              ${stage === 'working' ? 'w-3/4' : ''}
              ${stage === 'lifting' ? 'w-full' : ''}
            `} />
          </div>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`
                  w-2 h-2 bg-white rounded-full
                  animate-pulse
                  ${stage === 'working' ? 'opacity-100' : 'opacity-50'}
                `}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Rope/Chain effect for lifting */}
        {stage === 'lifting' && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16">
            <div className="w-1 h-16 bg-yellow-400 relative">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-1 bg-yellow-600 rounded-full left-1/2 transform -translate-x-1/2"
                  style={{ top: `${i * 2}px` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sparkle Effects */}
      {stage === 'lifting' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RobotLoader;
