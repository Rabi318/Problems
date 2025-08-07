import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { parseMove } from "../utils/Validator";
import { prompt, closeInput } from "./InputHandler";

export class GameManager {
  private board = new Board();
  private players: Player[] = [];
  private currentPlayerIndex = 0;
  private diagonalLock: { locked: boolean; owner: string } = {
    locked: false,
    owner: "",
  };

  async start() {
    console.log("🎮 Welcome to Diagonal Lock Tic-Tac-Toe!");

    await this.registerPlayers();
    this.board.display();

    while (true) {
      const player = this.players[this.currentPlayerIndex];
      const moveInput = await prompt(
        `${player.name} (${player.symbol}) - Enter your move (e.g., A1): `
      );
      const move = parseMove(moveInput);

      if (!move) {
        console.log("❌ Invalid format. Try A1, B2, etc.");
        continue;
      }

      const { row, col } = move;

      if (!this.board.isValidMove(row, col)) {
        console.log("❌ Cell already filled!");
        continue;
      }

      // Diagonal lock enforcement
      if (
        this.diagonalLock.locked &&
        row === 1 &&
        col === 1 &&
        player.symbol !== this.diagonalLock.owner
      ) {
        console.log(
          `🔒 Center cell is locked for you. Only ${this.diagonalLock.owner} can access B2.`
        );
        continue;
      }

      this.board.setCell(row, col, player.symbol);
      this.checkDiagonalLock(player.symbol);

      this.board.display();

      if (this.checkWin(player.symbol)) {
        console.log(`🏆 ${player.name} wins!`);
        break;
      } else if (this.board.isFull()) {
        console.log(`🤝 It's a draw!`);
        break;
      }

      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }

    closeInput();
  }

  private async registerPlayers() {
    while (this.players.length < 2) {
      const name = await prompt(
        `Enter name for Player ${this.players.length + 1}: `
      );
      const symbol = (await prompt(`Enter symbol for ${name}: `)).toUpperCase();

      if (symbol === "_") {
        console.log('❌ Symbol "_" is not allowed.');
        continue;
      }

      if (this.players.some((p) => p.symbol === symbol)) {
        console.log("❌ Symbol already taken by another player.");
        continue;
      }

      this.players.push(new Player(name, symbol));
    }
  }

  private checkWin(symbol: string): boolean {
    const b = this.board.grid;

    // Rows, Columns, Diagonals
    for (let i = 0; i < 3; i++) {
      if (b[i].every((c) => c === symbol)) return true;
      if ([b[0][i], b[1][i], b[2][i]].every((c) => c === symbol)) return true;
    }

    if ([b[0][0], b[1][1], b[2][2]].every((c) => c === symbol)) return true;
    if ([b[0][2], b[1][1], b[2][0]].every((c) => c === symbol)) return true;

    return false;
  }

  private checkDiagonalLock(symbol: string) {
    const b = this.board.grid;

    const playerHasA1C3 = b[0][0] === symbol && b[2][2] === symbol;
    const playerHasA3C1 = b[0][2] === symbol && b[2][0] === symbol;

    if ((playerHasA1C3 || playerHasA3C1) && b[1][1] === "_") {
      this.diagonalLock = { locked: true, owner: symbol };
      console.log(
        `🔐 Center cell locked for opponent! Only ${symbol} can claim B2.`
      );
    }
  }
}
