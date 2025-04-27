"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GameUploader() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch("/api/upload-game", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Game uploaded successfully!");
        router.push("/programmer-dashboard"); 
      } else {
        throw new Error("Failed to upload game");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading game.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Upload Your Game</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto bg-white p-6 rounded shadow">
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

        <button type="submit" className="btn bg-purple-700 text-white py-2 rounded">
          Upload Game
        </button>
      </form>
    </div>
  );
}