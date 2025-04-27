import { useState, useEffect } from "react";

type MathProblem = {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
};

export default function MathDrills() {
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [gameFinished, setGameFinished] = useState(false);

  // Create fresh problems when game starts/resets
  const makeNewProblems = () => {
    const ops = ['+', '-', '×', '÷'];
    return Array.from({ length: 10 }, () => {
      const operator = ops[Math.floor(Math.random() * ops.length)];
      let num1 = Math.floor(Math.random() * 12) + 1;
      let num2 = Math.floor(Math.random() * 12) + 1;

      // Make division problems work better
      if (operator === '÷') {
        [num1, num2] = [num1 * num2, num2]; // Swap to avoid decimals
      }

      const answer = {
        '+': num1 + num2,
        '-': num1 - num2,
        '×': num1 * num2,
        '÷': num1 / num2,
      }[operator];

      return { num1, num2, operator, answer: Number(answer.toFixed(2)) };
    });
  };

  useEffect(() => {
    setProblems(makeNewProblems());
  }, []);

  const handleGuess = () => {
    if (!userInput || isNaN(Number(userInput))) return;

    const isCorrect = Number(userInput) === problems[currentIndex].answer;
    setFeedback(isCorrect);
    
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIndex === 9) {
        setGameFinished(true);
      } else {
        setCurrentIndex(i => i + 1);
        setUserInput("");
        setFeedback(null);
      }
    }, 800);
  };

  const resetGame = () => {
    setProblems(makeNewProblems());
    setCurrentIndex(0);
    setUserInput("");
    setScore(0);
    setFeedback(null);
    setGameFinished(false);
  };

  return (
    <div className="math-game">
      {gameFinished ? (
        <div>
          <h3>Score: {score}/10</h3>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div>
          <p>Question {currentIndex + 1}/10</p>
          
          <div className="problem-box">
            {problems[currentIndex]?.num1}
            {problems[currentIndex]?.operator}
            {problems[currentIndex]?.num2} = ?
          </div>

          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleGuess()}
            placeholder="Your answer"
          />

          <button onClick={handleGuess}>
            {currentIndex === 9 ? 'Finish' : 'Next'}
          </button>

          {feedback !== null && (
            <p style={{ 
              color: feedback ? '#2ecc71' : '#e74c3c',
              opacity: 0,
              animation: 'fadeIn 0.3s forwards'
            }}>
              {feedback ? 'Correct! 🎉' : 'Try again! 💤'}
            </p>
          )}

          <div className="score-tracker">
            Points: {score}
          </div>
        </div>
      )}

      <style>{`
        .math-game {
          max-width: 500px;
          margin: 20px auto;
          padding: 20px;
          font-family: system-ui;
        }
        
        .problem-box {
          font-size: 2rem;
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        input {
          font-size: 1.2rem;
          padding: 8px;
          margin-right: 10px;
          width: 120px;
        }
        
        button {
          font-size: 1.1rem;
          padding: 8px 20px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  );
}

