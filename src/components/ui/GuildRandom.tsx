import { useMemo, useState, useEffect, useCallback } from "react";
import { getGuilds, OPPORTUNITIES } from "../../services/guildService";
import { supabase } from "../../config/supabase";

interface Guild {
  id: number;
  name: string;
  coin_per_month: number;
  investors: string;
  icon: string;
  color: string;
}

interface DailyResult {
  id: number;
  guild_id: number;
  guild_name: string;
  opportunity_id: number | null;
  result_date: string;
  opportunity_name: string | null;
  opportunity_description: string | null;
  effect: number | null;
  icon: string | null;
  color: string | null;
  has_opportunity: boolean;
}

const GuildRandom = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [dailyResults, setDailyResults] = useState<Record<number, DailyResult>>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const guildsPerPage = 4;

  // Load guilds from Supabase on mount
  useEffect(() => {
    const loadGuilds = async () => {
      try {
        const result = await getGuilds();
        if (result.success && result.data) {
          setGuilds(result.data as Guild[]);
        }
      } catch (err) {
        console.error("Error loading guilds:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGuilds();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('uside_guilds_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'uside_guilds'
        },
        (payload) => {
          console.log('Guild changed:', payload);
          // Reload guilds on any change
          loadGuilds();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load today's daily results from database
  useEffect(() => {
    const loadDailyResults = async () => {
      const { getTodayDailyResults: getResultsFn } = await import("../../services/guildService");
      const result = await getResultsFn();
      
      if (result.success && result.data) {
        // Convert array to map by guild_id for quick lookup
        const resultsMap = (result.data as DailyResult[]).reduce((acc, item) => {
          acc[item.guild_id] = item;
          return acc;
        }, {} as Record<number, DailyResult>);
        setDailyResults(resultsMap);
      }
    };

    loadDailyResults();

    // Subscribe to changes in daily results
    const subscription = supabase
      .channel('daily_results_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'uside_daily_results'
        },
        (payload) => {
          console.log('Daily results changed:', payload);
          // Reload daily results on any change
          loadDailyResults();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Paginate guilds
  const paginatedGuilds = useMemo(() => {
    const startIndex = (currentPage - 1) * guildsPerPage;
    return guilds.slice(startIndex, startIndex + guildsPerPage);
  }, [guilds, currentPage]);

  const totalPages = Math.ceil(guilds.length / guildsPerPage);

  // Save daily results to database for ALL guilds
  const saveDailyResults = useCallback(async () => {
    if (guilds.length === 0) return;

    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        86400000
    );

    const { saveDailyResult: saveFn } = await import("../../services/guildService");

    // Calculate opportunities for ALL guilds, not just paginated ones
    for (let i = 0; i < guilds.length; i++) {
      const guild = guilds[i];
      const originalIndex = i;
      const guildSeed = dayOfYear + originalIndex * 12345;
      const eventChance = guildSeed % 100;

      let opportunity = null;
      if (eventChance >= 85) {
        const opportunityIndex = Math.abs(Math.floor((guildSeed * 7919) / 100)) % OPPORTUNITIES.length;
        opportunity = OPPORTUNITIES[opportunityIndex];
      }

      await saveFn(
        guild.id,
        guild.name,
        opportunity?.id || null,
        !!opportunity,
        opportunity || null
      );
    }
  }, [guilds]);

  // Save daily results when guilds load
  useEffect(() => {
    if (guilds.length === 0 || loading) return;

    saveDailyResults().catch(err => 
      console.error("Error saving daily results:", err)
    );
  }, [saveDailyResults, loading, guilds.length]);

  // Auto-refresh results at 00:00 every day
  useEffect(() => {
    const scheduleNextRefresh = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const timeUntilMidnight = tomorrow.getTime() - now.getTime();

      console.log(`Next refresh scheduled in ${Math.floor(timeUntilMidnight / 1000 / 60)} minutes`);

      const timeout = setTimeout(async () => {
        console.log('🌙 Refreshing daily results at midnight...');
        // Reload guilds to trigger recalculation with new day's seed
        const result = await getGuilds();
        if (result.success && result.data) {
          setGuilds(result.data as Guild[]);
        }
        // Schedule next refresh
        scheduleNextRefresh();
      }, timeUntilMidnight);

      return timeout;
    };

    const timeoutId = scheduleNextRefresh();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div
        className="lg:col-span-4 rounded-3xl h-full"
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
            className="mb-6 pb-4 flex items-start justify-between"
            style={{ borderColor: "var(--color-accent)/30" }}
          >
            <div>
              <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
                ✨ Daily Guild Opportunities
              </h3>
              <p className="text-xs text-text-secondary">
                Ngày: <span className="text-accent font-bold">{new Date().toLocaleDateString('vi-VN')}</span> • Những sự kiện hôm nay có thể thay đổi vận mệnh guild của bạn
              </p>
            </div>

            {/* Pagination Controls */}
            {!loading && guilds.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--color-background)",
                    color: currentPage === 1 ? "#94a3b8" : "var(--color-accent)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  ←
                </button>

                <span className="text-xs font-semibold text-text-secondary" style={{ minWidth: "40px", textAlign: "center" }}>
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--color-background)",
                    color: currentPage === totalPages ? "#94a3b8" : "var(--color-accent)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-4 text-center text-text-secondary">
                Đang tải dữ liệu guild...
              </div>
            ) : guilds.length === 0 ? (
              <div className="p-4 text-center text-text-secondary">
                Không có guild nào
              </div>
            ) : (
            <table className="w-full">
              <thead>
                <tr
                  className="border-b-2 bg-gradient-to-r from-accent/10 to-blue-500/10"
                  style={{
                    borderColor: "var(--color-accent)",
                  }}
                >
                  <th className="text-left py-3 px-4 font-bold text-xs text-accent uppercase tracking-wider">
                    Guild
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-xs text-accent uppercase tracking-wider">
                    Nhà Đầu Tư
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-xs text-accent uppercase tracking-wider">
                    Cơ Hội Hôm Nay
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedGuilds.map((guild: Guild) => {
                  const result = dailyResults[guild.id];
                  const today = new Date().toISOString().split('T')[0];
                  const isOutdated = result?.result_date !== today;
                  
                  return (
                    <tr
                      key={guild.id}
                      className="border-b transition-all duration-300 hover:bg-accent/10 hover:shadow-lg"
                      style={{
                        borderColor: "var(--color-border)",
                        opacity: isOutdated ? 0.6 : 1,
                      }}
                    >
                      {/* Guild Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-sm text-text-primary group-hover:text-accent">
                          {guild.name}
                        </div>
                      </td>

                      {/* Investors */}
                      <td className="py-3 px-4">
                        <div
                          className="rounded-lg p-2 hover:shadow-md transition-all"
                          style={{
                            background: "var(--color-background)",
                            boxShadow: `
                              inset -2px -2px 4px #FAFBFF,
                              inset 2px 2px 4px var(--color-shadow)
                            `,
                          }}
                        >
                          <p className="text-xs text-text-secondary font-medium">
                            {guild.investors}
                          </p>
                        </div>
                      </td>

                      {/* Daily Opportunity from Database */}
                      <td className="py-3 px-4">
                        {result?.has_opportunity && result?.opportunity_name ? (
                          <div className="space-y-2 animate-pulse-slow">
                            <div className="font-bold text-sm text-text-primary">
                              {result.opportunity_name}
                            </div>
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r ${result.color} text-white font-bold text-xs shadow-lg`}
                              style={{
                                boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                              }}
                            >
                              {result.opportunity_description}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-text-secondary font-medium">
                            ✌️ Không có gì
                          </div>
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
