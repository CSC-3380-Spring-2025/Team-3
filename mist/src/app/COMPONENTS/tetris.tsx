"use client";
import React, { useState, useEffect, useCallback } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const cellSize = 30; // each cell is 30x30 pixels

// A board cell is a string (empty for blank or a color when occupied)
type BoardCell = string;
const createBoard = (): BoardCell[][] =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(''));

// Rotate a 2D matrix 90° clockwise.
const rotate = (matrix: number[][]): number[][] =>
  matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());

// Return the rotated shape given a rotation index (0-3).
const getRotatedShape = (shape: number[][], rotation: number): number[][] => {
  let newShape = shape;
  for (let i = 0; i < rotation; i++) {
    newShape = rotate(newShape);
  }
  return newShape;
};

// Define the 7 tetromino types (I, J, L, O, S, T, Z) with their base shape and color.
const TETROMINOES: { [key: string]: { shape: number[][]; color: string } } = {
  I: { shape: [[1, 1, 1, 1]], color: 'cyan' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'blue' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'orange' },
  O: { shape: [[1, 1], [1, 1]], color: 'yellow' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'green' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'purple' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'red' },
};

interface Piece {
  shapeKey: string;
  rotation: number;
  x: number;
  y: number;
  color: string;
}

// Create a new random piece that spawns at the top center.
const createRandomPiece = (): Piece => {
  const tetrominoKeys = Object.keys(TETROMINOES);
  const randKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
  const shape = TETROMINOES[randKey].shape;
  const rotation = 0;
  const initialX = Math.floor((BOARD_WIDTH - shape[0].length) / 2);
  const initialY = -shape.length; // starts above the board
  return {
    shapeKey: randKey,
    rotation,
    x: initialX,
    y: initialY,
    color: TETROMINOES[randKey].color,
  };
};

// Check if a piece (with an offset/rotation change) is in a valid position.
const isValidPosition = (
  board: BoardCell[][],
  piece: Piece,
  offsetX: number,
  offsetY: number,
  rotation: number
): boolean => {
  const shape = getRotatedShape(TETROMINOES[piece.shapeKey].shape, rotation);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = piece.x + x + offsetX;
        const newY = piece.y + y + offsetY;
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return false;
        if (newY >= 0 && board[newY][newX] !== '') return false;
      }
    }
  }
  return true;
};

// Remove full lines from the board and return the new board along with the count of cleared lines.
const clearLines = (board: BoardCell[][]): [BoardCell[][], number] => {
  const newBoard = board.filter(row => row.some(cell => cell === ''));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  for (let i = 0; i < linesCleared; i++) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(''));
  }
  return [newBoard, linesCleared];
};

// Merge the active piece onto the board (for rendering).
const mergePieceToBoard = (board: BoardCell[][], piece: Piece): BoardCell[][] => {
  const newBoard = board.map(row => [...row]);
  const shape = getRotatedShape(TETROMINOES[piece.shapeKey].shape, piece.rotation);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  return newBoard;
};

const Tetris: React.FC = () => {
  const [board, setBoard] = useState<BoardCell[][]>(createBoard());
  const [activePiece, setActivePiece] = useState<Piece | null>(createRandomPiece());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Game loop: drop the active piece every 500ms.
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      if (!activePiece) return;
      if (isValidPosition(board, activePiece, 0, 1, activePiece.rotation)) {
        setActivePiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
      } else {
        // Merge piece into board and clear lines.
        const newBoard = mergePieceToBoard(board, activePiece);
        const [clearedBoard, lines] = clearLines(newBoard);
        if (lines > 0) {
          setScore(prev => prev + lines * 100);
        }
        setBoard(clearedBoard);
        const newPiece = createRandomPiece();
        if (!isValidPosition(clearedBoard, newPiece, 0, 0, newPiece.rotation)) {
          setGameOver(true);
        } else {
          setActivePiece(newPiece);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [activePiece, board, gameOver]);

  // Handle keyboard controls.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activePiece || gameOver) return;
      if (e.key === "ArrowLeft") {
        if (isValidPosition(board, activePiece, -1, 0, activePiece.rotation)) {
          setActivePiece({ ...activePiece, x: activePiece.x - 1 });
        }
      } else if (e.key === "ArrowRight") {
        if (isValidPosition(board, activePiece, 1, 0, activePiece.rotation)) {
          setActivePiece({ ...activePiece, x: activePiece.x + 1 });
        }
      } else if (e.key === "ArrowDown") {
        if (isValidPosition(board, activePiece, 0, 1, activePiece.rotation)) {
          setActivePiece({ ...activePiece, y: activePiece.y + 1 });
        }
      } else if (e.key === "ArrowUp") {
        const newRotation = (activePiece.rotation + 1) % 4;
        if (isValidPosition(board, activePiece, 0, 0, newRotation)) {
          setActivePiece({ ...activePiece, rotation: newRotation });
        }
      } else if (e.key === " ") {
        // Hard drop: move the piece down as far as possible.
        let dropY = activePiece.y;
        while (
          isValidPosition(board, activePiece, 0, dropY - activePiece.y + 1, activePiece.rotation)
        ) {
          dropY++;
        }
        setActivePiece({ ...activePiece, y: dropY });
      }
    },
    [activePiece, board, gameOver]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const displayBoard = activePiece ? mergePieceToBoard(board, activePiece) : board;

  const boardStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${cellSize}px)`,
    border: "2px solid #000",
    background: "#eee",
    margin: "0 auto",
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <h1>Tetris Game</h1>
      <div style={boardStyle}>
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                width: cellSize,
                height: cellSize,
                border: "1px solid #999",
                backgroundColor: cell || "#fff",
              }}
            />
          ))
        )}
      </div>
      <h2>Score: {score}</h2>
      {gameOver && <h2>Game Over</h2>}
    </div>
  );
};

export default Tetris;