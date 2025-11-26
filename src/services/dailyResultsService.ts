import { supabase } from "../config/supabase";

interface Guild {
  id: number;
  name: string;
  coin_per_month: number;
  investors: string;
  icon: string;
  color: string;
}

interface Opportunity {
  id: number;
  name: string;
  description: string;
  effect: number;
  icon: string;
  color: string;
}

export interface DailyResult {
  id?: number;
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

/**
 * Get all guilds from the database
 */
export const fetchAllGuilds = async (): Promise<Guild[]> => {
  try {
    const { data, error } = await supabase.from("uside_guilds").select("*");

    if (error) {
      console.error("Error fetching guilds:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchAllGuilds:", error);
    return [];
  }
};

/**
 * Get all opportunities from the database
 */
export const fetchAllOpportunities = async (): Promise<Opportunity[]> => {
  try {
    const { data, error } = await supabase
      .from("uside_opportunities")
      .select("*");

    if (error) {
      console.error("Error fetching opportunities:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchAllOpportunities:", error);
    return [];
  }
};

/**
 * Get today's daily results for all guilds
 */
export const getTodayResults = async (): Promise<DailyResult[]> => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("uside_daily_results")
      .select("*")
      .eq("result_date", today);

    if (error) {
      console.error("Error fetching today's results:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getTodayResults:", error);
    return [];
  }
};

/**
 * Subscribe to realtime changes in daily results with auto-refresh
 * @param callback - Function to call when changes occur
 * @param autoRefreshInterval - Interval in milliseconds to auto-refresh (default 10000ms = 10s)
 * @returns Unsubscribe function
 */
export const subscribeToDailyResults = (
  callback: (result: DailyResult) => void,
  autoRefreshInterval: number = 10000
): (() => void) => {
  const today = new Date().toISOString().split("T")[0];

  const channel = supabase
    .channel("uside_daily_results_changes")
    .on<DailyResult>(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "uside_daily_results",
        filter: `result_date=eq.${today}`,
      },
      (payload) => {
        if (payload.new) {
          callback(payload.new as DailyResult);
        }
      }
    )
    .subscribe();

  // Auto-refresh data at specified interval
  const refreshInterval = setInterval(async () => {
    try {
      const results = await getTodayResults();
      results.forEach((result) => {
        callback(result);
      });
    } catch (error) {
      console.error("Error auto-refreshing results:", error);
    }
  }, autoRefreshInterval);

  return () => {
    channel.unsubscribe();
    clearInterval(refreshInterval);
  };
};

/**
 * Get daily results for a specific date
 * @param date - Date in YYYY-MM-DD format
 */
export const getResultsByDate = async (date: string): Promise<DailyResult[]> => {
  try {
    const { data, error } = await supabase
      .from("uside_daily_results")
      .select("*")
      .eq("result_date", date)
      .order("guild_id", { ascending: true });

    if (error) {
      console.error("Error fetching results by date:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getResultsByDate:", error);
    return [];
  }
};

/**
 * Get daily results for a specific guild
 * @param guildId - Guild ID
 * @param limit - Number of recent results to fetch, default is 7
 */
export const getGuildHistory = async (
  guildId: number,
  limit: number = 7
): Promise<DailyResult[]> => {
  try {
    const { data, error } = await supabase
      .from("uside_daily_results")
      .select("*")
      .eq("guild_id", guildId)
      .order("result_date", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching guild history:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getGuildHistory:", error);
    return [];
  }
};
