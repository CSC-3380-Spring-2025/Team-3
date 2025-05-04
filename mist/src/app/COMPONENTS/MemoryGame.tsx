"use client";

import { useState, useEffect } from "react";

const symbols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MemoryGamePage() {
  const [board, setBoard] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean[]>(Array(20).fill(false));
  const [matched, setMatched] = useState<boolean[]>(Array(20).fill(false));
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameActive, setGameActive] = useState(false);
  const [gameMessage, setGameMessage] = useState("");

  useEffect(() => {
    const shuffled = shuffle([...symbols, ...symbols]);
    setBoard(shuffled);
    setGameActive(true);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameMessage("Time up! You lose!");
          setGameActive(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (index: number) => {
    if (!gameActive || visible[index] || matched[index]) return;

    const newVisible = [...visible];
    newVisible[index] = true;
    setVisible(newVisible);

    if (firstSelection === null) {
      setFirstSelection(index);
    } else {
      setMoves((prev) => prev + 1);
      if (board[firstSelection] === board[index]) {
        const newMatched = [...matched];
        newMatched[firstSelection] = true;
        newMatched[index] = true;
        setMatched(newMatched);
        setFirstSelection(null);

        if (newMatched.every((v) => v)) {
          setGameMessage(`You won in ${moves + 1} moves!`);
          setGameActive(false);
        }
      } else {
        setTimeout(() => {
          const resetVisible = [...visible];
          resetVisible[firstSelection] = false;
          resetVisible[index] = false;
          setVisible(resetVisible);
          setFirstSelection(null);
        }, 800);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 py-10 px-6 font-sans">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-8 text-center">Memory Match</h1>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {board.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-20 h-20 text-3xl font-semibold rounded-xl transition shadow-lg 
              ${matched[index] ? "bg-pink-500 text-white" : visible[index] ? "bg-pink-300 text-white" : "bg-white text-pink-600"}
              hover:scale-105 border border-pink-400`}
            disabled={visible[index] || matched[index] || !gameActive}
          >
            {visible[index] || matched[index] ? card : "?"}
          </button>
        ))}
      </div>

      <div className="text-center text-lg font-medium text-blue-800">
        <p className="mb-1">Moves: <span className="font-bold">{moves}</span></p>
        <p className="mb-1">Time Left: <span className="font-bold">{timeLeft} seconds</span></p>
        {gameMessage && <p className="mt-4 text-xl font-semibold text-pink-600">{gameMessage}</p>}
      </div>
    </div>
  );
}
