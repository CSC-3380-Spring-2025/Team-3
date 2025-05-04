"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Leaderboard from "@/app/COMPONENTS/leaderboard"; 

export default function ArcadePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="app-container min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="app-header header-font">
        <div className="navbar flex justify-between items-center p-4">
          <div>
            <h1>ORCA INDUSTRIES</h1>
            <p className="m-0">play, program, create, collaborate</p>
          </div>
          <div className="flex gap-2">
            <Link href="home">
              <button className="btn">Home</button>
            </Link>
            <Link href="login">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content flex-grow flex flex-col items-center justify-center p-6">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-center text-[#4197C2] mb-4">
              Please Login to Unlock the Game!
            </h2>
            <Link href="login">
              <button className="bg-[#C78EB4] hover:bg-[#b3779e] text-white font-bold text-xl py-4 px-8 rounded transition transform hover:scale-105">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
            {/* Game Iframe */}
            <iframe
              src="/game1/page"
              width="320"
              height="640"
              style={{ border: "1px solid #ccc" }}
              className="rounded-md shadow-lg"
            />

            {/* Leaderboard */}
            <div className="w-full max-w-md">
              <Leaderboard gameName="Game" />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="app-footer flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: "#1695c3", color: "#fff", textAlign: "center" }}
      >
        <h3 className="text-2xl font-bold mb-2">Tide Talk</h3>
      </footer>
    </div>
  );
}