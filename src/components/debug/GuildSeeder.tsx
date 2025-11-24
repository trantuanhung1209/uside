import React, { useState } from 'react';
import { seedAllData, seedGuilds, seedOpportunities } from '../../services/guildService';

const GuildSeeder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSeedGuilds = async () => {
    setLoading(true);
    setMessage('Đang tải dữ liệu Guild...');
    const result = await seedGuilds();
    setLoading(false);

    if (result.success) {
      setMessage(`✅ Đã tải ${result.data?.length || 0} Guild thành công!`);
      setIsSuccess(true);
    } else {
      setMessage(`❌ Lỗi: Không thể tải Guild`);
      setIsSuccess(false);
    }
  };

  const handleSeedOpportunities = async () => {
    setLoading(true);
    setMessage('Đang tải dữ liệu Opportunities...');
    const result = await seedOpportunities();
    setLoading(false);

    if (result.success) {
      setMessage(`✅ Đã tải ${result.data?.length || 0} Opportunities thành công!`);
      setIsSuccess(true);
    } else {
      setMessage(`❌ Lỗi: Không thể tải Opportunities`);
      setIsSuccess(false);
    }
  };

  const handleSeedAll = async () => {
    setLoading(true);
    setMessage('Đang tải tất cả dữ liệu...');
    const result = await seedAllData();
    setLoading(false);

    if (result.success) {
      setMessage(
        `✅ Đã tải thành công! Guilds: ${result.guilds?.length}, Opportunities: ${result.opportunities?.length}`
      );
      setIsSuccess(true);
    } else {
      setMessage(`❌ Lỗi: Không thể tải dữ liệu`);
      setIsSuccess(false);
    }
  };

  return (
    <div className="p-8 bg-slate-900 rounded-2xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Guild Data Seeder</h2>

      <div className="space-y-4">
        <button
          onClick={handleSeedGuilds}
          disabled={loading}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          {loading ? 'Đang xử lý...' : 'Tải Guilds'}
        </button>

        <button
          onClick={handleSeedOpportunities}
          disabled={loading}
          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
        >
          {loading ? 'Đang xử lý...' : 'Tải Opportunities'}
        </button>

        <button
          onClick={handleSeedAll}
          disabled={loading}
          className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
        >
          {loading ? 'Đang xử lý...' : 'Tải Tất Cả'}
        </button>
      </div>

      {message && (
        <div
          className={`mt-6 p-4 rounded-lg text-sm font-semibold ${
            isSuccess
              ? 'bg-green-900/30 text-green-300 border border-green-500/50'
              : 'bg-red-900/30 text-red-300 border border-red-500/50'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default GuildSeeder;
