"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [role, setRole] = useState("player");
  // const [games, setGames] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState("");
  const router = useRouter();


  // Debugging: Log the state values
  console.log("isLoggedIn:", isLoggedIn);
  console.log("Form values:");

  console.log(email, password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Call your API and get back { token: string }
      const { token } = await apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // **Persist to localStorage**
      localStorage.setItem("token", token);

      // Optionally, decode the token if you need userData client-side
      // const payload = JSON.parse(atob(token.split(".")[1]));
      // localStorage.setItem("role", payload.role);
      setIsLoggedIn(true);
      // Optionally, set user data in localStorage

      router.push("/games"); // or wherever you want to land
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
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
          {/* {true && ()

          } */}
          {/* Right side: Link to Home */}
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