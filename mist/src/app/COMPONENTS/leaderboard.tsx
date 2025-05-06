"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";

type Score = {
  _id?:        string;
  player_name: string;
  score:       number;
};

export default function Leaderboard({ gameName }: { gameName: string }) {
  const [allScores, setAllScores] = useState<Score[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameName) return;

    async function loadScores() {
      try {
        const body = await apiRequest(
          `/api/leaderboard/all-scores?game_name=${encodeURIComponent(gameName)}`
        );
        setAllScores(Array.isArray(body) ? body : body.top_scores);
      } catch (e: any) {
        console.error("Leaderboard error:", e);
        setError("Failed to load scores.");
      }
    }

    loadScores();
  }, [gameName]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <ul>
      {allScores.map((s) => (
        <li key={s._id}>
          {s.player_name}: {s.score}
        </li>
      ))}
    </ul>
  );
}