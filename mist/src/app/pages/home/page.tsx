"use client";
import Link from "next/link";
import React, { useState } from "react";

type Game = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

// Dummy list of featured games
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

// Dummy list of user uploaded games
const userUploadedGames: Game[] = [
  {
    id: 4,
    title: "User Game 1",
    description: "A cool game uploaded by a user.",
    imageUrl: "/images/usergame1.jpg",
  },
  {
    id: 5,
    title: "User Game 2",
    description: "Another creative game from our community.",
    imageUrl: "/images/usergame2.jpg",
  },
];

export default function HomePage() {
  const [favorites, setFavorites] = useState<Game[]>([]);

  // Toggle favorite status of a game
  const toggleFavorite = (game: Game) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === game.id)
        ? prevFavorites.filter((fav) => fav.id !== game.id)
        : [...prevFavorites, game]
    );
  };

  return (
    <div className="app-container min-h-screen w-full flex flex-col">
      {/* Header with custom font */}
      <header className="app-header header-font">
        <div className="navbar flex justify-between items-center p-4">
          {/* Left side: Title + Slogan */}
          <div>
            <h1>ORCA INDUSTRIES</h1>
            <p className="m-0">play, program, create, collaborate</p>
          </div>
          {/* Right side: Link to Home */}
          <Link href="login">
            <button className="btn">Login</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content flex-grow p-6">
        {/* Featured Games Section */}
        <section className="featured-games mb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <div key={game.id} className="border rounded p-4 shadow-sm">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                <p className="mb-4">{game.description}</p>
                <div className="flex gap-2">
                  <Link href={`/games/${game.id}`}>
                    <button className="btn">Play Now</button>
                  </Link>
                  <button onClick={() => toggleFavorite(game)} className="btn">
                    {favorites.some((fav) => fav.id === game.id)
                      ? "Unfavorite"
                      : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Favorite Games Section */}
        <section className="favorite-games mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Favorite Games</h2>
          {favorites.length === 0 ? (
            <p>You haven't favorited any games yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favorites.map((game) => (
                <div key={game.id} className="border rounded p-4 shadow-sm">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                  <p className="mb-4">{game.description}</p>
                  <div className="flex gap-2">
                    <Link href={`/games/${game.id}`}>
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

        {/* User Uploaded Games Section */}
        <section className="user-uploaded-games">
          <h2 className="text-2xl font-bold mb-6">User Uploaded Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userUploadedGames.map((game) => (
              <div key={game.id} className="border rounded p-4 shadow-sm">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                <p className="mb-4">{game.description}</p>
                <div className="flex gap-2">
                  <Link href={`/games/${game.id}`}>
                    <button className="btn">Play Now</button>
                  </Link>
                  <button onClick={() => toggleFavorite(game)} className="btn">
                    {favorites.some((fav) => fav.id === game.id)
                      ? "Unfavorite"
                      : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="app-footer flex flex-col items-center justify-center p-4"
        style={{
          backgroundColor: "#1695c3",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h3 className="text-2xl font-bold mb-2">Tide Talk</h3>
        <div className="flex justify-between w-full max-w-3xl gap-4">
          <img
            src="/images/game1.jpg"
            alt="Game 1"
            className="w-1/4 h-auto object-cover"
          />
          <img
            src="/images/game2.jpg"
            alt="Game 2"
            className="w-1/4 h-auto object-cover"
          />
          <img
            src="/images/game3.jpg"
            alt="Game 3"
            className="w-1/4 h-auto object-cover"
          />
        </div>
      </footer>
    </div>
  );
}