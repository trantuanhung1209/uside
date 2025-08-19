import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ACCENT_COLORS } from '../constants/accentColors';
import { AccentColorContext } from './AccentColorContextCore';

interface AccentColorProviderProps {
  children: ReactNode;
}

const AccentColorProvider: React.FC<AccentColorProviderProps> = ({ children }) => {
  const [currentAccentColor, setCurrentAccentColor] = useState<string>(ACCENT_COLORS.default);

  // Load accent color từ localStorage khi component mount
  useEffect(() => {
    const loadSavedColor = () => {
      try {
        const savedColor = localStorage.getItem('uside-accent-color');
        const colorValues = Object.values(ACCENT_COLORS);
        
        if (savedColor && colorValues.includes(savedColor as typeof colorValues[number])) {
          setCurrentAccentColor(savedColor);
          updateCSSVariable(savedColor);
          console.log('🎨 Đã tải màu accent đã lưu:', savedColor);
        } else {
          // Nếu màu đã lưu không hợp lệ, sử dụng màu mặc định
          updateCSSVariable(ACCENT_COLORS.default);
          console.log('🎨 Sử dụng màu accent mặc định:', ACCENT_COLORS.default);
        }
      } catch (error) {
        console.error('❌ Lỗi khi tải màu accent từ localStorage:', error);
        updateCSSVariable(ACCENT_COLORS.default);
      }
    };

    loadSavedColor();
  }, []);

  // Lắng nghe thay đổi localStorage từ tab khác
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'uside-accent-color' && e.newValue) {
        const colorValues = Object.values(ACCENT_COLORS);
        if (colorValues.includes(e.newValue as typeof colorValues[number])) {
          setCurrentAccentColor(e.newValue);
          updateCSSVariable(e.newValue);
          console.log('🔄 Đồng bộ màu accent từ tab khác:', e.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function để update CSS variable
  const updateCSSVariable = (color: string) => {
    document.documentElement.style.setProperty('--color-accent', color);
    document.documentElement.style.setProperty('--color-text-accent', color);
    
    // Thêm hiệu ứng chuyển đổi màu mượt mà
    document.documentElement.style.setProperty('--transition-accent', 'all 0.3s ease');
  };

  const changeAccentColor = (color: string) => {
    try {
      setCurrentAccentColor(color);
      updateCSSVariable(color);
      localStorage.setItem('uside-accent-color', color);
      console.log('✅ Đã thay đổi và lưu màu accent:', color);
    } catch (error) {
      console.error('❌ Lỗi khi lưu màu accent:', error);
    }
  };

  const resetToDefault = () => {
    try {
      changeAccentColor(ACCENT_COLORS.default);
      localStorage.removeItem('uside-accent-color');
      console.log('🔄 Đã reset về màu mặc định');
    } catch (error) {
      console.error('❌ Lỗi khi reset màu accent:', error);
    }
  };

  return (
    <AccentColorContext.Provider 
      value={{ 
        currentAccentColor, 
        changeAccentColor, 
        resetToDefault 
      }}
    >
      {children}
    </AccentColorContext.Provider>
  );
};

export default AccentColorProvider;
