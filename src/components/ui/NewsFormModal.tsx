import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Tag,
  Image as ImageIcon,
  User,
  Calendar,
  FileText,
  Type,
} from "lucide-react";
import type { NewsFormData } from "../../services/newsService";
import type { FirestoreNewsItem } from "../../services/newsService";
import { useAccentColor } from "../../hooks/useAccentColor";
import ImageUploader from "./ImageUploader";

interface NewsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewsFormData) => Promise<void>;
  editingNews?: (FirestoreNewsItem & { id: string }) | null;
  isLoading?: boolean;
}

const NewsFormModal: React.FC<NewsFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingNews,
  isLoading = false,
}) => {
  const { currentAccentColor } = useAccentColor();

  // Helper functions for dark glass morphism styling
  const inputStyles = {
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(51, 65, 85, 0.5)",
    color: "#f1f5f9",
    boxShadow:
      "inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.1)",
  };

  const inputFocusStyles = {
    background: "rgba(30, 41, 59, 0.8)",
    border: `1px solid ${currentAccentColor}`,
    boxShadow: `inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 12px ${currentAccentColor}40`,
    outline: "none",
  };

  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Admin",
    category: "update",
    tags: [],
    pinned: false,
  });

  const [tagInput, setTagInput] = useState("");

  const categories = [
    { value: "update", label: "Cập nhật" },
    { value: "event", label: "Sự kiện" },
    { value: "announcement", label: "Thông báo" },
    { value: "tutorial", label: "Hướng dẫn" },
    { value: "news", label: "Tin tức" },
  ];

  // Load data when editing
  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title,
        excerpt: editingNews.excerpt,
        content: editingNews.content,
        image: editingNews.image || "",
        author: editingNews.author || "Admin",
        category: editingNews.category || "update",
        tags: editingNews.tags || [],
        pinned: editingNews.pinned || false,
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        author: "Admin",
        category: "update",
        tags: [],
        pinned: false,
      });
      setTagInput("");
    }
  }, [editingNews, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 transition-opacity"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal */}
        <div
          className="relative inline-block align-bottom rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 z-10"
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
              {editingNews ? "Chỉnh sửa tin tức" : "Tạo tin tức mới"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                color: "#94a3b8",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15, 23, 42, 0.7)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
              }}
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    <Type className="w-4 h-4" />
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 rounded-lg transition-all duration-300"
                    style={inputStyles}
                    onFocus={(e) => {
                      Object.assign(e.target.style, inputFocusStyles);
                    }}
                    onBlur={(e) => {
                      Object.assign(e.target.style, inputStyles);
                    }}
                    placeholder="Nhập tiêu đề tin tức..."
                    disabled={isLoading}
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    <FileText className="w-4 h-4" />
                    Tóm tắt *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    rows={3}
                    required
                    className="w-full px-3 py-2 rounded-lg resize-none transition-all duration-300"
                    style={inputStyles}
                    onFocus={(e) => {
                      Object.assign(e.target.style, inputFocusStyles);
                    }}
                    onBlur={(e) => {
                      Object.assign(e.target.style, inputStyles);
                    }}
                    placeholder="Nhập tóm tắt tin tức..."
                    disabled={isLoading}
                  />
                </div>

                {/* Image */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Hình ảnh
                  </label>
                  <ImageUploader
                    value={formData.image}
                    onChange={(url) =>
                      setFormData((prev) => ({ ...prev, image: url }))
                    }
                    onError={(error) => {
                      console.error("Image upload error:", error);
                      // You can add toast notification here if needed
                    }}
                    disabled={isLoading}
                  />
                </div>

                {/* Author */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    <User className="w-4 h-4" />
                    Tác giả
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg transition-all duration-300"
                    style={inputStyles}
                    onFocus={(e) => {
                      Object.assign(e.target.style, inputFocusStyles);
                    }}
                    onBlur={(e) => {
                      Object.assign(e.target.style, inputStyles);
                    }}
                    placeholder="Tên tác giả..."
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    <Calendar className="w-4 h-4" />
                    Danh mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg transition-all duration-300"
                    style={inputStyles}
                    onFocus={(e) => {
                      Object.assign(e.target.style, inputFocusStyles);
                    }}
                    onBlur={(e) => {
                      Object.assign(e.target.style, inputStyles);
                    }}
                    disabled={isLoading}
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-semibold mb-2"
                    style={{ color: "#94a3b8" }}
                  >
                    <Tag className="w-4 h-4" />
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-3 py-2 rounded-lg transition-all duration-300"
                      style={inputStyles}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyles);
                      }}
                      onBlur={(e) => {
                        Object.assign(e.target.style, inputStyles);
                      }}
                      placeholder="Nhập tag và nhấn Enter..."
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 text-white font-semibold cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${currentAccentColor} 0%, ${currentAccentColor}dd 100%)`,
                        boxShadow: `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-2px) scale(1.02)";
                        e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.15), 0 0 20px ${currentAccentColor}70`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`;
                      }}
                      disabled={isLoading}
                    >
                      Thêm
                    </button>
                  </div>

                  {/* Tag List */}
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-all duration-300"
                        style={{
                          background: currentAccentColor,
                          color: "#FFFFFF",
                          boxShadow: `-2px -2px 4px #FAFBFF, 2px 2px 4px rgba(22, 17, 29, 0.1), 0 0 8px ${currentAccentColor}30`,
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          disabled={isLoading}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pinned Checkbox */}
                <div className="flex items-center gap-3">
                  <label
                    className="flex items-center gap-2 cursor-pointer"
                    style={{ color: "#94a3b8" }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.pinned}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pinned: e.target.checked,
                        }))
                      }
                      className="hidden"
                      disabled={isLoading}
                    />
                    <div
                      className="w-5 h-5 rounded transition-all duration-300 flex items-center justify-center"
                      style={{
                        background: formData.pinned
                          ? currentAccentColor
                          : "rgba(15, 23, 42, 0.7)",
                        boxShadow: formData.pinned
                          ? `inset -2px -2px 4px #FAFBFF, inset 2px 2px 4px rgba(22, 17, 29, 0.1), 0 0 8px ${currentAccentColor}40`
                          : "inset -2px -2px 4px #FAFBFF, inset 2px 2px 4px rgba(22, 17, 29, 0.1)",
                      }}
                    >
                      {formData.pinned && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">Ghim tin tức</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                className="flex items-center gap-2 text-sm font-semibold mb-2"
                style={{ color: "#94a3b8" }}
              >
                <FileText className="w-4 h-4" />
                Nội dung *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                rows={8}
                required
                className="w-full px-3 py-2 rounded-lg resize-none transition-all duration-300"
                style={inputStyles}
                onFocus={(e) => {
                  Object.assign(e.target.style, inputFocusStyles);
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, inputStyles);
                }}
                placeholder="Nhập nội dung chi tiết... (Hỗ trợ HTML cơ bản)"
                disabled={isLoading}
              />
            </div>

            {/* Actions */}
            <div
              className="flex justify-end gap-3 pt-4"
              style={{
                borderTop: "1px solid rgba(51, 65, 85, 0.5)",
                marginTop: "24px",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 text-white font-semibold cursor-pointer"
                style={{
                  boxShadow: `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.15), 0 0 20px ${currentAccentColor}70`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`;
                }}
                disabled={isLoading}
              >
                <span style={{ color: "#94a3b8" }}>Hủy</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 text-white font-semibold cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${currentAccentColor} 0%, ${currentAccentColor}dd 100%)`,
                  boxShadow: `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.15), 0 0 20px ${currentAccentColor}70`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `inset -6px -6px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.1), 0 0 15px ${currentAccentColor}50`;
                }}
              >
                <Save className="w-4 h-4" />
                {isLoading
                  ? "Đang lưu..."
                  : editingNews
                  ? "Cập nhật"
                  : "Tạo mới"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsFormModal;
