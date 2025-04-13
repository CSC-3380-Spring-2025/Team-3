// game 3 under frontend game data 

import { useCallback, useEffect, useState } from "react";


interface Question {
    num1: number;
    num2: number;
    operator: string;
    correctAnswer: number;
  }
  
  const FlashCardGame: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [gameOver, setGameOver] = useState(false);
  
    // Generating random questions
    useEffect(() => {
      const generateQuestions = () => {
        const newQuestions: Question[] = [];
        const operators = ['+', '-', '*', '/'];
        
        for (let i = 0; i < 10; i++) { // 10 questions
          const operator = operators[Math.floor(Math.random() * operators.length)];
          let num1 = Math.floor(Math.random() * 12) + 1;
          let num2 = Math.floor(Math.random() * 12) + 1;
  
          // Ensuring valid division problems
          if (operator === '/') {
            num1 = num1 * num2; // Make sure num1 is divisible by num2
          }
  
          let correctAnswer: number;
          switch (operator) {
            case '+':
              correctAnswer = num1 + num2;
              break;
            case '-':
              correctAnswer = num1 - num2;
              break;
            case '*':
              correctAnswer = num1 * num2;
              break;
            case '/':
              correctAnswer = num1 / num2;
              break;
            default:
              correctAnswer = 0;
          }
  
          newQuestions.push({ num1, num2, operator, correctAnswer });
        }
        return newQuestions;
      };
  
      setQuestions(generateQuestions());
    }, []);
  
    const handleSubmit = useCallback(() => {
      const correct = Number(userAnswer) === questions[currentQuestionIndex]?.correctAnswer;
      setIsCorrect(correct);
      
      if (correct) {
        setScore(prev => prev + 1);
      }
  
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
          setIsCorrect(null);
        } else {
          setGameOver(true);
        }
      }, 1000);
    }, [userAnswer, currentQuestionIndex, questions]);
  
    const restartGame = () => {
      setCurrentQuestionIndex(0);
      setUserAnswer('');
      setScore(0);
      setIsCorrect(null);
      setGameOver(false);
    };
}