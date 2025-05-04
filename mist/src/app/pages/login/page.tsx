"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isGameUser, setIsGameUser] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(res.token);
      setUserId(res.userId);
      setUserName(res.userName);
      setUserType(res.userType);
      setIsLoggedIn(true);
      setIsDeveloper(res.isDeveloper);
      setIsGameUser(res.isGameUser);
      setIsGuest(res.isGuest);

      const data = await res.json();
      localStorage.setItem("token", data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem("role", payload.role || "player");
      router.push(payload.role === "programmer" ? "/programmer-dashboard" : "/games");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="bg-[#567c8d] text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 border-b border-sky-300">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">ORCA INDUSTRIES</h1>
            <p className="text-sm text-sky-100">play, program, create, collaborate</p>
          </div>
          <Link href="/">
            <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-6 py-2 rounded-full shadow-md transition duration-300">Home</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Log In to Your Pod</h2>
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
            <button type="submit" className="bg-[#c08081] hover:bg-[#ebc7c4] text-white px-6 py-3 rounded-full shadow-md transition duration-300">Login</button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/pages/home">
              <button className="text-blue-600 underline hover:text-blue-800">Play as Guest</button>
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account? <Link href="/pages/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-sky-500 text-white text-center py-6 border-t border-blue-200">
        <h3 className="text-xl font-semibold">Tide Talk</h3>
      </footer>
    </div>
  );
}