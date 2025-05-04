"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const tools = [
  { id: 1, title: "Game Uploader", description: "Upload and manage your games.", imageUrl: "/images/game1.jpg" },
  { id: 2, title: "Leaderboard Manager", description: "Edit or reset game leaderboards.", imageUrl: "/images/game2.jpg" },
  { id: 3, title: "Profile", description: "View and edit your profile.", imageUrl: "/images/game3.jpg" },
];

export default function ProgrammerDashboard() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<typeof tools>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

   // if (!token || role !== "programmer") {
     // router.push("/login");
    //}
  }, [router]);

  const toggleFavorite = (tool: (typeof tools)[0]) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === tool.id)
        ? prev.filter((fav) => fav.id !== tool.id)
        : [...prev, tool]
    );
  };

  const handleOpenTool = (tool: (typeof tools)[0]) => {
    if (tool.title === "Profile") {
      router.push("/pages/profile");
    } else if (tool.title === "Game Uploader") {
      router.push("/pages/gameUploader");
    } else if (tool.title === "Leaderboard Manager") {
      router.push("/pages/leaderboard-manager"); 
    } else {
      router.push(`/programmer/${tool.id}`);
    }
  };

  return (
    <div className="app-container min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="app-header header-font bg-purple-700 text-white p-4">
  <div className="navbar flex justify-between items-center">
    <div>
      <h1>ORCA INDUSTRIES</h1>
      <p className="m-0">Programmer Dashboard</p>
    </div>
    <Link href="/">
  <button className="btn bg-[#C78EB4] hover:bg-[#b3779e] text-white font py-2 px-4 rounded">
    Home
  </button>
</Link>
  </div>
</header>

      {/* Main */}
      <main className="main-content flex-grow p-6">
        {/* Available Tools */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="border rounded p-4 shadow-sm">
                <img src={tool.imageUrl} alt={tool.title} className="w-full h-48 object-cover mb-2" />
                <h3 className="text-xl font-bold mb-1">{tool.title}</h3>
                <p className="mb-4">{tool.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenTool(tool)} className="btn">Open</button>
                  <button onClick={() => toggleFavorite(tool)} className="btn">
                    {favorites.some((fav) => fav.id === tool.id) ? "Unfavorite" : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Favorite Tools */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Favorite Tools</h2>
          {favorites.length === 0 ? (
            <p>You haven't favorited any tools yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favorites.map((tool) => (
                <div key={tool.id} className="border rounded p-4 shadow-sm">
                  <img src={tool.imageUrl} alt={tool.title} className="w-full h-48 object-cover mb-2" />
                  <h3 className="text-xl font-bold mb-1">{tool.title}</h3>
                  <p className="mb-4">{tool.description}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenTool(tool)} className="btn">Open</button>
                    <button onClick={() => toggleFavorite(tool)} className="btn">Unfavorite</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer flex flex-col items-center justify-center p-4 bg-purple-700 text-white">
        <h3 className="text-2xl font-bold mb-2">Tide Talk</h3>
      </footer>
    </div>
  );
}