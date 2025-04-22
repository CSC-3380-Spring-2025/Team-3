/*login page for users to create a profile
* Components to create:
*   email, username, password, area to select if a developer or a game user
*/
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
          {/* {true && ()

          } */}
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