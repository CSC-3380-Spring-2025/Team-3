"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "An unexpected error occurred. Please try again.");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem("role", payload.role || "player");

      if (payload.role === "programmer") {
        router.push("/programmer-dashboard");
      } else {
        router.push("/games");
      }
    } catch (err) {
      console.error(err);
      setError("Either your email or password is incorrect. Please try again.");
    }
  };

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
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-2" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded p-2" required />
            <button type="submit">Login</button>
          </form>

          <div className="mt-4 text-center">
            <Link href="home">
              <button>Play as Guest</button>
            </Link>
          </div>

          <p className="mt-4 text-center">
            Don’t have an account? <Link href="signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}