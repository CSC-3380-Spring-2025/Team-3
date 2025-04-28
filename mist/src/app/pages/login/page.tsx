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


  // Debugging: Log the state values
  console.log("isLoggedIn:", isLoggedIn);
  console.log("isDeveloper:", isDeveloper);
  console.log("isGameUser:", isGameUser);
  console.log("isGuest:", isGuest);
  console.log("Form values:");

  console.log(email, password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Handle successful login (e.g., save token, redirect)
      console.log("Login successful:", res);
      setToken(res.token);
      setUserId(res.userId);
      setUserName(res.userName);
      setUserType(res.userType);
      setIsLoggedIn(true);
      setIsDeveloper(res.isDeveloper);
      setIsGameUser(res.isGameUser);
      setIsGuest(res.isGuest);
      console.log("User ID:", res.userId);
      console.log("User Name:", res.userName);
      console.log("User Type:", res.userType);
      console.log("Token:", res.token);
      console.log("isLoggedIn:", isLoggedIn);
      console.log("isDeveloper:", isDeveloper);
      console.log("isGameUser:", isGameUser);
      console.log("isGuest:", isGuest);      

      localStorage.setItem("token", res.token);

      const payload = JSON.parse(atob(res.token.split('.')[1]));
      localStorage.setItem("role", payload.role || "player");

      if (payload.role === "programmer") {
        router.push("programmer-dashboard");
      } else {
        router.push("home");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again..");
      }
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