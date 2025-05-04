"use client";
import { useState } from "react";

const fakeLeaderboard = [
  { id: 1, player: "Alexis", score: 1200, date: "2025-04-25" },
  { id: 2, player: "Julian", score: 950, date: "2025-04-22" },
  { id: 3, player: "Mirina", score: 870, date: "2025-03-29" },
  { id: 4, player: "Jack", score: 600, date: "2025-04-01" },
  { id: 5, player: "Aaroh", score: 1500, date: "2025-04-26" },
];

export default function LeaderboardManagerPage() {
  const [leaderboard, setLeaderboard] = useState(fakeLeaderboard);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortField, setSortField] = useState<"score" | "date">("score");

  const handleDelete = (id: number) => {
    setLeaderboard(prev => prev.filter(entry => entry.id !== id));
  };

  const handleReset = () => {
    setLeaderboard([]);
  };

  const handleSort = (field: "score" | "date") => {
    setSortField(field);
    setLeaderboard(prev =>
      [...prev].sort((a, b) => {
        if (field === "score") return b.score - a.score;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    );
  };

  const filteredLeaderboard = leaderboard.filter(entry => {
    if (filter === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(entry.date) >= sevenDaysAgo;
    }
    if (filter === "30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(entry.date) >= thirtyDaysAgo;
    }
    return true;
  }).filter(entry => entry.player.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4197C2]">Leaderboard Manager</h1>
        <button
          onClick={handleReset}
          className="bg-[#C78EB4] hover:bg-[#b3779e] text-white font-bold py-2 px-4 rounded"
        >
          Reset Leaderboard
        </button>
      </header>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-[#4197C2] rounded w-60"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-[#4197C2] rounded"
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort("score")}
            className="bg-[#4197C2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sort by Score
          </button>
          <button
            onClick={() => handleSort("date")}
            className="bg-[#4197C2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sort by Date
          </button>
        </div>
      </div>

      <table className="w-full bg-white rounded shadow-md">
        <thead className="bg-[#4197C2] text-white">
          <tr>
            <th className="p-3 text-left">Player</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaderboard.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-6 text-gray-500">
                No scores available.
              </td>
            </tr>
          ) : (
            filteredLeaderboard.map(entry => (
              <tr key={entry.id} className="border-t">
                <td className="p-3">{entry.player}</td>
                <td className="p-3">{entry.score}</td>
                <td className="p-3">{entry.date}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="bg-[#C78EB4] hover:bg-[#b3779e] text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}