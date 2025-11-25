import { supabase } from '../config/supabase';

export interface Guild {
  id?: number;
  name: string;
  coin_per_month: number;
  investors: string;
  icon: string;
  color: string;
}

export interface Opportunity {
  id?: number;
  name: string;
  description: string;
  effect: number;
  icon: string;
  color: string;
  type: 'positive' | 'negative' | 'neutral';
}

// Guild Data
export const GUILDS: Guild[] = [
  {
    id: 1,
    name: 'Guild 1',
    coin_per_month: 15000,
    investors: 'Nguyen Van A',
    icon: '🥷',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    name: 'Guild 2',
    coin_per_month: 12500,
    investors: 'Nguyen Van B',
    icon: '⚔️',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'Guild 3',
    coin_per_month: 18000,
    investors: 'Nguyen Van C',
    icon: '🐉',
    color: 'from-orange-500 to-red-500',
  },
];

// Opportunities Data
export const OPPORTUNITIES: Opportunity[] = [
  // Positive Individual Events
  {
    id: 1,
    name: 'Được hoàn thuế',
    description: '+ 200 coin',
    effect: 200,
    icon: '📄',
    color: 'from-green-400 to-emerald-500',
    type: 'positive',
  },
  {
    id: 2,
    name: 'Trúng xổ số mini',
    description: '+ 100 coin',
    effect: 100,
    icon: '🎟️',
    color: 'from-green-400 to-emerald-500',
    type: 'positive',
  },
  {
    id: 3,
    name: 'Người thân gửi tặng tiền',
    description: '+ 50 coin',
    effect: 50,
    icon: '💝',
    color: 'from-green-400 to-emerald-500',
    type: 'positive',
  },
  {
    id: 4,
    name: 'Trộm tiền rơi trong hồ ước nguyện',
    description: '+ 20 coin',
    effect: 20,
    icon: '🪙',
    color: 'from-green-400 to-emerald-500',
    type: 'positive',
  },
  {
    id: 5,
    name: 'Chơi crypto đúng lúc',
    description: '+ 300 coin',
    effect: 300,
    icon: '💻',
    color: 'from-green-400 to-emerald-500',
    type: 'positive',
  },

  // Negative Individual Events
  {
    id: 6,
    name: 'Phí sửa nhà sau thiên tai',
    description: '- 100 coin',
    effect: -100,
    icon: '🏚️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 7,
    name: 'Bị phạt vì vi phạm giao thông',
    description: '- 50 coin',
    effect: -50,
    icon: '🚔',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 8,
    name: 'Thua đua ngựa',
    description: '- 200 coin',
    effect: -200,
    icon: '🐴',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 9,
    name: 'Hỏng xe',
    description: '- 50 coin',
    effect: -50,
    icon: '🚗',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 10,
    name: 'Trượt giá chứng khoán',
    description: '- 200 coin',
    effect: -200,
    icon: '📉',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 11,
    name: 'Bị trộm đột nhập',
    description: '- 50 coin',
    effect: -50,
    icon: '🔓',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 12,
    name: 'Sửa điện nước',
    description: '- 80 coin',
    effect: -80,
    icon: '🔧',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 13,
    name: 'Đóng phí bản quyền phần mềm',
    description: '- 30 coin',
    effect: -30,
    icon: '📀',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },

  // Guild Events - Positive
  {
    id: 14,
    name: 'Guild nhận tài trợ từ doanh nghiệp',
    description: '+ 300 coin',
    effect: 300,
    icon: '🤝',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },
  {
    id: 15,
    name: 'Thắng giải hackathon',
    description: '+ 200 coin',
    effect: 200,
    icon: '🏆',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },
  {
    id: 16,
    name: 'Quỹ học bổng tài trợ',
    description: '+ 200 coin',
    effect: 200,
    icon: '🎓',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },
  {
    id: 17,
    name: 'Guild nhận donate ẩn danh',
    description: '+ 30 coin',
    effect: 30,
    icon: '🎁',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },
  {
    id: 18,
    name: 'Được hỗ trợ cơ sở từ CLB khác',
    description: '+ 100 coin',
    effect: 100,
    icon: '🏢',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },
  {
    id: 19,
    name: 'Guild viral TikTok',
    description: '+ 50 coin',
    effect: 50,
    icon: '📱',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },
  {
    id: 20,
    name: 'Chính phủ hỗ trợ sửa nhà',
    description: '+ 200 coin',
    effect: 200,
    icon: '🏛️',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },

  // Guild Events - Negative
  {
    id: 21,
    name: 'Bị cắt ngân sách',
    description: '- 100 coin',
    effect: -100,
    icon: '✂️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 22,
    name: 'Mua trang thiết bị mới',
    description: '- 150 coin',
    effect: -150,
    icon: '🛠️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 23,
    name: 'Hỏng máy chủ',
    description: '- 100 coin',
    effect: -100,
    icon: '🖥️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 24,
    name: 'Mất phí bảo trì hàng tháng',
    description: '- 50 coin',
    effect: -50,
    icon: '📋',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 25,
    name: 'Mua tủ để cúp',
    description: '- 30 coin',
    effect: -30,
    icon: '🗄️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 26,
    name: 'Bị leak tin nội bộ quan trọng',
    description: '- 200 coin',
    effect: -200,
    icon: '🔒',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 27,
    name: 'Chủ tịch guild dính phốt tình ái',
    description: '- 200 coin',
    effect: -200,
    icon: '💔',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 28,
    name: 'Drama page confession',
    description: '- 20 coin',
    effect: -20,
    icon: '😱',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 29,
    name: 'Thiết bị hỏng trong sự kiện',
    description: '- 40 coin',
    effect: -40,
    icon: '⚠️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 30,
    name: 'Lỡ tay post sai thông tin',
    description: '- 20 coin',
    effect: -20,
    icon: '📝',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 31,
    name: 'Đầu tư sai lầm',
    description: '- 250 coin',
    effect: -250,
    icon: '📊',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 32,
    name: 'Thuê đất bị đánh thuế',
    description: '- 50 coin',
    effect: -50,
    icon: '🏗️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },

  // Special Guild Interactions
  {
    id: 33,
    name: 'Bán merch guild',
    description: '+ 50 coin/người',
    effect: 50,
    icon: '👕',
    color: 'from-purple-400 to-pink-500',
    type: 'positive',
  },
  {
    id: 34,
    name: 'Tài trợ thiết bị cho guild khác',
    description: '- 50 coin',
    effect: -50,
    icon: '🎁',
    color: 'from-yellow-400 to-orange-500',
    type: 'neutral',
  },
  {
    id: 35,
    name: 'Cướp khách từ guild khác',
    description: '+ 50 coin (guild kia - 50)',
    effect: 50,
    icon: '💼',
    color: 'from-purple-400 to-pink-500',
    type: 'positive',
  },
  {
    id: 36,
    name: 'Guild bị drama với guild khác',
    description: '- 50 coin',
    effect: -50,
    icon: '⚡',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
  {
    id: 37,
    name: 'Đàm phán hợp đồng thành công',
    description: '+ 50 coin từ mỗi guild',
    effect: 50,
    icon: '📜',
    color: 'from-blue-400 to-cyan-500',
    type: 'positive',
  },
  {
    id: 38,
    name: 'Tranh tài esport',
    description: '+ 100 coin (khác - 50)',
    effect: 100,
    icon: '🎮',
    color: 'from-green-400 to-emerald-500',
    type: 'positive',
  },

  // Wealth & Support Events
  {
    id: 39,
    name: 'Nhà đầu tư hỗ trợ hết mình',
    description: '+ 500 coin',
    effect: 500,
    icon: '💎',
    color: 'from-yellow-400 to-orange-500',
    type: 'positive',
  },
  {
    id: 40,
    name: 'Nâng cấp tài sản',
    description: '- 50 coin/người',
    effect: -50,
    icon: '🏗️',
    color: 'from-orange-400 to-amber-500',
    type: 'neutral',
  },
  {
    id: 41,
    name: 'Chia sẻ từ thiện',
    description: '- 20 coin/người',
    effect: -20,
    icon: '❤️',
    color: 'from-pink-400 to-rose-500',
    type: 'neutral',
  },
  {
    id: 42,
    name: 'Tổ chức team building',
    description: '- 100 coin',
    effect: -100,
    icon: '🎉',
    color: 'from-orange-400 to-amber-500',
    type: 'neutral',
  },

  // Magical/Mysterious Events
  {
    id: 43,
    name: 'Gặp được thầy bói uy tín',
    description: 'Đổi khí vận của 1 guild',
    effect: 0,
    icon: '🔮',
    color: 'from-purple-400 to-pink-500',
    type: 'neutral',
  },
  {
    id: 44,
    name: 'Săn bắn quá nhiều',
    description: 'Tất cả guild mất 10% tài sản',
    effect: 0,
    icon: '⚠️',
    color: 'from-red-400 to-rose-500',
    type: 'negative',
  },
];

/**
 * Seed guilds to Supabase
 */
export const seedGuilds = async () => {
  try {
    // Delete existing data
    await supabase.from('uside_guilds').delete().neq('id', 0);

    // Insert new data
    const { data, error } = await supabase
      .from('uside_guilds')
      .insert(GUILDS)
      .select();

    if (error) {
      console.error('Error seeding guilds:', error);
      return { success: false, error };
    }

    console.log('✅ Guilds seeded successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error seeding guilds:', error);
    return { success: false, error };
  }
};

/**
 * Seed opportunities to Supabase
 */
export const seedOpportunities = async () => {
  try {
    // Delete existing data
    await supabase.from('uside_opportunities').delete().neq('id', 0);

    // Insert new data
    const { data, error } = await supabase
      .from('uside_opportunities')
      .insert(OPPORTUNITIES)
      .select();

    if (error) {
      console.error('Error seeding opportunities:', error);
      return { success: false, error };
    }

    console.log('✅ Opportunities seeded successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error seeding opportunities:', error);
    return { success: false, error };
  }
};

/**
 * Seed all data
 */
export const seedAllData = async () => {
  try {
    console.log('🚀 Starting data seeding...');

    const guildResult = await seedGuilds();
    const opportunityResult = await seedOpportunities();

    if (guildResult.success && opportunityResult.success) {
      console.log('✅ All data seeded successfully!');
      return {
        success: true,
        guilds: guildResult.data,
        opportunities: opportunityResult.data,
      };
    } else {
      console.error('❌ Error seeding data');
      return { success: false };
    }
  } catch (error) {
    console.error('Error seeding all data:', error);
    return { success: false, error };
  }
};

/**
 * Get all guilds from Supabase
 */
export const getGuilds = async () => {
  try {
    const { data, error } = await supabase
      .from('uside_guilds')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching guilds:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching guilds:', error);
    return { success: false, error };
  }
};

/**
 * Add a new guild to Supabase
 */
export const addGuild = async (guild: Omit<Guild, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('uside_guilds')
      .insert([guild])
      .select();

    if (error) {
      console.error('Error adding guild:', error);
      return { success: false, error };
    }

    console.log('✅ Guild added successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error adding guild:', error);
    return { success: false, error };
  }
};

/**
 * Update a guild in Supabase
 */
export const updateGuild = async (id: number, guild: Partial<Guild>) => {
  try {
    console.log('📤 Sending update to Supabase:', { id, guild });
    
    const { data, error } = await supabase
      .from('uside_guilds')
      .update(guild)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating guild:', error);
      return { success: false, error };
    }

    console.log('✅ Guild updated successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error updating guild:', error);
    return { success: false, error };
  }
};

/**
 * Delete a guild from Supabase
 */
export const deleteGuild = async (id: number) => {
  try {
    const { error } = await supabase
      .from('uside_guilds')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting guild:', error);
      return { success: false, error };
    }

    console.log('✅ Guild deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('Error deleting guild:', error);
    return { success: false, error };
  }
};

/**
 * Save daily result for a guild
 */
export const saveDailyResult = async (
  guildId: number,
  guildName: string,
  investors: string | null,
  opportunityId: number | null,
  hasOpportunity: boolean,
  opportunityData?: Opportunity | null
) => {
  try {
    const today = new Date();
    const resultDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const dailyResult = {
      guild_id: guildId,
      guild_name: guildName,
      investors: investors,
      opportunity_id: opportunityId,
      result_date: resultDate,
      opportunity_name: opportunityData?.name || null,
      opportunity_description: opportunityData?.description || null,
      effect: opportunityData?.effect || null,
      icon: opportunityData?.icon || null,
      color: opportunityData?.color || null,
      has_opportunity: hasOpportunity,
    };

    const { data, error } = await supabase
      .from('uside_daily_results')
      .upsert([dailyResult], { onConflict: 'guild_id,result_date' })
      .select();

    if (error) {
      console.error('Error saving daily result:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Error saving daily result:', error);
    return { success: false, error };
  }
};

/**
 * Get daily results for today
 */
export const getTodayDailyResults = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('uside_daily_results')
      .select('*')
      .eq('result_date', today);

    if (error) {
      console.error('Error fetching daily results:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching daily results:', error);
    return { success: false, error };
  }
};

/**
 * Get daily results history for a guild
 */
export const getGuildDailyResultsHistory = async (
  guildId: number,
  days: number = 30
) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const dateStr = startDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('uside_daily_results')
      .select('*')
      .eq('guild_id', guildId)
      .gte('result_date', dateStr)
      .order('result_date', { ascending: false });

    if (error) {
      console.error('Error fetching guild daily results history:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching guild daily results history:', error);
    return { success: false, error };
  }
};
