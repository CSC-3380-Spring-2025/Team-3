"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/utils/api";

export default function LoginPage() {
  const [email, setEmail]       = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError]       = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      
      console.log ("data", res);
      const {token, role} = await res.json();
      console.log (token, role);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role || "player");
  
      // redirect immediately
      if (role === "programmer") {
        router.push("programmer-dashboard");
      } else {
        router.push("games");
      }
  
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50">
      <header className="bg-sky-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">ORCA INDUSTRIES</h1>
          <Link href="/">
            <button className="bg-pink-300 hover:bg-pink-400 text-white px-4 py-2 rounded-full">
              Home
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Log In to Your Pod
          </h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border rounded p-3 mb-4 focus:ring-2 focus:ring-blue-300"
          />

          <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border rounded p-3 mb-6 focus:ring-2 focus:ring-blue-300"
            />

          <button
            type="submit"
            className="w-full bg-pink-300 hover:bg-pink-400 text-white py-3 rounded-full transition"
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <Link href="/pages/home">
              <button className="text-blue-600 hover:underline">Play as Guest</button>
            </Link>
          </div>

          <p className="mt-6 text-center text-gray-700">
            Don&#39;t have an account?{' '}
            <Link href="/pages/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </main>

      <footer className="bg-sky-500 text-white text-center py-4">
        <h3 className="text-xl">Tide Talk</h3>
      </footer>
    </div>
  );
}
