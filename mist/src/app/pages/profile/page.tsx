"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [role, setRole] = useState("player");

  // Programmer-specific stats- dummy states 
  const [gamesCreated, setGamesCreated] = useState(5); 
  const [totalPlays, setTotalPlays] = useState(1234); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") || "player";

    if (!token) {
      router.push("/login");
    }
    setRole(storedRole);
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <button onClick={() => router.push("/")} className="btn bg-white text-green-600">
          Home
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-6 gap-6">
        {/* Profile Picture Upload */}
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Profile Picture</h2>
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
              <span className="text-gray-700">No Image</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="btn" />
        </div>

        {/* Bio Section */}
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Bio</h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full h-32 border border-gray-300 rounded p-2"
          />
        </div>

        {/* Programmer Stats (Only show if programmer) */}
        {role === "programmer" && (
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Programming Statistics</h2>
            <p><strong>Games Created:</strong> {gamesCreated}</p>
            <p><strong>Total Plays:</strong> {totalPlays}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white p-4 flex flex-col items-center">
        <p className="text-sm">ORCA INDUSTRIES © 2025</p>
      </footer>
    </div>
  );
}