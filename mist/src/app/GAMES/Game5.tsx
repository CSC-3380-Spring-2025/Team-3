//tetris game corrected and running 
// tetris.ts
class TetrisGame {
    private readonly BOARD_WIDTH = 10;
    private readonly BOARD_HEIGHT = 20;
    private readonly BLOCK_SIZE = 30;
    
    private board: boolean[][];
    private currentPiece: number[][];
    private piecePosition = { x: 0, y: 0 };
    private score = 0;

    constructor(private canvas: HTMLCanvasElement) {
        this.board = Array(this.BOARD_HEIGHT).fill(null)
            .map(() => Array(this.BOARD_WIDTH).fill(false));
        
        this.canvas.width = this.BOARD_WIDTH * this.BLOCK_SIZE;
        this.canvas.height = this.BOARD_HEIGHT * this.BLOCK_SIZE;
        
        document.addEventListener('keydown', (e) => this.handleInput(e));
        this.spawnNewPiece();
        requestAnimationFrame(() => this.gameLoop());
    }

    private spawnNewPiece(): void {
        this.currentPiece = [
            [1, 1, 1],
            [0, 1, 0]
        ];
        this.piecePosition = {
            x: Math.floor(this.BOARD_WIDTH/2 - this.currentPiece[0].length/2),
            y: 0
        };
    }

    private draw(): void {
        const ctx = this.canvas.getContext('2d')!;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw board
        this.board.forEach((row, y) => {
            row.forEach((filled, x) => {
                if (filled) {
                    ctx.fillStyle = '#0ff';
                    ctx.fillRect(
                        x * this.BLOCK_SIZE,
                        y * this.BLOCK_SIZE,
                        this.BLOCK_SIZE - 1,
                        this.BLOCK_SIZE - 1
                    );
                }
            });
        });

        // make/draw current piece
        ctx.fillStyle = '#ff0';
        this.currentPiece.forEach((row, dy) => {
            row.forEach((cell, dx) => {
                if (cell) {
                    ctx.fillRect(
                        (this.piecePosition.x + dx) * this.BLOCK_SIZE,
                        (this.piecePosition.y + dy) * this.BLOCK_SIZE,
                        this.BLOCK_SIZE - 1,
                        this.BLOCK_SIZE - 1
                    );
                }
            });
        });
    }

    private handleInput(e: KeyboardEvent): void {
        switch(e.key) {
            case 'ArrowLeft':
                if (this.canMove(-1, 0)) this.piecePosition.x--;
                break;
            case 'ArrowRight':
                if (this.canMove(1, 0)) this.piecePosition.x++;
                break;
            case 'ArrowDown':
                this.dropPiece();
                break;
        }
    }

    private canMove(dx: number, dy: number): boolean {
        return this.currentPiece.every((row, y) => 
            row.every((cell, x) => {
                if (!cell) return true;
                const newX = this.piecePosition.x + x + dx;
                const newY = this.piecePosition.y + y + dy;
                return newX >= 0 && newX < this.BOARD_WIDTH &&
                       newY < this.BOARD_HEIGHT &&
                       !this.board[newY][newX];
            })
        );
    }
    private dropPiece(): void {
        if (this.canMove(0, 1)) {
            this.piecePosition.y++;
        } else {
            this.lockPiece();
            this.clearLines();
            this.spawnNewPiece();
        }
    }

    private lockPiece(): void {
        this.currentPiece.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    this.board[this.piecePosition.y + y][this.piecePosition.x + x] = true;
                }
            });
        });
    }

    private clearLines(): void {
        let linesCleared = 0;
        
        for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(this.BOARD_WIDTH).fill(false));
                linesCleared++;
            }
        }
        
        this.score += linesCleared * 100;
    }

    private gameLoop(): void {
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// start game
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
new TetrisGame(canvas);
