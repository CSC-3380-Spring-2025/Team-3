"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-gray-900 bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50">
      {/* Header */}
      <header className="bg-sky-500 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 border-b border-sky-300">
          <div className="flex items-center gap-4">
            <img src="/images/orca-logo.png" alt="Orca Logo" className="w-10 h-10 object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
            <div>
              <h1 className="text-3xl font-extrabold tracking-wide">ORCA INDUSTRIES</h1>
              <p className="text-sm text-sky-100">play, program, create, collaborate</p>
            </div>
          </div>
          <Link href="/pages/login">
            <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-6 py-2 rounded-full shadow-md transition duration-300">Login</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-6 text-center">
        <h2 className="text-5xl sm:text-6xl font-bold text-blue-900 mb-6 font-serif">What pod will you join?</h2>
        <p className="max-w-2xl text-lg text-blue-800 mb-12">Dive into a digital ocean of creativity and collaboration. Whether you're a player seeking adventure or a programmer building the next wave of innovation, there's a pod waiting for you.</p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/pages/login">
            <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-10 py-4 text-xl rounded-full shadow-lg transition-all duration-300">Play</button>
          </Link>
          <Link href="/pages/login">
            <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-10 py-4 text-xl rounded-full shadow-lg transition-all duration-300">Program</button>
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16 px-8 sm:px-16 lg:px-32 text-center">
        <h3 className="text-4xl font-semibold text-blue-900 mb-8">Why Join ORCA?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-6 bg-sky-50 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2 text-sky-700">For Players</h4>
            <p className="text-sky-900">Enjoy curated games and challenges, track your performance, and join seasonal competitions to prove your skills.</p>
          </div>
          <div className="p-6 bg-sky-50 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2 text-sky-700">For Programmers</h4>
            <p className="text-sky-900">Upload your creations, share source code, and collaborate with others. Build your resume through meaningful code projects.</p>
          </div>
          <div className="p-6 bg-sky-50 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2 text-sky-700">For Everyone</h4>
            <p className="text-sky-900">ORCA is a place to grow, whether you're just learning to code or ready to publish full games. You belong here.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-sky-100 py-20 px-6 sm:px-12 lg:px-24">
        <h3 className="text-4xl font-semibold text-center text-blue-900 mb-12">Platform Features</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <li className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold text-sky-800 mb-2">Manage Profile</h4>
            <p className="text-sm text-sky-700">Customize your profile, update bio, display projects, and showcase achievements to other users.</p>
          </li>
          <li className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold text-sky-800 mb-2">Game Stats Dashboard</h4>
            <p className="text-sm text-sky-700">View personal performance metrics, win/loss history, game rankings, and progress over time.</p>
          </li>
          <li className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold text-sky-800 mb-2">Upload Games for Review</h4>
            <p className="text-sm text-sky-700">Submit your game for community testing and moderator approval before going live.</p>
          </li>
          <li className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold text-sky-800 mb-2">Tournaments</h4>
            <p className="text-sm text-sky-700">Compete tournaments against users across the globe.</p>
          </li>
          <li className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold text-sky-800 mb-2">Game Library</h4>
            <p className="text-sm text-sky-700">Browse, filter, and explore all games available on the platform by genre, rating, or author.</p>
          </li>
          <li className="bg-white rounded-xl shadow p-6">
            <h4 className="text-lg font-semibold text-sky-800 mb-2">Favorites System</h4>
            <p className="text-sm text-sky-700">Save and bookmark your favorite games, creators, or pods to quickly access them later.</p>
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold text-blue-800 mb-6">Ready to dive in?</h3>
        <p className="text-md text-blue-700 mb-10 max-w-2xl mx-auto">
          Whether you’re coding, competing, or just curious — your pod is waiting. Join now and let your creativity surface.
        </p>
        <Link href="/pages/login">
          <button className="bg-[#fbb6ce] hover:bg-[#f38cb5] text-white px-10 py-3 text-lg rounded-full shadow-md transition-all duration-300">
            Start Your Journey
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-sky-500 text-white text-center py-10 border-t border-blue-200">
        <h3 className="text-2xl font-semibold mb-4">Tide Talk</h3>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {["game1.jpg", "game2.jpg", "game3.jpg"].map((img, index) => (
            <img
              key={index}
              src={`/images/${img}`}
              alt={`Game ${index + 1}`}
              className="w-32 h-32 object-cover rounded-xl shadow-md bg-white"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
