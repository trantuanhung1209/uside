import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccentColor } from "../hooks";
import { useAdminAuth } from "../hooks/useAdminAuth";
import {
  ArrowLeft,
  LogOut,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";
import GuildRandom from "../components/ui/GuildRandom";
import {
  getGuilds,
  addGuild,
  updateGuild,
  deleteGuild,
} from "../services/guildService";

interface Guild {
  id: number;
  name: string;
  coin_per_month: number;
  investors: string;
  icon: string;
  color: string;
  members?: number;
  established?: string;
}

const GuildManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentAccentColor } = useAccentColor();
  const { logout } = useAdminAuth();

  // State for guilds
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load guilds from Supabase on mount
  useEffect(() => {
    loadGuilds();
  }, []);

  const loadGuilds = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getGuilds();

      if (result.success && result.data) {
        setGuilds(result.data as Guild[]);
      } else {
        setError("Không thể tải dữ liệu guild");
      }
    } catch (err) {
      console.error("Error loading guilds:", err);
      setError("Có lỗi xảy ra khi tải guild");
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuild, setEditingGuild] = useState<Guild | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const guildsPerPage = 4;

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
      navigate("/admin/login");
    }
  };

  const handleAddGuild = () => {
    setEditingGuild(null);
    setIsModalOpen(true);
  };

  const handleEditGuild = (guild: Guild) => {
    setEditingGuild(guild);
    setIsModalOpen(true);
  };

  const handleDeleteGuild = async (guildId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa guild này?")) {
      try {
        setSaving(true);
        const result = await deleteGuild(guildId);

        if (result.success) {
          setGuilds(guilds.filter((g) => g.id !== guildId));
          setError(null);
        } else {
          setError("Không thể xóa guild");
        }
      } catch (err) {
        console.error("Error deleting guild:", err);
        setError("Có lỗi xảy ra khi xóa guild");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSaveGuild = async (guildData: Guild) => {
    try {
      setSaving(true);
      setError(null);

      if (editingGuild) {
        // Update existing guild - remove id before sending to update function
        const { id, ...updateData } = guildData;
        void id; // Explicitly mark as intentionally unused
        console.log('🔄 Updating guild:', { id: editingGuild.id, updateData });
        const result = await updateGuild(editingGuild.id, updateData);

        if (result.success && result.data && result.data[0]) {
          // Update the local state with the returned data from Supabase
          setGuilds(
            guilds.map((g) => (g.id === editingGuild.id ? result.data[0] : g))
          );
          setIsModalOpen(false);
          setEditingGuild(null);
          console.log('✅ Guild updated successfully in DB:', result.data[0]);
        } else {
          console.error('❌ Update failed:', result.error);
          setError("Không thể cập nhật guild");
        }
      } else {
        // Add new guild - let Supabase auto-generate ID
        const { id, ...newGuildData } = guildData;
        void id; // Explicitly mark as intentionally unused
        const result = await addGuild(newGuildData as Omit<Guild, "id">);

        if (result.success && result.data && result.data[0]) {
          setGuilds([...guilds, result.data[0]]);
          setIsModalOpen(false);
          setEditingGuild(null);
        } else {
          setError("Không thể thêm guild");
        }
      }
    } catch (err) {
      console.error("Error saving guild:", err);
      setError("Có lỗi xảy ra khi lưu guild");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Navigation Header */}
        <div
          className="py-6 px-4 border-b"
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="p-2 rounded-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(30, 41, 59, 0.8)",
                  color: "#f1f5f9",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow:
                    "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                  Quản lý Guilds
                </h1>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  Quản lý các guild và sự kiện
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(30, 41, 59, 0.8)",
                  color: "#fca5a5",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  boxShadow:
                    "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                }}
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Loading or Error State */}
            {error && (
              <div
                className="rounded-2xl p-6 mb-8 text-center"
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <p style={{ color: "#fca5a5" }}>{error}</p>
              </div>
            )}

            {loading && (
              <div
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "rgba(15, 23, 42, 0.9)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="loading-spinner mx-auto mb-4"></div>
                <p style={{ color: "#94a3b8" }}>Đang tải dữ liệu guild...</p>
              </div>
            )}

            {/* Action Bar */}
            {!loading && (
              <div
                className="rounded-2xl p-6 mb-8"
                style={{
                  background: "rgba(15, 23, 42, 0.9)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2
                      className="text-xl font-bold mb-2"
                      style={{ color: "#f1f5f9" }}
                    >
                      Danh sách Guilds
                    </h2>
                    <p style={{ color: "#94a3b8" }}>
                      {guilds.length} guild đang hoạt động{" "}
                      {saving && "(Đang xử lý...)"}
                    </p>
                  </div>

                  <button
                    onClick={handleAddGuild}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, ${currentAccentColor} 0%, ${currentAccentColor}dd 100%)`,
                      boxShadow: `inset -4px -4px 8px rgba(0, 0, 0, 0.3), 0 0 12px ${currentAccentColor}40`,
                    }}
                    onMouseEnter={(e) => {
                      if (!saving) {
                        e.currentTarget.style.transform =
                          "translateY(-2px) scale(1.02)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!saving) {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";
                      }
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    Thêm Guild
                  </button>
                </div>
              </div>
            )}

            {/* Guild Cards */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {guilds
                  .slice((currentPage - 1) * guildsPerPage, currentPage * guildsPerPage)
                  .map((guild) => (
                    <div
                      key={guild.id}
                      className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group"
                      style={{
                        background: "rgba(15, 23, 42, 0.9)",
                        backdropFilter: "blur(20px)",
                        boxShadow:
                          "inset -8px -8px 16px rgba(0, 0, 0, 0.4), inset 8px 8px 16px rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {/* Header */}
                      <div
                        className="p-4 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${guild.color}30 0%, ${guild.color}15 100%)`,
                          borderBottom: `1px solid ${guild.color}40`,
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                              style={{
                                background: `${guild.color}40`,
                                border: `2px solid ${guild.color}60`,
                              }}
                            >
                              {guild.icon}
                            </div>
                            <h3
                              className="text-base font-bold truncate"
                              style={{ color: "#f1f5f9" }}
                            >
                              {guild.name}
                            </h3>
                          </div>
                          {/* Action Icons */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditGuild(guild);
                              }}
                              className="p-1.5 rounded-lg transition-all duration-300 cursor-pointer"
                              style={{
                                background: "rgba(15, 23, 42, 0.7)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(51, 65, 85, 0.5)",
                                color: currentAccentColor,
                                boxShadow:
                                  "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(30, 41, 59, 0.8)";
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = `0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 12px ${currentAccentColor}40`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(15, 23, 42, 0.7)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                              }}
                              title="Chỉnh sửa"
                              disabled={saving}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm("Bạn có chắc chắn muốn xóa guild này?")) {
                                  handleDeleteGuild(guild.id);
                                }
                              }}
                              className="p-1.5 rounded-lg transition-all duration-300 cursor-pointer"
                              style={{
                                background: "rgba(15, 23, 42, 0.7)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(51, 65, 85, 0.5)",
                                color: "#EF4444",
                                boxShadow:
                                  "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(30, 41, 59, 0.8)";
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow =
                                  "0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 12px #EF444440";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(15, 23, 42, 0.7)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                              }}
                              title="Xóa"
                              disabled={saving}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p
                          className="text-xs truncate"
                          style={{ color: "#94a3b8" }}
                        >
                          {guild.investors}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <div className="mb-3">
                          <p
                            style={{ color: "#94a3b8" }}
                            className="text-xs mb-1"
                          >
                            Coin/Tháng
                          </p>
                          <p
                            className="text-lg font-bold"
                            style={{ color: "#f1f5f9" }}
                          >
                            {guild.coin_per_month}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    background: currentPage === 1 ? "rgba(94, 109, 130, 0.5)" : "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  ← Trước
                </button>

                {Array.from({
                  length: Math.ceil(guilds.length / guildsPerPage),
                }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className="w-10 h-10 rounded-lg transition-all cursor-pointer font-semibold"
                    style={{
                      background:
                        currentPage === index + 1
                          ? currentAccentColor
                          : "rgba(30, 41, 59, 0.8)",
                      color: "#f1f5f9",
                      border: `1px solid ${
                        currentPage === index + 1
                          ? currentAccentColor
                          : "rgba(255, 255, 255, 0.1)"
                      }`,
                    }}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        Math.ceil(guilds.length / guildsPerPage),
                        currentPage + 1
                      )
                    )
                  }
                  disabled={
                    currentPage === Math.ceil(guilds.length / guildsPerPage)
                  }
                  className="px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    background:
                      currentPage === Math.ceil(guilds.length / guildsPerPage)
                        ? "rgba(94, 109, 130, 0.5)"
                        : "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  Tiếp →
                </button>
              </div>
            </div>

            {/* Guild Random Component */}
            <div
              className="rounded-2xl p-8 mt-5"
              style={{
                background: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "#f1f5f9" }}
              >
                Sự kiện hôm nay
              </h2>
              <GuildRandom />
            </div>
          </div>
        </div>
      </div>
      {/* Guild Form Modal (Simple modal for demonstration) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-start pt-[300px] justify-center z-50 px-4"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(5px)",
          }}
          onClick={() => {
            setIsModalOpen(false);
            setEditingGuild(null);
          }}
        >
          <div
            className="rounded-2xl p-8 max-w-md w-full"
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "#f1f5f9" }}
            >
              {editingGuild ? "Chỉnh sửa Guild" : "Thêm Guild mới"}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const guildData = {
                  id: editingGuild?.id || 0,
                  name: formData.get("name") as string,
                  coin_per_month:
                    parseInt(formData.get("coin_per_month") as string) || 0,
                  investors: formData.get("investors") as string,
                  icon: editingGuild?.icon || "🥷",
                  color: editingGuild?.color || "from-purple-500 to-pink-500",
                };
                handleSaveGuild(guildData);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Tên Guild
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingGuild?.name}
                  placeholder="Guild name"
                  required
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Coin/Tháng
                </label>
                <input
                  type="number"
                  name="coin_per_month"
                  defaultValue={editingGuild?.coin_per_month}
                  placeholder="15000"
                  required
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Nhà đầu tư
                </label>
                <input
                  type="text"
                  name="investors"
                  defaultValue={editingGuild?.investors}
                  placeholder="Nguyen Van A"
                  required
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingGuild(null);
                  }}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -6px -6px 12px rgba(0, 0, 0, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor =
                      currentAccentColor + "40";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "inset -4px -4px 8px rgba(0, 0, 0, 0.3), inset 4px 4px 8px rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
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
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GuildManagementPage;
