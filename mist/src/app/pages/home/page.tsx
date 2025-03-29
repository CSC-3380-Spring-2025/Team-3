import Link from "next/link";
import React from "react";

type Game = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

// Dummy list of games for demonstration
const dummyGames: Game[] = [
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
  return (
    <div className="app-container min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="app-header">
        <div className="navbar">
          {/* Left side: Title + Slogan */}
          <div>
            <h1>ORCA INDUSTRIES</h1>
            <p className="m-0">play, program, create, collaborate</p>
          </div>
          {/* Right side: Link to Login */}
          <Link href="login">
            <button>Login</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content flex-grow p-6">
        <h2 className="text-2xl font-bold mb-6">All Games</h2>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyGames.map((game) => (
            <div key={game.id} className="border rounded p-4 shadow-sm">
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-bold mb-1">{game.title}</h3>
              <p className="mb-4">{game.description}</p>
              {/* Link to a detail/play page for each game */}
              <Link href={`/games/${game.id}`}>
                <button>Play Now</button>
              </Link>
            </div>
          ))}
        </div>
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