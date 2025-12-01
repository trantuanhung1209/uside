import { useState, useEffect } from "react";
import type { DailyResult } from "../../services/dailyResultsService";
import type { Guild } from "../../services/guildService";
import {
  getTodayResults,
  subscribeToDailyResults,
  fetchAllGuilds,
} from "../../services/dailyResultsService";

const GuildRandom = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [dailyResults, setDailyResults] = useState<Record<number, DailyResult>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const guildsPerPage = 4;

  // Calculate pagination
  const totalPages = Math.ceil(guilds.length / guildsPerPage);
  const paginatedGuilds = guilds.slice(
    (currentPage - 1) * guildsPerPage,
    currentPage * guildsPerPage
  );

  // Load today's results and subscribe to realtime updates
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load today's results
        const todayResults = await getTodayResults();

        if (todayResults.length > 0) {
          const resultsMap = todayResults.reduce(
            (acc: Record<number, DailyResult>, result: DailyResult) => ({
              ...acc,
              [result.guild_id]: result,
            }),
            {}
          );
          setDailyResults(resultsMap);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();

    // Subscribe to realtime updates
    const unsubscribe = subscribeToDailyResults((result: DailyResult) => {
      setDailyResults((prev) => ({
        ...prev,
        [result.guild_id]: result,
      }));
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  // Load guilds from database
  useEffect(() => {
    const loadGuilds = async () => {
      try {
        const fetchedGuilds = await fetchAllGuilds();
        setGuilds(fetchedGuilds);
      } catch (error) {
        console.error("Error loading guilds:", error);
      }
    };

    loadGuilds();
  }, []);

  return (
    <>
      <div
        className="lg:col-span-5 rounded-3xl h-full"
        style={{
          background: "var(--color-background)",
          boxShadow: `
                  -12px -12px 24px #FAFBFF,
                  12px 12px 24px var(--color-shadow)
                `,
        }}
      >
        <div
          className="p-6 rounded-3xl h-full backdrop-blur-sm border border-accent/20"
          style={{
            background:
              "linear-gradient(135deg, var(--color-background) 0%, rgba(var(--color-accent-rgb), 0.05) 100%)",
            boxShadow: `
                  -12px -12px 24px #FAFBFF,
                  12px 12px 24px var(--color-shadow),
                  0 0 40px rgba(var(--color-accent-rgb), 0.15)
                `,
          }}
        >
          {/* Header */}
          <div
            className="mb-4 sm:mb-6 pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0"
            style={{ borderColor: "var(--color-accent)/30" }}
          >
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold mb-1 bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
                ✨ Daily Guild Opportunities
              </h3>
              <p className="text-xs text-text-secondary">
                Ngày:{" "}
                <span className="text-accent font-bold">
                  {new Date().toLocaleDateString("vi-VN")}
                </span>{" "}
                • Những sự kiện hôm nay có thể thay đổi vận mệnh guild của bạn
              </p>
            </div>

            {/* Pagination Controls */}
            {!loading && guilds.length > 0 && (
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--color-background)",
                    color:
                      currentPage === 1 ? "#94a3b8" : "var(--color-accent)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  ←
                </button>

                <span
                  className="text-xs font-semibold text-text-secondary"
                  style={{ minWidth: "35px", textAlign: "center" }}
                >
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--color-background)",
                    color:
                      currentPage === totalPages
                        ? "#94a3b8"
                        : "var(--color-accent)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            {loading ? (
              <div className="p-4 text-center text-text-secondary">
                Đang tải dữ liệu guild...
              </div>
            ) : guilds.length === 0 ? (
              <div className="p-4 text-center text-text-secondary">
                Không có guild nào
              </div>
            ) : (
              <table className="w-full min-w-max">
                <thead>
                  <tr
                    className="border-b-2 bg-gradient-to-r from-accent/10 to-blue-500/10"
                    style={{
                      borderColor: "var(--color-accent)",
                    }}
                  >
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-xs text-accent uppercase tracking-wider">
                      Guild
                    </th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-xs text-accent uppercase tracking-wider">
                      Nhà Đầu Tư
                    </th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-xs text-accent uppercase tracking-wider">
                      Độ Hiếm
                    </th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-xs text-accent uppercase tracking-wider">
                      Cơ Hội Hôm Nay
                    </th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-xs text-accent uppercase tracking-wider">
                      Dự Án
                    </th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-xs text-accent uppercase tracking-wider">
                      % Hoàn thành
                    </th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-xs text-accent uppercase tracking-wider">
                      % Lợi nhuận
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedGuilds.map((guild: Guild) => {
                    const guildId = guild.id;
                    const result = guildId ? dailyResults[guildId] : undefined;
                    const today = new Date().toISOString().split("T")[0];
                    const isOutdated = result?.result_date !== today;

                    return (
                      <tr
                        key={guildId}
                        className="border-b transition-all duration-300 hover:bg-accent/10 hover:shadow-lg"
                        style={{
                          borderColor: "var(--color-border)",
                          opacity: isOutdated ? 1 : 1,
                        }}
                      >
                        {/* Guild Name */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <div className="font-bold text-xs sm:text-sm text-text-primary group-hover:text-accent whitespace-nowrap">
                            {guild.name}
                          </div>
                        </td>

                        {/* Investors */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          {result?.investors && result.investors.length > 0 ? (
                            <div
                              className="rounded-lg p-1 sm:p-2 hover:shadow-md transition-all"
                              style={{
                                background: "var(--color-background)",
                                boxShadow: `
                                inset -2px -2px 4px #FAFBFF,
                                inset 2px 2px 4px var(--color-shadow)
                              `,
                              }}
                            >
                              <div className="text-xs text-text-secondary font-medium flex items-center gap-1 flex-wrap">
                                {result.investors && result.investors.length > 0 ? (
                                  result.investors.map((investor, idx) => (
                                    <div key={idx} className="flex items-center gap-1">
                                      <span className="font-semibold text-xs">
                                        {investor.investor_name}
                                      </span>{" "}
                                      <span
                                        className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                                        style={{
                                          backgroundColor: "#fbbf24",
                                          fontSize: "10px",
                                          boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.2), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`,
                                        }}
                                      >{`${investor.investment_coins}`}</span>
                                      {idx < (result.investors?.length ?? 0) - 1 && (
                                        <span className="text-text-secondary">-</span>
                                      )}
                                    </div>
                                  ))
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="rounded-lg p-1 sm:p-2"
                              style={{
                                background: "var(--color-background)",
                                boxShadow: `
                                inset -2px -2px 4px #FAFBFF,
                                inset 2px 2px 4px var(--color-shadow)
                              `,
                              }}
                            >
                              <p className="text-xs text-text-secondary font-medium">
                                -
                              </p>
                            </div>
                          )}
                        </td>

                        {/* Rarity */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          {result?.has_opportunity && result?.rarity ? (
                            <span
                              className="inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap"
                              style={{
                                backgroundColor:
                                  result.rarity === "common"
                                    ? "#6b7280"
                                    : result.rarity === "uncommon"
                                    ? "#22c55e"
                                    : result.rarity === "rare"
                                    ? "#3b82f6"
                                    : result.rarity === "epic"
                                    ? "#8b5cf6"
                                    : result.rarity === "legendary"
                                    ? "#f97316"
                                    : result.rarity === "mythic"
                                    ? "#ef4444"
                                    : result.rarity === "divine"
                                    ? "#fbbf24"
                                    : "#6b7280",
                                boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.2), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`,
                              }}
                            >
                              {result.rarity === "common"
                                ? "Thường"
                                : result.rarity === "uncommon"
                                ? "Không phổ biến"
                                : result.rarity === "rare"
                                ? "Hiếm"
                                : result.rarity === "epic"
                                ? "Sử thi"
                                : result.rarity === "legendary"
                                ? "Huyền thoại"
                                : result.rarity === "mythic"
                                ? "Thần thoại"
                                : result.rarity === "divine"
                                ? "Thần thánh"
                                : "Thường"}
                            </span>
                          ) : (
                            <span className="text-xs text-text-secondary">
                              -
                            </span>
                          )}
                        </td>

                        {/* Daily Opportunity from Database */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          {result?.has_opportunity &&
                          result?.opportunity_name ? (
                            <div className="space-y-1 sm:space-y-2 animate-pulse-slow">
                              <div className="font-bold text-xs sm:text-sm text-text-primary">
                                {result.opportunity_name}
                              </div>
                              <div
                                className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gradient-to-r ${result.color} text-white font-bold text-xs shadow-lg whitespace-nowrap`}
                                style={{
                                  boxShadow:
                                    "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                                }}
                              >
                                {result.icon} {result.opportunity_description}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs sm:text-sm text-text-secondary font-medium">
                              ✌️ Không có gì
                            </div>
                          )}
                        </td>

                        {/* Project Name */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          {result?.project_name ? (
                            <div
                              className="rounded-lg p-1 sm:p-2 hover:shadow-md transition-all"
                              style={{
                                background: "var(--color-background)",
                                boxShadow: `
                                inset -2px -2px 4px #FAFBFF,
                                inset 2px 2px 4px var(--color-shadow)
                              `,
                              }}
                            >
                              <p className="text-xs text-text-secondary font-bold">
                                {result.project_name}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-text-secondary">
                              -
                            </span>
                          )}
                        </td>

                        {/* Progress Percentage */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          {result?.progress !== null &&
                          result?.progress !== undefined ? (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-12 sm:w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${result.progress}%`,
                                    background:
                                      "linear-gradient(to right, var(--color-accent), #22c55e)",
                                  }}
                                />
                              </div>
                              <span className="text-xs font-bold text-text-primary whitespace-nowrap">
                                {result.progress}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-text-secondary">
                              -
                            </span>
                          )}
                        </td>

                        {/* Profit Percentage */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          {result?.profit !== null &&
                          result?.profit !== undefined ? (
                            <div className="space-y-1 sm:space-y-2">
                              {/* Overall Profit */}
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span
                                  className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold text-white whitespace-nowrap`}
                                  style={{
                                    backgroundColor:
                                      result.profit >= 0 ? "#22c55e" : "#ef4444",
                                    boxShadow: `inset -2px -2px 4px rgba(22, 17, 29, 0.2), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`,
                                  }}
                                >
                                  {result.profit >= 0 ? "📈" : "📉"}{" "}
                                  {result.profit}%
                                </span>
                              </div>

                              {/* Investor Profit Breakdown */}
                              {result?.investors && result.investors.length > 0 && (
                                <div
                                  className="rounded-lg p-1.5 sm:p-2 text-xs hover:shadow-md transition-all"
                                  style={{
                                    background: "var(--color-background)",
                                    boxShadow: `
                                    inset -2px -2px 4px #FAFBFF,
                                    inset 2px 2px 4px var(--color-shadow)
                                  `,
                                  }}
                                >
                                  <div className="space-y-0.5 sm:space-y-1">
                                    {result.investors.map((investor, idx) => {
                                      const totalReturn =
                                        investor.investment_coins *
                                        ((result.profit ?? 0)) / 100;
                                      const displayValue = Math.round(totalReturn);
                                      return (
                                        <div
                                          key={idx}
                                          className="flex items-center justify-between text-xs text-text-secondary font-medium"
                                        >
                                          <span className="font-semibold text-xs">
                                            {investor.investor_name}
                                          </span>
                                          <span
                                            className={`px-1.5 py-0.5 rounded text-white font-bold whitespace-nowrap`}
                                            style={{
                                              backgroundColor:
                                                displayValue >= 0
                                                  ? "#22c55e"
                                                  : "#ef4444",
                                            }}
                                          >
                                            (+{displayValue})
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-text-secondary">
                              -
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer Info */}
          <div
            className="mt-6 p-4 rounded-xl text-xs text-white font-semibold bg-gradient-to-r from-accent/20 to-blue-500/20 border border-accent/30"
            style={{
              boxShadow: `
                inset -4px -4px 8px #FAFBFF,
                inset 4px 4px 8px var(--color-shadow)
              `,
            }}
          >
            <p className="text-text-secondary">
              💡 Tip: Cơ hội hôm nay sẽ thay đổi mỗi ngày. Hãy quay lại và kiểm
              tra thường xuyên để không bỏ lỡ những cơ hội tốt!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuildRandom;
