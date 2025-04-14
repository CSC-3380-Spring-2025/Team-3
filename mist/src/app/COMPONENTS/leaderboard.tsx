"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Score = {
  player_name: string;
  score: number;
};

export default function Leaderboard({ gameName }: { gameName: string }) {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/leaderboard/leaderboard?game_name=${gameName}`)
      .then((res) => res.json())
      .then((data) => setScores(data.top_scores));
  }, [gameName]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-center text-xl font-bold mb-4">{gameName} Leaderboard</h2>
      <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Player</th>
            <th className="py-2 px-4">Score</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {scores.map((score, i) => (
              <motion.tr
                key={`${score.player_name}-${score.score}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="border-t"
              >
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4">{score.player_name}</td>
                <td className="py-2 px-4">{score.score}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}