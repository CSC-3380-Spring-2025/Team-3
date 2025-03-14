import Link from "next/link";

export default function HomePage() {
  return (
    <div className="app-container min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="app-header">
        <div className="navbar">
          {/* Left side: Title + Slogan */}
          <div>
            <h1>ORCA INDUSTRIES</h1>
            <p className="m-0">play, program, create, collaborate</p>
          </div>
          {/* Right side: Login Link */}
          <Link href="pages/login">
            <button>Login</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="main-content flex-grow flex flex-col items-center justify-center"
      >
        {/* Heading */}
        <h2
          className="text-center mb-6"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            fontSize: "8vw",  
            lineHeight: 1.2
          }}
        >
          What pod will you join?
        </h2>

        {/* Play and Program Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/play">
            <button
              style={{
                fontSize: "3vw",   
                padding: "3vh 6vw" 
              }}
            >
              Play
            </button>
          </Link>

          <Link href="/program">
            <button
              style={{
                fontSize: "3vw",
                padding: "3vh 6vw"
              }}
            >
              Program
            </button>
          </Link>
        </div>
      </main>

      <footer className="app-footer">
  <h3>Tide Talk</h3>
  <div className="footer-images">
    <img src="/images/game1.jpg" alt="Game 1" />
    <img src="/images/game2.jpg" alt="Game 2" />
    <img src="/images/game3.jpg" alt="Game 3" />
  </div>
</footer>
    </div>
  );
}