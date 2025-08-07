"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor() {
        this.grid = Array(3)
            .fill(null)
            .map(() => Array(3).fill("_"));
    }
    display() {
        console.log("   1   2   3");
        ["A", "B", "C"].forEach((rowLabel, i) => {
            console.log(`${rowLabel}  ${this.grid[i].join(" | ")} `);
            if (i < 2)
                console.log("  ---+---+---");
        });
    }
    isValidMove(row, col) {
        return this.grid[row][col] === "_";
    }
    setCell(row, col, symbol) {
        this.grid[row][col] = symbol;
    }
    getCell(row, col) {
        return this.grid[row][col];
    }
    isFull() {
        return this.grid.every((row) => row.every((cell) => cell !== "_"));
    }
}
exports.Board = Board;
