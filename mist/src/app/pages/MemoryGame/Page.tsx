// Brain Rot Memory Match Game 

class MemoryGame {
    private board: string[];
    private visible: boolean[];
    private moves: number = 0;
    private timeLeft: number = 45;
    private gameActive: boolean = false;

    constructor() {
        this.board = this.makeBoard();
        this.visible = new Array(20).fill(false);
    }

    
    private makeBoard(): string[] {
        const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const pairs = [...symbols, ...symbols];
        
        
        return pairs.sort(() => Math.random() - 0.7); 

    
    async startGame() {
        this.gameActive = true;
        console.log('Game started! You have 45 seconds.');

        
        const timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                console.log('\nTime up! You lose!');
                clearInterval(timer);
                process.exit();
            }
        }, 1000); 

        while (this.gameActive) {
            this.printBoard();
            
        
            const first = await this.getInput('Enter first card index (0-19): ');
            if (first < 0 || first > 19) {
                console.log('Invalid index!');
                continue;
            }
            
            const second = await this.getInput('Enter second card index (0-19): ');
            if (second < 0 || second > 19) {
                console.log('Invalid index!');
                continue;
            }

            
            if (first === second) {
                console.log('Cannot pick same card!');
                continue;
            }

            this.moves++;
            this.revealCards([first, second]);

            if (this.board[first] === this.board[second]) {
                console.log('Match found!');
                this.visible[first] = true;
                this.visible[second] = true;
            } else {
                console.log('No match!');
                this.hideCards([first, second]);
            }

           
            if (this.visible.every(v => v)) {
                console.log(`You won in ${this.moves} moves!`);
                clearInterval(timer);
                this.gameActive = false;
            }
        }
    }

    private revealCards(indices: number[]) {
       
        indices.forEach(i => this.visible[i] = true);
        this.printBoard();
    }

    private hideCards(indices: number[]) {
        setTimeout(() => {
            indices.forEach(i => this.visible[i] = false);
        }, 1000); 
    }

    private printBoard() {
        console.log('\nCurrent Board:');
        
        let output = '';
        this.board.forEach((card, index) => {
            output += this.visible[index] ? `[${card}] ` : `[${index}] `;
            if ((index + 1) % 5 === 0) output += '\n';
        });
        console.log(output);
    }

    private async getInput(prompt: string): Promise<number> {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            readline.question(prompt, answer => {
                readline.close();
                resolve(parseInt(answer));
            });
        });
    }
}

// Start game
const game = new MemoryGame();
game.startMemoryGame();