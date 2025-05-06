"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";
import Link from "next/link";

const tools = [
  { id: 1, title: "Game Uploader", description: "Upload and manage your games.", imageUrl: "/images/game1.jpg" },
  { id: 2, title: "Leaderboard Manager", description: "Edit or reset game leaderboards.", imageUrl: "/images/game2.jpg" },
  { id: 3, title: "Profile", description: "View and edit your profile.", imageUrl: "/images/game3.jpg" },
];

export default function ProgrammerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<typeof tools>([]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await apiRequest("/api/users/me"); 
        if (data.user.role !== "programmer") {
          router.push("/pages/login");
        } else {
          setLoading(false); 
        }
      } catch (err) {
        router.push("/pages/login");
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="text-center mt-10 text-blue-800">Loading dashboard...</div>;
  }

  const toggleFavorite = (tool: (typeof tools)[0]) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === tool.id)
        ? prev.filter((fav) => fav.id !== tool.id)
        : [...prev, tool]
    );
  };

  const handleOpenTool = (tool: (typeof tools)[0]) => {
    if (tool.title === "Profile") router.push("/pages/profile");
    else if (tool.title === "Game Uploader") router.push("/pages/gameUploader");
    else if (tool.title === "Leaderboard Manager") router.push("/pages/leaderboard-manager");
    else router.push(`/programmer/${tool.id}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="bg-sky-500 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 border-b border-sky-300">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">ORCA INDUSTRIES</h1>
            <p className="text-sm text-sky-100">Programmer Dashboard</p>
          </div>
          <Link href="/">
            <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-6 py-2 rounded-full shadow-md transition duration-300">Home</button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow p-6">
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">Your Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
                <img src={tool.imageUrl} alt={tool.title} className="w-full h-48 object-cover rounded mb-3" />
                <h3 className="text-xl font-bold text-sky-800 mb-1">{tool.title}</h3>
                <p className="text-sky-700 flex-grow">{tool.description}</p>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => handleOpenTool(tool)} className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full shadow-md transition">Open</button>
                  <button onClick={() => toggleFavorite(tool)} className="bg-sky-200 hover:bg-sky-300 text-sky-800 px-4 py-2 rounded-full transition">
                    {favorites.some((fav) => fav.id === tool.id) ? "Unfavorite" : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">Favorite Tools</h2>
          {favorites.length === 0 ? (
            <p className="text-center text-sky-700">You haven't favorited any tools yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {favorites.map((tool) => (
                <div key={tool.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
                  <img src={tool.imageUrl} alt={tool.title} className="w-full h-48 object-cover rounded mb-3" />
                  <h3 className="text-xl font-bold text-sky-800 mb-1">{tool.title}</h3>
                  <p className="text-sky-700 flex-grow">{tool.description}</p>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => handleOpenTool(tool)} className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full shadow-md transition">Open</button>
                    <button onClick={() => toggleFavorite(tool)} className="bg-sky-200 hover:bg-sky-300 text-sky-800 px-4 py-2 rounded-full transition">Unfavorite</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-sky-500 text-white text-center py-10 border-t border-blue-200">
        <h3 className="text-2xl font-semibold">Tide Talk</h3>
      </footer>
    </div>
  );
}
