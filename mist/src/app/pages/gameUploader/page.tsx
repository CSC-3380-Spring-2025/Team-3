// src/app/pages/upload-game/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";

export default function UploadGamePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [gameType, setGameType] = useState("Shoot-em up");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1) Base64-encode the code string
      const codeBase64 = btoa(unescape(encodeURIComponent(code)));

      // 2) Grab token
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to upload.");

      // 3) Call your API
      const { game } = await apiRequest("/games", {
        method: "POST",
        headers: {
          // merge with apiRequest’s Content-Type
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          gameType,
          data: codeBase64,
        }),
      });

      // 4) Redirect to the new game’s page
      router.push(`/games/${game._id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create & Upload Your Game</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter game title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Game Type</label>
          <select
            value={gameType}
            onChange={e => setGameType(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option>Shoot-em up</option>
            <option>Platformer</option>
            <option>Puzzle</option>
            <option>RPG</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">TypeScript Code</label>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full h-64 border rounded p-2 font-mono text-sm"
            placeholder="Write your game code here..."
            required
          />
        </div>

        {error && <p className="text-red-600 font-medium">Error: {error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Game"}
        </button>
      </form>
    </div>
  );
}
