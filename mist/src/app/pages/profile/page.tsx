"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [role, setRole] = useState(() => localStorage.getItem("role") || "player");
  const [gamesCreated, setGamesCreated] = useState(5);
  const [totalPlays, setTotalPlays] = useState(1234);
  const [favoriteGenre, setFavoriteGenre] = useState("Puzzle");
  const [email, setEmail] = useState("user@example.com");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") || "player";
    setRole(storedRole);
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="bg-sky-500 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 border-b border-sky-300">
          <h1 className="text-3xl font-extrabold tracking-wide">Your Profile</h1>
          <button
            onClick={() => router.push("/pages/programmer-dashboard")}
            className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-6 py-2 rounded-full shadow-md transition"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-4 py-10 gap-10">
        {/* Profile Card */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Profile Overview</h2>
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-pink-300" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-4 text-blue-700">
              No Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-[#fbb6ce] text-white px-4 py-2 rounded-full shadow-md cursor-pointer hover:bg-[#f38cb5] transition mb-4"
          />
          <p className="text-sm text-gray-600 mb-2">{email}</p>
          <p className="text-sm text-gray-600">Role: <strong>{role}</strong></p>
        </div>

        {/* Bio Card */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Bio</h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full h-32 border border-blue-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Extra Preferences */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Game Preferences</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Genre</label>
          <select
            value={favoriteGenre}
            onChange={(e) => setFavoriteGenre(e.target.value)}
            className="w-full border border-blue-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Puzzle">Puzzle</option>
            <option value="Strategy">Strategy</option>
            <option value="Action">Action</option>
            <option value="Arcade">Arcade</option>
          </select>
        </div>

        {/* Stats Card */}
        {role === "programmer" && (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Programming Stats</h2>
            <p className="text-gray-700 mb-2"><strong>Games Created:</strong> {gamesCreated}</p>
            <p className="text-gray-700"><strong>Total Plays:</strong> {totalPlays}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-sky-500 text-white text-center py-10 border-t border-blue-200">
        <h3 className="text-xl font-semibold">ORCA INDUSTRIES © 2025</h3>
      </footer>
    </div>
  );
}
