export class Inventory {
    private items = new Map<string, number>();

    addItem(itemName: string) {
        this.items.set(itemName, (this.items.get(itemName) || 0) + 1);
    }

    useItem(itemName: string): boolean {
        const count = this.items.get(itemName) || 0;
        if (count > 0) {
            if (count === 1) this.items.delete(itemName);
            else this.items.set(itemName, count - 1);
            return true;
        }
        return false;
    }

    hasItem(itemName: string): boolean {
        return (this.items.get(itemName) || 0) > 0;
    }

    displayInventory(): string {
        let sb = 'Inventory:\n';
        this.items.forEach((count, name) => (sb += `${name}: ${count}\n`));
        return sb;
    }
}