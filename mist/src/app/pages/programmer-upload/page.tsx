"use client"

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function GameUploader() {
  const router = useRouter();

  const [user, setUser] = useState<{ id: string; role: string } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  console.log("🔥 GameUploader rendered on the client");
  console.log("→ user", user);
  console.log("→ user.role", user?.role);

  // 1) On mount, check token + grab user info
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       return router.push("/login");
  //     }

  //     try {
  //       const res = await fetch(`${API_BASE}/api/users/me`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //         },
  //       });
  //       if (!res.ok) throw new Error("Not authorized");

  //       const { user } = await res.json();
  //       console.log("→ user", user);
  //       console.log("→ user.role", user.role);
  //       setUser(user);
  //       console.log("→ user", user);
  //       console.log("→ user.role", user.role);

  //       // if not a programmer, bounce back
  //       if (user.role !== "programmer") {
  //         router.replace("/pages/games");
  //       }
  //     } catch {
  //       router.replace("/pages/login");
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  // 2) On submit, include both token and userId
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return alert("Still loading user info…");
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    console.log("→ formData", formData);
    console.log("→ file", file);
    console.log("→ title", title);
    console.log("→ description", description);
    console.log("→ userId", user.id);
    console.log("→ token", token);
    console.log("→ user", user);
    console.log("→ user.role", user.role);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", user.id);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch(`${API_BASE}/api/games/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }

      alert("Game uploaded successfully!");
      router.push("/programmer-dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Upload Your Game
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg mx-auto bg-white p-6 rounded shadow"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Game Title"
          className="border border-gray-300 rounded p-2"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Game Description"
          className="border border-gray-300 rounded p-2 h-32"
          required
        />

        <input
          type="file"
          accept=".zip,.html"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border border-gray-300 rounded p-2"
          required
        />

        <button
          type="submit"
          className="btn bg-purple-700 text-white py-2 rounded"
        >
          Upload Game
        </button>
      </form>
    </div>
  );
}
