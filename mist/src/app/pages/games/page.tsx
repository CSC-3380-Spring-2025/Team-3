"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Leaderboard from "@/app/COMPONENTS/leaderboard";
import { apiRequest } from "@/utils/api";

const featuredGames = [
  { id: 1, title: "Memory Match", description: "Match the cards!", 
    //imageUrl: "/images/game1.jpg" 
  },
  { id: 2, title: "Maze", description: "Find your way through the maze!", 
    //imageUrl: "/images/game2.jpg" 
  },
  { id: 3, title: "Tetris", description: "Stack the blocks and score points!", 
    //imageUrl: "/images/game3.jpg" 
  },
];

export default function GamesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<typeof featuredGames>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //   async function checkAuth() {
  //     const token = localStorage.getItem("token");
  //     console.log("→ checkAuth token:", token);

  //     if (!token) return router.push("/login");
  
  //     try {
  //       const res = await fetch("http://localhost:5000/api/users/me", {
  //         headers: { 
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`
  //         }
  //       });
  //       if (!res.ok) throw new Error("Not authorized");
  
  //       const data = await res.json();            // ← parse JSON
  //       if (data.user.role === "pages/programmer") {
  //         // programmers get their own dashboard
  //         return router.replace("pages/programmer-dashboard");
  //       }
  //       // otherwise it’s a player, and we stay on /games
  //     } catch {
  //       router.replace("pages/login");
  //     }
  //   }
  //   checkAuth();
  // }, [router]);
  

  const toggleFavorite = (game: (typeof featuredGames)[0]) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === game.id)
        ? prev.filter((fav) => fav.id !== game.id)
        : [...prev, game]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/pages/login");
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="bg-sky-500 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 border-b border-sky-300">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">ORCA INDUSTRIES</h1>
            <p className="text-sm text-sky-100">Game Center</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-[#fbb6ce] text-white px-4 py-2 rounded-full shadow-md transition"
            >
              ☰
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden z-50">
                <Link href="/">
                  <div className="px-4 py-2 hover:bg-sky-100 cursor-pointer">Home</div>
                </Link>
                <Link href="/pages/profile">
                  <div className="px-4 py-2 hover:bg-sky-100 cursor-pointer">Profile</div>
                </Link>
                <Link href="/pages/settings">
                  <div className="px-4 py-2 hover:bg-sky-100 cursor-pointer">Settings</div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-sky-100 cursor-pointer">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Featured Games */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <div key={game.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
            {/* <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded mb-3" /> */}
                <h3 className="text-xl font-bold text-sky-800 mb-1">{game.title}</h3>
                <p className="text-sky-700 flex-grow">{game.description}</p>
                <div className="flex gap-3 mt-4">
                  <Link href={`/pages/player-game${game.id}`}>
                    <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full shadow-md transition">Play Now</button>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(game)}
                    className="bg-sky-200 hover:bg-sky-300 text-sky-800 px-4 py-2 rounded-full transition"
                  >
                    {favorites.some((fav) => fav.id === game.id) ? "Unfavorite" : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Favorite Games */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">Your Favorite Games</h2>
          {favorites.length === 0 ? (
            <p className="text-center text-sky-700">You haven't favorited any games yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {favorites.map((game) => (
                <div key={game.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
                  {/* <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded mb-3" /> */}
                  <h3 className="text-xl font-bold text-sky-800 mb-1">{game.title}</h3>
                  <p className="text-sky-700 flex-grow">{game.description}</p>
                  <div className="flex gap-3 mt-4">
                    <Link href={`/pages/player-game${game.id}`}>
                      <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full shadow-md transition">Play Now</button>
                    </Link>
                    <button
                      onClick={() => toggleFavorite(game)}
                      className="bg-sky-200 hover:bg-sky-300 text-sky-800 px-4 py-2 rounded-full transition"
                    >
                      Unfavorite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Leaderboard */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">Top Scores</h2>
          <Leaderboard gameName="All Games" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-sky-500 text-white text-center py-10 border-t border-blue-200">
        <h3 className="text-2xl font-semibold">Tide Talk</h3>
      </footer>
    </div>
  );
}
