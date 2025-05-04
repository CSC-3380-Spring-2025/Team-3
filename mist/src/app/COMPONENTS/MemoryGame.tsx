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
  const [matched, setMatched] = useState<boolean[]>(Array(20).fill(false)); // NEW state for matched cards
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
        // Match!
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
        // No match
        setTimeout(() => {
          const resetVisible = [...visible];
          resetVisible[firstSelection] = false;
          resetVisible[index] = false;
          setVisible(resetVisible);
          setFirstSelection(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-pink-600">Memory Game</h1>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {board.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-20 h-20 text-3xl font-bold rounded-lg shadow 
              ${matched[index] ? "bg-pink-400 text-white" : visible[index] ? "bg-pink-300" : "bg-white"}
              hover:bg-pink-200 border-2 border-pink-500`}
            disabled={visible[index] || matched[index] || !gameActive}
          >
            {visible[index] || matched[index] ? card : "?"}
          </button>
        ))}
      </div>
      <div className="text-lg font-semibold text-center">
        <p>Moves: {moves}</p>
        <p>Time Left: {timeLeft} seconds</p>
        {gameMessage && <p className="mt-4 text-pink-600 font-bold">{gameMessage}</p>}
      </div>
    </div>
  );
}