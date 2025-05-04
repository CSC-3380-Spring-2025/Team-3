"use client";

import Link from "next/link";
import React, { useState } from "react";
import Leaderboard from "@/app/COMPONENTS/leaderboard";

type Game = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

const featuredGames: Game[] = [
  {
    id: 1,
    title: "Game 1",
    description: "This is game 1. It’s super fun!",
    imageUrl: "/images/game1.jpg",
  },
  {
    id: 2,
    title: "Game 2",
    description: "This is game 2. It’s even more fun!",
    imageUrl: "/images/game2.jpg",
  },
  {
    id: 3,
    title: "Game 3",
    description: "This is game 3. Don’t miss out!",
    imageUrl: "/images/game3.jpg",
  },
];

export default function HomePage() {
  const [favorites, setFavorites] = useState<Game[]>([]);

  const toggleFavorite = (game: Game) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === game.id)
        ? prevFavorites.filter((fav) => fav.id !== game.id)
        : [...prevFavorites, game]
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="bg-sky-500 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 border-b border-sky-300">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">ORCA INDUSTRIES</h1>
            <p className="text-sm text-sky-100">play, program, create, collaborate</p>
          </div>
          <Link href="/pages/login">
            <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-6 py-2 rounded-full shadow-md transition duration-300">Login</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Featured Games */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <div key={game.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
                <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded mb-3" />
                <h3 className="text-xl font-bold text-sky-800 mb-1">{game.title}</h3>
                <p className="text-sky-700 flex-grow">{game.description}</p>
                <div className="flex gap-3 mt-4">
                  <Link href={`/pages/home-game${game.id}`}>
                    <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full shadow-md transition">Play Now</button>
                  </Link>
                  <button onClick={() => toggleFavorite(game)} className="bg-sky-200 hover:bg-sky-300 text-sky-800 px-4 py-2 rounded-full transition">
                    {favorites.some((fav) => fav.id === game.id) ? "Unfavorite" : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Favorite Games */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Your Favorite Games</h2>
          {favorites.length === 0 ? (
            <p className="text-center text-sky-700">You haven't favorited any games yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {favorites.map((game) => (
                <div key={game.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
                  <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded mb-3" />
                  <h3 className="text-xl font-bold text-sky-800 mb-1">{game.title}</h3>
                  <p className="text-sky-700 flex-grow">{game.description}</p>
                  <div className="flex gap-3 mt-4">
                    <Link href={`/pages/home-game${game.id}`}>
                      <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-4 py-2 rounded-full shadow-md transition">Play Now</button>
                    </Link>
                    <button onClick={() => toggleFavorite(game)} className="bg-sky-200 hover:bg-sky-300 text-sky-800 px-4 py-2 rounded-full transition">
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
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Top Scores</h2>
          <Leaderboard gameName="All Games" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-sky-500 text-white text-center py-10 border-t border-blue-200">
        <h3 className="text-2xl font-semibold mb-4">Tide Talk</h3>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {["game1.jpg", "game2.jpg", "game3.jpg"].map((img, index) => (
            <img
              key={index}
              src={`/images/${img}`}
              alt={`Game ${index + 1}`}
              className="w-32 h-32 object-cover rounded-xl shadow-md bg-white"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}