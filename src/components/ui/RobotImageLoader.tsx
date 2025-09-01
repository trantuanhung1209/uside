import React, { useEffect, useState } from 'react';
import { useAccentColor } from '../../hooks/useAccentColor';

interface RobotImageLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const RobotImageLoader: React.FC<RobotImageLoaderProps> = ({ 
  isVisible, 
  onComplete, 
  duration = 1500
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { currentAccentColor } = useAccentColor();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onComplete?.(), 300);
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center
      transition-all duration-500 ease-out overflow-hidden
      ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `} style={{
      background: `linear-gradient(135deg, 
        #e3f2fd 0%, 
        #f3e5f5 25%, 
        #fff3e0 50%, 
        #f1f8e9 75%, 
        #e8f5e8 100%)`
    }}>
      
      {/* Animated Cloud Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large background clouds */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-30 animate-pulse"
             style={{ 
               background: `radial-gradient(circle, ${currentAccentColor}40 0%, transparent 70%)`,
               animation: 'float 8s ease-in-out infinite'
             }} />
        <div className="absolute -top-32 right-20 w-80 h-80 rounded-full opacity-25 animate-pulse"
             style={{ 
               background: `radial-gradient(circle, ${currentAccentColor}30 0%, transparent 60%)`,
               animation: 'float 10s ease-in-out infinite reverse'
             }} />
        <div className="absolute bottom-10 -left-32 w-72 h-72 rounded-full opacity-35"
             style={{ 
               background: `radial-gradient(circle, ${currentAccentColor}35 0%, transparent 65%)`,
               animation: 'float 12s ease-in-out infinite'
             }} />
        <div className="absolute -bottom-20 right-10 w-64 h-64 rounded-full opacity-20"
             style={{ 
               background: `radial-gradient(circle, ${currentAccentColor}25 0%, transparent 70%)`,
               animation: 'float 9s ease-in-out infinite reverse'
             }} />
        
        {/* Floating cloud particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15"
            style={{
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${currentAccentColor}20 0%, transparent 50%)`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Neumorphic Loading Card */}
      <div className="relative z-10 p-12 rounded-3xl backdrop-blur-sm"
           style={{
             background: `linear-gradient(145deg, 
               rgba(255,255,255,0.25) 0%, 
               rgba(255,255,255,0.1) 100%)`,
             boxShadow: `
               20px 20px 60px rgba(0,0,0,0.1),
               -20px -20px 60px rgba(255,255,255,0.8),
               inset 5px 5px 10px rgba(0,0,0,0.05),
               inset -5px -5px 10px rgba(255,255,255,0.8)
             `,
             border: '1px solid rgba(255,255,255,0.3)'
           }}>
        
        {/* Neumorphic Logo Container */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 relative">
            {/* Main neumorphic logo with pet cloud image */}
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center relative overflow-hidden"
                 style={{
                   background: `linear-gradient(145deg, 
                     rgba(255,255,255,0.9) 0%, 
                     rgba(240,240,240,0.7) 100%)`,
                   boxShadow: `
                     15px 15px 30px rgba(0,0,0,0.15),
                     -15px -15px 30px rgba(255,255,255,0.9),
                     inset 3px 3px 6px rgba(0,0,0,0.1),
                     inset -3px -3px 6px rgba(255,255,255,0.9)
                   `
                 }}>
              <img 
                src="/images_uside/pet_cloud_uside.png" 
                alt="USide Cloud Pet"
                className="w-16 h-16 object-contain drop-shadow-sm"
              />
              
              {/* Inner glow effect */}
              <div className="absolute inset-2 rounded-2xl opacity-50"
                   style={{
                     background: `radial-gradient(circle, ${currentAccentColor}20 0%, transparent 70%)`
                   }} />
            </div>
            
            {/* Rotating orbital ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full animate-spin"
                 style={{
                   background: `conic-gradient(from 0deg, transparent 0%, ${currentAccentColor}80 50%, transparent 100%)`,
                   mask: 'radial-gradient(circle, transparent 40px, black 42px, black 44px, transparent 46px)'
                 }} />
            
            {/* Pulse rings */}
            <div className="absolute inset-0 w-24 h-24 rounded-full animate-ping opacity-30"
                 style={{
                   background: `radial-gradient(circle, ${currentAccentColor}30 0%, transparent 60%)`
                 }} />
          </div>

          {/* Neumorphic Text */}
          <h2 className="text-2xl font-bold mb-3 text-gray-700" 
              style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -2px -2px 4px rgba(0,0,0,0.1)' }}>
            Đang tải USide
          </h2>
          
          <p className="text-gray-600 text-sm mb-8 opacity-80"
             style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>
            Chuẩn bị trải nghiệm đám mây tuyệt vời...
          </p>

          {/* Neumorphic Progress Container */}
          <div className="w-80 h-4 rounded-2xl mb-4 relative overflow-hidden"
               style={{
                 background: `linear-gradient(145deg, 
                   rgba(230,230,230,0.8) 0%, 
                   rgba(255,255,255,0.9) 100%)`,
                 boxShadow: `
                   inset 8px 8px 16px rgba(0,0,0,0.1),
                   inset -8px -8px 16px rgba(255,255,255,0.9)
                 `
               }}>
            
            {/* Progress fill */}
            <div className="h-full rounded-2xl transition-all duration-200 ease-out relative overflow-hidden"
                 style={{ 
                   width: `${progress}%`,
                   background: `linear-gradient(90deg, 
                     ${currentAccentColor} 0%, 
                     ${currentAccentColor}cc 50%, 
                     ${currentAccentColor}aa 100%)`,
                   boxShadow: `
                     0 2px 10px ${currentAccentColor}40,
                     inset 0 2px 4px rgba(255,255,255,0.3)
                   `
                 }}>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-gray-600 text-sm font-semibold"
               style={{ 
                 textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
                 color: currentAccentColor 
               }}>
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Floating cloud elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-40"
            style={{
              width: '8px',
              height: '8px',
              background: `radial-gradient(circle, ${currentAccentColor} 0%, transparent 70%)`,
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: `0 0 10px ${currentAccentColor}60`
            }}
          />
        ))}
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
      `}</style>
    </div>
  );
};

export default RobotImageLoader;
