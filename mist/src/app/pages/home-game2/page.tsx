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
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="bg-sky-500 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 border-b border-sky-300">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">ORCA INDUSTRIES</h1>
            <p className="text-sm text-sky-100">play, program, create, collaborate</p>
          </div>
          <div className="flex gap-3">
            <Link href="/pages/home">
              <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-5 py-2 rounded-full shadow-md transition">Home</button>
            </Link>
            <Link href="/pages/login">
              <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-5 py-2 rounded-full shadow-md transition">Login</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-4">
              Please Login to Unlock the Game!
            </h2>
            <Link href="/pages/login">
              <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white font-semibold text-lg py-3 px-6 rounded-full shadow-md transition transform hover:scale-105">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-center w-full max-w-7xl">
            {/* Game Iframe */}
            <div className="flex justify-center items-center w-full max-w-md">
              <iframe
                src="/game1/page"
                width="320"
                height="640"
                className="rounded-lg shadow-lg border border-gray-300"
                title="Game Iframe"
              />
            </div>

            {/* Leaderboard */}
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Leaderboard</h3>
              <Leaderboard gameName="Game" />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-sky-500 text-white text-center py-10 border-t border-blue-200">
        <h3 className="text-2xl font-semibold">Tide Talk</h3>
      </footer>
    </div>
  );
}
