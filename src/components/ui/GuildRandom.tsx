import { useMemo } from "react";

interface Guild {
  id: number;
  name: string;
  coinPerMonth: number;
  investors: string;
  icon: string;
  color: string;
}

interface Opportunity {
  id: number;
  name: string;
  description: string;
  effect: number; // coin change
  icon: string;
  color: string;
  type: "positive" | "negative" | "neutral"; // for visual distinction
}

const GUILDS: Guild[] = [
  {
    id: 1,
    name: "Guild 1",
    coinPerMonth: 15000,
    investors: "Nguyen Van A",
    icon: "🥷",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "Guild 2",
    coinPerMonth: 12500,
    investors: "Nguyen Van B",
    icon: "⚔️",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Guild 3",
    coinPerMonth: 18000,
    investors: "Nguyen Van C",
    icon: "🐉",
    color: "from-orange-500 to-red-500",
  },
];

const OPPORTUNITIES: Opportunity[] = [
  // Positive Individual Events
  {
    id: 1,
    name: "Được hoàn thuế",
    description: "+ 200 coin",
    effect: 200,
    icon: "📄",
    color: "from-green-400 to-emerald-500",
    type: "positive",
  },
  {
    id: 2,
    name: "Trúng xổ số mini",
    description: "+ 100 coin",
    effect: 100,
    icon: "🎟️",
    color: "from-green-400 to-emerald-500",
    type: "positive",
  },
  {
    id: 3,
    name: "Người thân gửi tặng tiền",
    description: "+ 50 coin",
    effect: 50,
    icon: "💝",
    color: "from-green-400 to-emerald-500",
    type: "positive",
  },
  {
    id: 4,
    name: "Trộm tiền rơi trong hồ ước nguyện",
    description: "+ 20 coin",
    effect: 20,
    icon: "🪙",
    color: "from-green-400 to-emerald-500",
    type: "positive",
  },
  {
    id: 5,
    name: "Chơi crypto đúng lúc",
    description: "+ 300 coin",
    effect: 300,
    icon: "💻",
    color: "from-green-400 to-emerald-500",
    type: "positive",
  },

  // Negative Individual Events
  {
    id: 6,
    name: "Phí sửa nhà sau thiên tai",
    description: "- 100 coin",
    effect: -100,
    icon: "🏚️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 7,
    name: "Bị phạt vì vi phạm giao thông",
    description: "- 50 coin",
    effect: -50,
    icon: "🚔",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 8,
    name: "Thua đua ngựa",
    description: "- 200 coin",
    effect: -200,
    icon: "🐴",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 9,
    name: "Hỏng xe",
    description: "- 50 coin",
    effect: -50,
    icon: "🚗",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 10,
    name: "Trượt giá chứng khoán",
    description: "- 200 coin",
    effect: -200,
    icon: "📉",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 11,
    name: "Bị trộm đột nhập",
    description: "- 50 coin",
    effect: -50,
    icon: "🔓",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 12,
    name: "Sửa điện nước",
    description: "- 80 coin",
    effect: -80,
    icon: "🔧",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 13,
    name: "Đóng phí bản quyền phần mềm",
    description: "- 30 coin",
    effect: -30,
    icon: "📀",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },

  // Guild Events - Positive
  {
    id: 14,
    name: "Guild nhận tài trợ từ doanh nghiệp",
    description: "+ 300 coin",
    effect: 300,
    icon: "🤝",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },
  {
    id: 15,
    name: "Thắng giải hackathon",
    description: "+ 200 coin",
    effect: 200,
    icon: "🏆",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },
  {
    id: 16,
    name: "Quỹ học bổng tài trợ",
    description: "+ 200 coin",
    effect: 200,
    icon: "🎓",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },
  {
    id: 17,
    name: "Guild nhận donate ẩn danh",
    description: "+ 30 coin",
    effect: 30,
    icon: "🎁",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },
  {
    id: 18,
    name: "Được hỗ trợ cơ sở từ CLB khác",
    description: "+ 100 coin",
    effect: 100,
    icon: "🏢",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },
  {
    id: 19,
    name: "Guild viral TikTok",
    description: "+ 50 coin",
    effect: 50,
    icon: "📱",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },
  {
    id: 20,
    name: "Chính phủ hỗ trợ sửa nhà",
    description: "+ 200 coin",
    effect: 200,
    icon: "🏛️",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },

  // Guild Events - Negative
  {
    id: 21,
    name: "Bị cắt ngân sách",
    description: "- 100 coin",
    effect: -100,
    icon: "✂️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 22,
    name: "Mua trang thiết bị mới",
    description: "- 150 coin",
    effect: -150,
    icon: "🛠️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 23,
    name: "Hỏng máy chủ",
    description: "- 100 coin",
    effect: -100,
    icon: "🖥️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 24,
    name: "Mất phí bảo trì hàng tháng",
    description: "- 50 coin",
    effect: -50,
    icon: "📋",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 25,
    name: "Mua tủ để cúp",
    description: "- 30 coin",
    effect: -30,
    icon: "🗄️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 26,
    name: "Bị leak tin nội bộ quan trọng",
    description: "- 200 coin",
    effect: -200,
    icon: "🔒",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 27,
    name: "Chủ tịch guild dính phốt tình ái",
    description: "- 200 coin",
    effect: -200,
    icon: "💔",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 28,
    name: "Drama page confession",
    description: "- 20 coin",
    effect: -20,
    icon: "😱",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 29,
    name: "Thiết bị hỏng trong sự kiện",
    description: "- 40 coin",
    effect: -40,
    icon: "⚠️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 30,
    name: "Lỡ tay post sai thông tin",
    description: "- 20 coin",
    effect: -20,
    icon: "📝",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 31,
    name: "Đầu tư sai lầm",
    description: "- 250 coin",
    effect: -250,
    icon: "📊",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 32,
    name: "Thuê đất bị đánh thuế",
    description: "- 50 coin",
    effect: -50,
    icon: "🏗️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },

  // Special Guild Interactions
  {
    id: 33,
    name: "Bán merch guild",
    description: "+ 50 coin/người",
    effect: 50,
    icon: "👕",
    color: "from-purple-400 to-pink-500",
    type: "positive",
  },
  {
    id: 34,
    name: "Tài trợ thiết bị cho guild khác",
    description: "- 50 coin",
    effect: -50,
    icon: "🎁",
    color: "from-yellow-400 to-orange-500",
    type: "neutral",
  },
  {
    id: 35,
    name: "Cướp khách từ guild khác",
    description: "+ 50 coin (guild kia - 50)",
    effect: 50,
    icon: "💼",
    color: "from-purple-400 to-pink-500",
    type: "positive",
  },
  {
    id: 36,
    name: "Guild bị drama với guild khác",
    description: "- 50 coin",
    effect: -50,
    icon: "⚡",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
  {
    id: 37,
    name: "Đàm phán hợp đồng thành công",
    description: "+ 50 coin từ mỗi guild",
    effect: 50,
    icon: "📜",
    color: "from-blue-400 to-cyan-500",
    type: "positive",
  },
  {
    id: 38,
    name: "Tranh tài esport",
    description: "+ 100 coin (khác - 50)",
    effect: 100,
    icon: "🎮",
    color: "from-green-400 to-emerald-500",
    type: "positive",
  },

  // Wealth & Support Events
  {
    id: 39,
    name: "Nhà đầu tư hỗ trợ hết mình",
    description: "+ 500 coin",
    effect: 500,
    icon: "💎",
    color: "from-yellow-400 to-orange-500",
    type: "positive",
  },
  {
    id: 40,
    name: "Nâng cấp tài sản",
    description: "- 50 coin/người",
    effect: -50,
    icon: "🏗️",
    color: "from-orange-400 to-amber-500",
    type: "neutral",
  },
  {
    id: 41,
    name: "Chia sẻ từ thiện",
    description: "- 20 coin/người",
    effect: -20,
    icon: "❤️",
    color: "from-pink-400 to-rose-500",
    type: "neutral",
  },
  {
    id: 42,
    name: "Tổ chức team building",
    description: "- 100 coin",
    effect: -100,
    icon: "🎉",
    color: "from-orange-400 to-amber-500",
    type: "neutral",
  },

  // Magical/Mysterious Events
  {
    id: 43,
    name: "Gặp được thầy bói uy tín",
    description: "Đổi khí vận của 1 guild",
    effect: 0,
    icon: "🔮",
    color: "from-purple-400 to-pink-500",
    type: "neutral",
  },
  {
    id: 44,
    name: "Săn bắn quá nhiều",
    description: "Tất cả guild mất 10% tài sản",
    effect: 0,
    icon: "⚠️",
    color: "from-red-400 to-rose-500",
    type: "negative",
  },
];

const GuildRandom = () => {
  // Get daily opportunity based on date
  const dailyOpportunities = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        86400000
    );

    return GUILDS.map((_: Guild, index: number) => {
      // Tạo seed độc lập cho mỗi guild
      const guildSeed = dayOfYear + index * 12345;

      // 85% chance: no event (return null)
      // 15% chance: random opportunity
      const eventChance = guildSeed % 100;

      if (eventChance < 85) {
        // No event today
        return null;
      }

      // 15% chance: pick a random opportunity từ toàn bộ mảng
      const opportunityIndex = Math.abs(Math.floor((guildSeed * 7919) / 100)) % OPPORTUNITIES.length;
      return OPPORTUNITIES[opportunityIndex];
    });
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
            className="mb-6 pb-4"
            style={{ borderColor: "var(--color-accent)/30" }}
          >
            <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              ✨ Daily Guild Opportunities
            </h3>
            <p className="text-xs text-text-secondary">
              Những sự kiện hôm nay có thể thay đổi vận mệnh guild của bạn
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
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
                {GUILDS.map((guild: Guild, index: number) => (
                  <tr
                    key={guild.id}
                    className="border-b transition-all duration-300 hover:bg-accent/10 hover:shadow-lg"
                    style={{
                      borderColor: "var(--color-border)",
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

                    {/* Daily Opportunity */}
                    <td className="py-3 px-4">
                      {dailyOpportunities[index] ? (
                        <div className="space-y-2 animate-pulse-slow">
                          <div className="font-bold text-sm text-text-primary">
                            {dailyOpportunities[index].name}
                          </div>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r ${dailyOpportunities[index].color} text-white font-bold text-xs shadow-lg`}

                            style={{
                              boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                            }}
                          >
                            {dailyOpportunities[index].description}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-text-secondary font-medium">
                          ✌️ Không có gì
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
