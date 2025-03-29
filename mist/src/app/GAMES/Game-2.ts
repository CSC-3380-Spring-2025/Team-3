// Brain Rot Memory Match Game (Incomplete)

// cards 
interface Card {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
}


//  game
class MemoryMatchGame {
    private cards: Card[] = []; //?
    private flippedCards: Card[] = [];
    private matchedPairs: number = 0;

    constructor(private gridSize: number = 4) {
        this.initializeGame();
    }


    //  creating cards and shuffling them
    private initializeGame(): void {
        const values = this.generateCardValues();
        this.cards = values.map((value, index) => ({
            id: index,
            value: value,
            isFlipped: false,
            isMatched: false,
        }));
        this.shuffleCards();
    }

    
    // generate card values 
    private generateCardValues(): string[] {
        const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
        const values = symbols.concat(symbols); // Create pairs
        return values;

    }