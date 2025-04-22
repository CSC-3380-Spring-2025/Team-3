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

  console.log(name, email, password)

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

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Backend error response:", errorData); // 👈 this line
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
    <div className="app-container min-h-screen w-full flex flex-col">
      <header className="app-header">
        <div className="navbar">
          <div>
            <h1>ORCA INDUSTRIES</h1>
            <p className="m-0">play, program, create, collaborate</p>
          </div>
          <Link href="/">
            <button>Home</button>
          </Link>
        </div>
      </header>

      <main className="main-content flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          {error && <div className="mb-4 text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full border rounded p-2" required />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-2" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded p-2" required />
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full border rounded p-2" required />
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full border rounded p-2">
              <option value="player">Player</option>
              <option value="programmer">Programmer</option>
            </select>
            <button type="submit">Sign Up</button>
          </form>

          <p className="mt-4 text-center">
            Already have an account? <Link href="login" className="text-blue-600 hover:underline">Log In</Link>
          </p>
        </div>
      </main>
    </div>
  );
}