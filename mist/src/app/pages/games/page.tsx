"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Leaderboard from "@/app/COMPONENTS/leaderboard";

const featuredGames = [
  { id: 1, title: "Memory Match", description: "Match the cards!", imageUrl: "/images/game1.jpg" },
  { id: 2, title: "Maze", description: "Find your way through the maze!", imageUrl: "/images/game2.jpg" },
  { id: 3, title: "Tetris", description: "Stack the blocks and score points!", imageUrl: "/images/game3.jpg" },
];


export default function GamesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<typeof featuredGames>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

   // if (!token || (role !== "player" && role !== "programmer" && role !== "admin")) {
     // router.push("/login");
   // }
 }, [router]);

  const toggleFavorite = (game: (typeof featuredGames)[0]) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === game.id)
        ? prev.filter((fav) => fav.id !== game.id)
        : [...prev, game]
    );
  };

  return (
    <div className="app-container min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="app-header header-font bg-blue-600 text-white p-4">
        <div className="navbar flex justify-between items-center">
          <div>
            <h1>ORCA INDUSTRIES</h1>
            <p className="m-0">Game Center</p>
          </div>
          <Link href="/">
  <button className="btn bg-[#C78EB4] hover:bg-[#b3779e] text-white font py-2 px-4 rounded transition">
    Home
  </button>
</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content flex-grow p-6">
        {/* Featured Games */}
        <section className="featured-games mb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <div key={game.id} className="border rounded p-4 shadow-sm">
                <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover mb-2" />
                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                <p className="mb-4">{game.description}</p>
                <div className="flex gap-2">
                <Link href={game.title === "Profile" ? "/profile" : `/pages/player-game${game.id}`}>
                    <button className="btn">Play Now</button>
                </Link>
                  <button onClick={() => toggleFavorite(game)} className="btn">
                    {favorites.some((fav) => fav.id === game.id) ? "Unfavorite" : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Favorite Games */}
        <section className="favorite-games mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Favorite Games</h2>
          {favorites.length === 0 ? (
            <p>You haven't favorited any games yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favorites.map((game) => (
                <div key={game.id} className="border rounded p-4 shadow-sm">
                  <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover mb-2" />
                  <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                  <p className="mb-4">{game.description}</p>
                  <div className="flex gap-2">
                    <Link href={`/pages/player-game${game.id}`}>
                      <button className="btn">Play Now</button>
                    </Link>
                    <button onClick={() => toggleFavorite(game)} className="btn">
                      Unfavorite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Leaderboard */}
        <section className="leaderboard mb-8">
          <Leaderboard gameName="All Games" />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer flex flex-col items-center justify-center p-4 bg-blue-600 text-white">
        <h3 className="text-2xl font-bold mb-2">Tide Talk</h3>
      </footer>
    </div>
  );
}