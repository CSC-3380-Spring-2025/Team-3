"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GameUploader() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGameDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (droppedFile.type === "text/html") {
        const url = URL.createObjectURL(droppedFile);
        setPreviewUrl(url);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile?.type === "text/html") {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !thumbnail) return alert("Please upload both a game file and a thumbnail.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("thumbnail", thumbnail);

    try {
      setUploading(true);
      setProgress(25);

      const res = await fetch("/api/upload-game", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload game");

      setProgress(70);

      await fetch("/api/send-confirmation", {
        method: "POST",
        body: JSON.stringify({ email: "alexis@harveyfamilia.com", title }),
        headers: { "Content-Type": "application/json" },
      });

      setProgress(100);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/programmer-dashboard");
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Upload or email failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900 py-10 px-6">
      <header className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-900">Upload Your Game</h1>
        <Link href="/pages/programmer-dashboard">
          <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-5 py-2 rounded-full shadow-md transition">Home</button>
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
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800">Game Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your game title"
            className="border border-blue-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your game"
            className="border border-blue-300 rounded p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="border border-blue-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {thumbnail && <p className="text-green-600 font-medium">{thumbnail.name}</p>}
        </div>

        <div
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50"
          onDragOver={(e) => e.preventDefault()}
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
          <p className="text-blue-700 font-medium">Drag & Drop your game file here or click to select</p>
          {file && <p className="text-green-600">{file.name}</p>}
        </div>

        {uploading && (
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-[#fbb6ce] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white font-bold py-3 rounded-lg transition"
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
          ></iframe>
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
