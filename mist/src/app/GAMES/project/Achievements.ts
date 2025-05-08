export class Achievements {
    private unlocked: string[] = [];

    checkAndUnlock(score: number, timeRemaining: number, powerUps: number) {
        if (score >= 100 && !this.unlocked.indexOf('High Scorer')) {
            this.unlock('High Scorer');
        }
        if (timeRemaining > 20 && !this.unlocked.indexOf('Time Keeper')) {
            this.unlock('Time Keeper');
        }
        if (powerUps >= 3 && !this.unlocked.indexOf('Power-Up Master')) {
            this.unlock('Power-Up Master');
        }
    }

    private unlock(name: string) {
        this.unlocked.push(name);
        console.log(`Achievement Unlocked: ${name}`);
    }

    displayAchievements(): string {
        if (this.unlocked.length === 0) {
            return 'No Achievements Yet!';
        }
        return 'Achievements:\n' + this.unlocked.map(a => `- ${a}`).join('\n');
    }
}