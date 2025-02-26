// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Welcome to Game Platform</h1>
        <p className="text-lg text-gray-600 mt-2">
          Create, play, and share your browser-based video games.
        </p>
      </header>

      <main className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Browse Games</h2>
          {/* This is a placeholder for the list of available games.
              As you progress, replace this with your dynamic game list component */}
          <p className="text-gray-500">
            No games available yet. Start by creating your first game!
          </p>
        </section>
      </main>

      <footer className="mt-12 text-gray-400">
        <p>&copy; {new Date().getFullYear()} Game Platform</p>
      </footer>
    </div>
  );
}
