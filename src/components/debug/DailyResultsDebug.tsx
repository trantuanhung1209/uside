import { useState } from "react";
import type { DailyResult } from "../../services/dailyResultsService";
import {
  getTodayResults,
  getResultsByDate,
  getGuildHistory,
} from "../../services/dailyResultsService";

const DailyResultsDebug = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DailyResult[]>([]);
  const [selectedGuildId, setSelectedGuildId] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleGetTodayResults = async () => {
    setLoading(true);
    try {
      const todayResults = await getTodayResults();
      setResults(todayResults);
      console.log("Today results:", todayResults);
    } catch (error) {
      console.error("Error fetching today results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetResultsByDate = async () => {
    setLoading(true);
    try {
      const dateResults = await getResultsByDate(selectedDate);
      setResults(dateResults);
      console.log(`Results for ${selectedDate}:`, dateResults);
    } catch (error) {
      console.error("Error fetching results by date:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetGuildHistory = async () => {
    setLoading(true);
    try {
      const history = await getGuildHistory(selectedGuildId, 7);
      setResults(history);
      console.log(`Guild ${selectedGuildId} history:`, history);
    } catch (error) {
      console.error("Error fetching guild history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Daily Results Debug Panel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Get Today Results */}
        <div className="p-4 bg-gray-800 rounded">
          <h3 className="font-bold mb-2">Get Today's Results</h3>
          <button
            onClick={handleGetTodayResults}
            disabled={loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded"
          >
            {loading ? "Loading..." : "Load Today's Results"}
          </button>
          <p className="text-sm text-gray-400 mt-2">
            Fetch results for today's date
          </p>
        </div>

        {/* Get Results by Date */}
        <div className="p-4 bg-gray-800 rounded">
          <h3 className="font-bold mb-2">Get Results by Date</h3>
          <div className="space-y-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
            <button
              onClick={handleGetResultsByDate}
              disabled={loading}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded"
            >
              {loading ? "Loading..." : "Get Results"}
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Fetch results for a specific date
          </p>
        </div>

        {/* Get Guild History */}
        <div className="p-4 bg-gray-800 rounded">
          <h3 className="font-bold mb-2">Get Guild History</h3>
          <div className="space-y-2">
            <input
              type="number"
              value={selectedGuildId}
              onChange={(e) => setSelectedGuildId(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="Guild ID"
              min="1"
            />
            <button
              onClick={handleGetGuildHistory}
              disabled={loading}
              className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 rounded"
            >
              {loading ? "Loading..." : "Get History"}
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Fetch last 7 days of results for a guild
          </p>
        </div>
      </div>

      {/* Results Display */}
      <div className="mt-6">
        <h3 className="font-bold mb-2">Results ({results.length})</h3>
        <div className="bg-gray-800 rounded p-4 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
              {JSON.stringify(results, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">No results yet. Click a button above to load data.</p>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-900 rounded">
        <h4 className="font-bold mb-2">How it works:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>Results are fetched from the uside_daily_results table</li>
          <li>The GuildRandom component subscribes to realtime updates</li>
          <li>Changes are broadcast to all connected clients instantly</li>
          <li>Data auto-refreshes every 10 seconds</li>
        </ul>
      </div>
    </div>
  );
};

export default DailyResultsDebug;
