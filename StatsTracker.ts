export class StatsTracker {
    private distance = 0;
    private enemiesDefeated = 0;
    private powerUpsUsed = 0;
    private nearDeaths = 0;
    private fastest = Infinity;
    private powerUpTime = 0;
    private deathCauses = new Map<string, number>();
    private longestChain = 0;
    private currentChain = 0;

    addDistance(d: number) {
        this.distance += d;
    }
    incrementEnemiesDefeated() {
        this.enemiesDefeated++;
    }
    incrementPowerUpsUsed() {
        this.powerUpsUsed++;
        this.currentChain++;
        if (this.currentChain > this.longestChain)
            this.longestChain = this.currentChain;
    }
    recordNearDeath() {
        this.nearDeaths++;
    }
    updateFastestCompletion(t: number) {
        if (t < this.fastest) this.fastest = t;
    }
    addPowerUpActiveTime(s: number) {
        this.powerUpTime += s;
    }
    recordDeathCause(c: string) {
        this.deathCauses.set(c, (this.deathCauses.get(c) || 0) + 1);
        this.currentChain = 0;
    }

    displayStats(): string {
        let out = `Game Statistics:\nDistance Traveled: ${this.distance}\nEnemies Defeated: ${this.enemiesDefeated}\nPower-Ups Used: ${this.powerUpsUsed}\nNear Deaths: ${this.nearDeaths}\n`;
        if (this.fastest < Infinity) out += `Fastest: ${this.fastest}s\n`;
        out += `Power-Up Time: ${this.powerUpTime}s\nLongest Chain: ${this.longestChain}\n`;
        if (this.deathCauses.size) {
            out += '\nDeath Causes:\n';
            this.deathCauses.forEach((n, c) => (out += `${c}: ${n}\n`));
        }
        return out;
    }
}