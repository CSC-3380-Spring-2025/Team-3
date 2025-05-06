"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";

export default function LeaderboardManagerPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortField, setSortField] = useState<"score" | "date">("score");

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const data = await apiRequest("/api/leaderboard/all-scores?game_name=All Games");
        setLeaderboard(data.top_scores); 
      } catch (err) {
        console.error("Failed to load leaderboard.", err);
      }
    }
  
    fetchLeaderboard();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/leaderboard/${id}`, { method: "DELETE" });
    setLeaderboard(prev => prev.filter(entry => entry.id !== id));
  };

  const handleReset = async () => {
    await fetch("/api/leaderboard/reset", { method: "POST" });
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

  const filteredLeaderboard = leaderboard
    .filter(entry => {
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
    })
    .filter(entry => entry.player.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900 px-6 py-10">
      
      {/* Header */}
      <header className="mb-10">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold text-blue-900">Leaderboard Manager</h1>
          <a href="/pages/programmer-dashboard">
            <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-6 py-2 rounded-full shadow-md transition">
              Home
            </button>
          </a>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-blue-300 rounded w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort("score")}
            className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
          >
            Sort by Score
          </button>
          <button
            onClick={() => handleSort("date")}
            className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
          >
            Sort by Date
          </button>
          <button
            onClick={handleReset}
            className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full transition"
          >
            Reset Leaderboard
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="p-4">Player</th>
              <th className="p-4">Score</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
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
                <tr key={entry.id} className="border-t hover:bg-sky-50">
                  <td className="p-4">{entry.player}</td>
                  <td className="p-4">{entry.score}</td>
                  <td className="p-4">{entry.date}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full transition"
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
    </div>
  );
}