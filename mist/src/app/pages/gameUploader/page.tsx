"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GameUploader() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tsCode, setTsCode] = useState("");             // ← new state
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGameDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (droppedFile.type === "text/html") {
        setPreviewUrl(URL.createObjectURL(droppedFile));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected?.type === "text/html") {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(e.target.files?.[0] || null);
  };




  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please choose a game file.");
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not logged in");
      return router.push("/pages/login");
    }
  
    const gameID   = crypto.randomUUID();
    const gameType = "typescript";
  
    const formData = new FormData();
    formData.append("title",   title);
    formData.append("gameType",gameType);
    formData.append("gameID",  gameID);
    formData.append("gameFile",file);
    formData.append("tsCode",  tsCode);
  
    try {
      setUploading(true);
      setProgress(25);
  
      const createRes = await fetch(`${API_BASE}/games`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!createRes.ok) {
        const err = await createRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create game");
      }
      const { game } = await createRes.json();
      setProgress(70);
  
      const linkRes = await fetch(`${API_BASE}/users/me/games`, {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          Authorization:   `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId: game._id }),
      });
      if (!linkRes.ok) {
        const err = await linkRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to link game to user");
      }
  
      setProgress(100);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/pages/programmer-dashboard");
      }, 3000);
  
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  

  
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900 py-10 px-6">
      <header className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-900">Upload Your Game</h1>
        <Link href="/pages/programmer-dashboard">
          <button className="bg-[#fbb6ce] px-5 py-2 rounded-full shadow-md hover:bg-[#f38cb5] text-white transition">
            Home
          </button>
        </Link>
      </header>

      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-slide-in">
          Game uploaded successfully! Confirmation email sent.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl flex flex-col gap-6"
      >
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800">Game Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter your game title"
            className="border border-blue-300 rounded p-3 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your game"
            className="border border-blue-300 rounded p-3 h-24 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* TypeScript Code */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800">TypeScript Code</label>
          <textarea
            value={tsCode}
            onChange={e => setTsCode(e.target.value)}
            placeholder="Paste your game’s TS code here"
            className="border border-blue-300 rounded p-3 h-40 font-mono text-sm focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="border border-blue-300 rounded p-3 focus:ring-2 focus:ring-blue-400"
            required
          />
          {thumbnail && <p className="text-green-600">{thumbnail.name}</p>}
        </div>

        {/* Game File Drop */}
        <div
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50"
          onDragOver={e => e.preventDefault()}
          onDrop={handleGameDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".zip,.html,.js,.unity,.exe"
          />
          <p className="text-blue-700 font-medium">
            Drag &amp; Drop your game file here or click to select
          </p>
          {file && <p className="text-green-600">{file.name}</p>}
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-[#fbb6ce] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-[#fbb6ce] py-3 rounded-lg font-bold text-white hover:bg-[#f38cb5] transition"
        >
          {uploading ? "Uploading..." : "Submit Game"}
        </button>
      </form>

      {previewUrl && (
        <div className="w-full max-w-3xl mt-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Preview</h2>
          <iframe
            src={previewUrl}
            className="w-full h-[500px] border border-gray-300 rounded-lg shadow-md"
            title="Game Preview"
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
