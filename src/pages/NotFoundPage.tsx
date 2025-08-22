import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative flex items-start justify-center min-h-screen bg-gray-100 text-center overflow-hidden">
      {/* Cloud Mascot */}
      <motion.img
        src="/images_uside/pet_cloud_404.png"
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
          [404]
      </motion.h1>

      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Bzzzt... Lỗi hệ thống!
      </h2>

      {/* Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/"
          className="neumorphic-button"
        >
          Quay về trang chủ
        </Link>
      </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
