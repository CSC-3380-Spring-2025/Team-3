"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GameUploader() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      setUploading(true);
      setProgress(30); // Fake start

      const res = await fetch("/api/upload-game", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload game");

      setProgress(70);

      await fetch("/api/send-confirmation", {
        method: "POST",
        body: JSON.stringify({ email: "alexis@harveyfamilia.com", title }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProgress(100);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/programmer-dashboard");
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Error uploading game or sending confirmation email.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center relative">
      {/* Slide-in Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-slide-in transition">
          Game uploaded successfully! Confirmation email sent.
        </div>
      )}

      <h1 className="text-4xl font-bold text-[#4197C2] mb-8">Upload Your Game</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6"
      >
        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-[#4197C2]">Game Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your game title"
            className="border border-blue-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#4197C2]"
            required
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-[#4197C2]">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your game"
            className="border border-blue-300 rounded p-3 h-32 focus:outline-none focus:ring-2 focus:ring-[#4197C2]"
            required
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-[#4197C2]">Upload Game File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border border-blue-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#4197C2]"
            required
          />
          {file && (
            <p className="text-green-600 font-medium mt-2">
              Selected File: {file.name}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-[#C78EB4] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-[#C78EB4] hover:bg-[#b3779e] text-white font-bold py-3 rounded-lg transition"
        >
          {uploading ? "Uploading..." : "Submit Game"}
        </button>
      </form>

      {/* Animation CSS */}
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