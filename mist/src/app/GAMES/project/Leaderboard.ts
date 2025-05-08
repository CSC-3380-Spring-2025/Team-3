export class Leaderboard {
    private scores: string[] = [];
    private key = 'maze-leaderboard';

    constructor() {
        const data = localStorage.getItem(this.key);
        this.scores = data ? JSON.parse(data) : [];
    }

    saveScores() {
        localStorage.setItem(this.key, JSON.stringify(this.scores));
    }

    addScore(name: string, score: number) {
        this.scores.push(`${name} - ${score}`);
        this.scores.sort(
            (a, b) => parseInt(b.split(' - ')[1]) - parseInt(a.split(' - ')[1])
        );
        if (this.scores.length > 10) this.scores.pop();
    }

    getLeaderboard(): string {
        return (
            'Leaderboard:\n' +
            this.scores.map((s, i) => `${i + 1}. ${s}`).join('\n')
        );
    }
}