/*login page for users to create a profile
* Components to create:
*   email, username, password, area to select if a developer or a game user
*/
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "WOMP WOMP WOMP. spam it again.");
        return;
      }


      router.push("/");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred du-- faskdhfasdkfjasdfsd;fjasdlkfja.");
    }
  };

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
          {/* Right side: Link to Home */}
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            {/* Login button uses global .button style */}
            <button type="submit">Login</button>
          </form>

          {/* Play as Guest Button */}
          <div className="mt-4 text-center">
          <Link href="home">
              <button>Play as Guest</button>
            </Link>
          </div>

          {/* Sign Up Link */}
          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link href="signup" className="text-blue-600 hover:underline">
              Sign Up
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