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
import { supabase } from "../config/supabase";

interface Opportunity {
  id?: number;
  name: string;
  description: string;
  effect: number;
  icon?: string;
  color?: string;
  type: 'positive' | 'negative' | 'neutral';
}

const OpportunitiesManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentAccentColor } = useAccentColor();
  const { logout } = useAdminAuth();

  // State for opportunities
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load opportunities from Supabase on mount
  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('uside_opportunities')
        .select('*')
        .order('id', { ascending: true });

      if (err) {
        console.error('Error fetching opportunities:', err);
        setError("Không thể tải dữ liệu opportunities");
      } else {
        setOpportunities(data as Opportunity[]);
      }
    } catch (err) {
      console.error("Error loading opportunities:", err);
      setError("Có lỗi xảy ra khi tải opportunities");
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 8;

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
      navigate("/admin/login");
    }
  };

  const handleAddOpportunity = () => {
    setEditingOpportunity(null);
    setIsModalOpen(true);
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const handleDeleteOpportunity = async (opportunityId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa opportunity này?")) {
      try {
        setSaving(true);
        const { error: err } = await supabase
          .from('uside_opportunities')
          .delete()
          .eq('id', opportunityId);

        if (err) {
          setError("Không thể xóa opportunity");
        } else {
          setOpportunities(opportunities.filter((o) => o.id !== opportunityId));
          setError(null);
        }
      } catch (err) {
        console.error("Error deleting opportunity:", err);
        setError("Có lỗi xảy ra khi xóa opportunity");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSaveOpportunity = async (opportunityData: Opportunity) => {
    try {
      setSaving(true);
      setError(null);

      if (editingOpportunity) {
        // Update existing opportunity
        const { id: _, ...updateData } = opportunityData;
        void _;
        const { data, error: err } = await supabase
          .from('uside_opportunities')
          .update(updateData)
          .eq('id', editingOpportunity.id)
          .select();

        if (err) {
          console.error('Error updating opportunity:', err);
          setError("Không thể cập nhật opportunity");
        } else if (data && data[0]) {
          setOpportunities(
            opportunities.map((o) => (o.id === editingOpportunity.id ? data[0] : o))
          );
          setIsModalOpen(false);
          setEditingOpportunity(null);
        }
      } else {
        // Add new opportunity
        const { id: _, ...newOpportunityData } = opportunityData;
        void _;
        const { data, error: err } = await supabase
          .from('uside_opportunities')
          .insert([newOpportunityData])
          .select();

        if (err) {
          console.error('Error adding opportunity:', err);
          setError("Không thể thêm opportunity");
        } else if (data && data[0]) {
          setOpportunities([...opportunities, data[0]]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Error saving opportunity:", err);
      setError("Có lỗi xảy ra khi lưu opportunity");
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
                  Quản lý Opportunities
                </h1>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  Quản lý các sự kiện và cơ hội
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
                <p style={{ color: "#94a3b8" }}>Đang tải dữ liệu opportunities...</p>
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
                      Danh sách Opportunities
                    </h2>
                    <p style={{ color: "#94a3b8" }}>
                      {opportunities.length} sự kiện đang hoạt động{" "}
                      {saving && "(Đang xử lý...)"}
                    </p>
                  </div>

                  <button
                    onClick={handleAddOpportunity}
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
                    Thêm Opportunity
                  </button>
                </div>
              </div>
            )}

            {/* Opportunity Cards */}
            <div
              className="rounded-2xl overflow-hidden mb-8"
              style={{
                background: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(20px)",
                boxShadow: "inset -12px -12px 24px rgba(0, 0, 0, 0.4), inset 12px 12px 24px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
                  <thead style={{ background: "rgba(30, 41, 59, 0.8)" }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                        Tên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                        Mô tả
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                        Effect
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                        Loại
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ background: "rgba(15, 23, 42, 0.9)", borderColor: "rgba(255, 255, 255, 0.2)" }}>
                    {opportunities
                      .slice((currentPage - 1) * opportunitiesPerPage, currentPage * opportunitiesPerPage)
                      .map((opportunity) => (
                        <tr
                          key={opportunity.id}
                          className="transition-all duration-300"
                          style={{ background: "rgba(15, 23, 42, 0.9)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(15, 23, 42, 0.9)";
                          }}
                        >
                          <td className="px-6 py-4">
                            <span style={{ color: "#f1f5f9" }} className="text-sm font-semibold">
                              {opportunity.name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm" style={{ color: "#94a3b8" }}>
                              {opportunity.description}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white"
                              style={{
                                backgroundColor: opportunity.effect > 0 ? "#22c55e" : "#ef4444",
                                boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.2), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`,
                              }}
                            >
                              {opportunity.effect > 0 ? "+" : ""}{opportunity.effect}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white"
                              style={{
                                backgroundColor: 
                                  opportunity.type === "positive" ? "#22c55e" :
                                  opportunity.type === "negative" ? "#ef4444" :
                                  "#f59e0b",
                                boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.2), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`,
                              }}
                            >
                              {opportunity.type === "positive"
                                ? "Tích cực"
                                : opportunity.type === "negative"
                                ? "Tiêu cực"
                                : "Trung lập"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditOpportunity(opportunity)}
                                className="p-2 rounded-lg transition-all duration-300 cursor-pointer"
                                style={{
                                  background: "rgba(15, 23, 42, 0.7)",
                                  backdropFilter: "blur(8px)",
                                  border: "1px solid rgba(51, 65, 85, 0.5)",
                                  color: currentAccentColor,
                                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                                  e.currentTarget.style.transform = "translateY(-1px)";
                                  e.currentTarget.style.boxShadow = `0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 12px ${currentAccentColor}40`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.7)";
                                  e.currentTarget.style.transform = "translateY(0)";
                                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                                }}
                                title="Chỉnh sửa"
                                disabled={saving}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  opportunity.id && handleDeleteOpportunity(opportunity.id)
                                }
                                className="p-2 rounded-lg transition-all duration-300 cursor-pointer"
                                style={{
                                  background: "rgba(15, 23, 42, 0.7)",
                                  backdropFilter: "blur(8px)",
                                  border: "1px solid rgba(51, 65, 85, 0.5)",
                                  color: "#EF4444",
                                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                                  e.currentTarget.style.transform = "translateY(-1px)";
                                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 12px #EF444440";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.7)";
                                  e.currentTarget.style.transform = "translateY(0)";
                                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                                }}
                                title="Xóa"
                                disabled={saving}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
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
                length: Math.ceil(opportunities.length / opportunitiesPerPage),
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
                      Math.ceil(opportunities.length / opportunitiesPerPage),
                      currentPage + 1
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(opportunities.length / opportunitiesPerPage)
                }
                className="px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  background:
                    currentPage === Math.ceil(opportunities.length / opportunitiesPerPage)
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
        </div>
      </div>

      {/* Opportunity Form Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-start pt-[300px] justify-center z-50 px-4"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(5px)",
          }}
          onClick={() => {
            setIsModalOpen(false);
            setEditingOpportunity(null);
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
              {editingOpportunity ? "Chỉnh sửa Opportunity" : "Thêm Opportunity mới"}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const opportunityData: Opportunity = {
                  id: editingOpportunity?.id || 0,
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                  effect: parseInt(formData.get("effect") as string) || 0,
                  icon: "✨",
                  color: "from-blue-400 to-cyan-500",
                  type: formData.get("type") as 'positive' | 'negative' | 'neutral',
                };
                handleSaveOpportunity(opportunityData);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#f1f5f9" }}
                >
                  Tên Opportunity
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingOpportunity?.name}
                  placeholder="Tên sự kiện"
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
                  Mô tả
                </label>
                <input
                  type="text"
                  name="description"
                  defaultValue={editingOpportunity?.description}
                  placeholder="Ví dụ: + 200 coin"
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
                  Effect (Coin)
                </label>
                <input
                  type="number"
                  name="effect"
                  defaultValue={editingOpportunity?.effect}
                  placeholder="200"
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
                  Loại
                </label>
                <select
                  name="type"
                  defaultValue={editingOpportunity?.type || "neutral"}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#f1f5f9",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <option value="positive">Tích cực</option>
                  <option value="negative">Tiêu cực</option>
                  <option value="neutral">Trung lập</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingOpportunity(null);
                  }}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 cursor-pointer flex-1"
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
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 text-white font-semibold cursor-pointer flex-1"
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

export default OpportunitiesManagementPage;
