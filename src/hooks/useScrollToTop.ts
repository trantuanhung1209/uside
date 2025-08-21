import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook để tự động scroll lên đầu trang khi route thay đổi
 * với animation mượt mà
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll với behavior smooth để có animation mượt
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
};

/**
 * Hook để scroll to top ngay lập tức (không smooth)
 * Dùng cho các trường hợp cần scroll nhanh
 */
export const useScrollToTopInstant = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
};
