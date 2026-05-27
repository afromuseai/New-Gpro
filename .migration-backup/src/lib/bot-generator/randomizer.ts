export class Randomizer {
  private rng: () => number;

  constructor(seed: number | null = null) {
    this.rng = seed !== null ? this.seededRandom(seed) : Math.random;
  }

  private seededRandom(seed: number) {
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  int(min: number, max: number): number {
    return Math.floor(this.rng() * (max - min + 1)) + min;
  }

  float(min: number, max: number, decimals = 2): number {
    return parseFloat((this.rng() * (max - min) + min).toFixed(decimals));
  }

  boolean(probability = 0.5): boolean {
    return this.rng() < probability;
  }

  pick<T>(array: T[]): T {
    return array[this.int(0, array.length - 1)];
  }

  pickMultiple<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => this.rng() - 0.5);
    return shuffled.slice(0, count);
  }

  date(minDaysAgo: number, maxDaysAgo: number): Date {
    const now = new Date();
    const maxAge = maxDaysAgo * 24 * 60 * 60 * 1000;
    const minAge = minDaysAgo * 24 * 60 * 60 * 1000;
    const randomAge = this.rng() * (maxAge - minAge) + minAge;
    return new Date(now.getTime() - randomAge);
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = this.rng() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  alphanumeric(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(this.int(0, chars.length - 1));
    }
    return result;
  }

  weightedPick<T>(items: T[], weights: number[]): T {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = this.rng() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) return items[i];
    }
    return items[items.length - 1];
  }
}
