"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/utils/api";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("player"); // "player" or "programmer"
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await apiRequest("/users/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });

      // Handle successful signup (e.g., redirect)
      console.log("Signup successful:", res);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

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
          {/* Right side: Link to Home or Login */}
          <Link href="/">
            <button>Home</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          {/* Error message */}
          {error && <div className="mb-4 text-red-500">{error}</div>}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Dropdown for Player or Programmer */}
            <div>
              <label htmlFor="role" className="block mb-1">
                Select Role:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="player">Player</option>
                <option value="programmer">Programmer</option>
              </select>
            </div>

            <button type="submit">Sign Up</button>
          </form>

          {/* Link to Login */}
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
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