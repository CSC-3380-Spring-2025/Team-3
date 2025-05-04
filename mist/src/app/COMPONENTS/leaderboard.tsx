"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Score = {
  player_name: string;
  score: number;
  _id?: string;
};

export default function Leaderboard({ gameName }: { gameName: string }) {
  const [scores, setScores] = useState<Score[]>([]);
  const [allScores, setAllScores] = useState<Score[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedInUser(localStorage.getItem("username"));
    }

    // Get top 10 for display
    fetch(`http://localhost:5000/api/leaderboard/leaderboard?game_name=${gameName}`)
      .then((res) => res.json())
      .then((data) => setScores(data.top_scores || []));

    // Get all scores to calculate rank
    fetch(`http://localhost:5000/api/leaderboard/all-scores?game_name=${gameName}`)
      .then((res) => res.json())
      .then((data: Score[]) => {
        setAllScores(data);
        const sorted = data.sort((a, b) => b.score - a.score);
        const index = sorted.findIndex((s) => s.player_name === localStorage.getItem("username"));
        if (index !== -1) setUserRank(index + 1);
      });
  }, [gameName]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-center text-xl font-bold mb-4">{gameName} Leaderboard</h2>

      <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Player</th>
            <th className="py-2 px-4">Score</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {scores.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4">No scores yet.</td>
              </tr>
            )}
            {scores.map((score, i) => (
              <motion.tr
                key={score._id ?? `${score.player_name}-${score.score}-${i}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className={
                  score.player_name === loggedInUser
                    ? "bg-yellow-100 font-bold"
                    : ""
                }
              >
                <td className="py-2 px-4">{score.player_name}</td>
                <td className="py-2 px-4">{score.score}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {loggedInUser && userRank && (
        <div className="text-center text-sm text-gray-600">
          You are currently ranked <span className="font-bold text-black">{userRank}</span> in {gameName}!
        </div>
      )}
    </div>
  );
}