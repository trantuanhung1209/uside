import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-8">
      {/* Cloud Mascot */}
      <motion.img
        src="/images_uside/pet_cloud_uside.png"
        alt="Cloud mascot"
        className="w-40 h-40 drop-shadow-neumorphic mb-8 rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 404 Text */}
      <motion.h1
        className="text-6xl font-bold mb-4 text-gray-800 drop-shadow-neumorphic"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <h2 className="text-2xl font-semibold mb-2 text-gray-700">
        Không tìm thấy trang
      </h2>
      <p className="mb-6 text-gray-500 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>

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
  );
};

export default NotFoundPage;
