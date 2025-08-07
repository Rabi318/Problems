export class Board {
  grid: string[][];

  constructor() {
    this.grid = Array(3)
      .fill(null)
      .map(() => Array(3).fill("_"));
  }

  display(): void {
    console.log("   1   2   3");
    ["A", "B", "C"].forEach((rowLabel, i) => {
      console.log(`${rowLabel}  ${this.grid[i].join(" | ")} `);
      if (i < 2) console.log("  ---+---+---");
    });
  }

  isValidMove(row: number, col: number): boolean {
    return this.grid[row][col] === "_";
  }

  setCell(row: number, col: number, symbol: string): void {
    this.grid[row][col] = symbol;
  }

  getCell(row: number, col: number): string {
    return this.grid[row][col];
  }

  isFull(): boolean {
    return this.grid.every((row) => row.every((cell) => cell !== "_"));
  }
}
