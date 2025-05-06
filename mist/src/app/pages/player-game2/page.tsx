"use client";
import React from "react";
import Link from "next/link";
import Leaderboard from "@/app/COMPONENTS/leaderboard"; 

export default function ArcadePage() {
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

      {/* Main Content*/}
      <main className="main-content flex-grow flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-6">Please Enjoy This Game!</h2>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
          {/* Game frame */}
          <iframe
            src="/game1/page"
            width="320"
            height="640"
            style={{ border: "1px solid #ccc" }}
            className="rounded-md shadow-lg"
          />

          {/* Leaderboard */}
          <div className="w-full max-w-md">
            <Leaderboard gameName="Game
            " />
          </div>
        </div>
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