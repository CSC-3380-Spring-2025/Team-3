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
  const [role, setRole] = useState("player");
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
        body: JSON.stringify({ username: name, email, password, role })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Backend error response:", errorData);
        setError(errorData.message || "Sign-up failed. Please try again.");
        return;
      }
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during sign-up.");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="bg-sky-500 text-white shadow-md sticky top-0 z-50">
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
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Create Your Pod Account</h2>
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="player">Player</option>
              <option value="programmer">Programmer</option>
            </select>
            <button type="submit" className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-6 py-3 rounded-full shadow-md transition duration-300">Sign Up</button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account? <Link href="/pages/login" className="text-blue-600 hover:underline">Log In</Link>
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
