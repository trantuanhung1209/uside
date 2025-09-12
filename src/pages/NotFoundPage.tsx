import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Kiểm tra xem có query parameter 'q' không
  const hasSearchQuery = searchParams.has('q');
  const searchQuery = searchParams.get('q');

  const handleGoHome = () => {
    // Lưu flag để scroll đến section 3 khi về trang chủ
    sessionStorage.setItem('homeScrollToSection', 'section-3');
    navigate("/");
  };

  const handleGoBackHome = () => {
    navigate("/");
  };
  return (
    <div className="relative flex items-start justify-center min-h-screen bg-gray-100 text-center overflow-hidden">
      {/* Cloud Mascot */}
      <motion.img
        src={hasSearchQuery ? "/images_uside/pet_cloud_404.png" : "/images_uside/pet_cloud_uside.png"}
        alt="Cloud mascot"
        className="w-100 h-100 absolute top-1/8"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 404 Text */}
      <div className="absolute top-1/2 transform">
        <motion.h1
          className="text-6xl font-bold mb-4 text-gray-800"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {hasSearchQuery ? "[404]" : "[ERROR]"}
      </motion.h1>

      <h2 className={"text-2xl font-semibold mb-6 text-gray-700" + searchQuery}>
        {hasSearchQuery 
          ? `Bzzzt... Mã bạn nhập đã bị lỗi!`
          : "Oops! Có lỗi hệ thống xảy ra!"
        }
      </h2>

      {/* Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button
          onClick={hasSearchQuery ? handleGoHome : handleGoBackHome}
          className="neumorphic-button"
        >
          {hasSearchQuery ? "Đi sửa lỗi nào!" : "Quay lại trang chủ"}
        </button>
      </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
