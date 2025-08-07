"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Board_1 = require("../models/Board");
const Player_1 = require("../models/Player");
const Validator_1 = require("../utils/Validator");
const InputHandler_1 = require("./InputHandler");
class GameManager {
    constructor() {
        this.board = new Board_1.Board();
        this.players = [];
        this.currentPlayerIndex = 0;
        this.diagonalLock = {
            locked: false,
            owner: "",
        };
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🎮 Welcome to Diagonal Lock Tic-Tac-Toe!");
            yield this.registerPlayers();
            this.board.display();
            while (true) {
                const player = this.players[this.currentPlayerIndex];
                const moveInput = yield (0, InputHandler_1.prompt)(`${player.name} (${player.symbol}) - Enter your move (e.g., A1): `);
                const move = (0, Validator_1.parseMove)(moveInput);
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
                if (this.diagonalLock.locked &&
                    row === 1 &&
                    col === 1 &&
                    player.symbol !== this.diagonalLock.owner) {
                    console.log(`🔒 Center cell is locked for you. Only ${this.diagonalLock.owner} can access B2.`);
                    continue;
                }
                this.board.setCell(row, col, player.symbol);
                this.checkDiagonalLock(player.symbol);
                this.board.display();
                if (this.checkWin(player.symbol)) {
                    console.log(`🏆 ${player.name} wins!`);
                    break;
                }
                else if (this.board.isFull()) {
                    console.log(`🤝 It's a draw!`);
                    break;
                }
                this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            }
            (0, InputHandler_1.closeInput)();
        });
    }
    registerPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.players.length < 2) {
                const name = yield (0, InputHandler_1.prompt)(`Enter name for Player ${this.players.length + 1}: `);
                const symbol = (yield (0, InputHandler_1.prompt)(`Enter symbol for ${name}: `)).toUpperCase();
                if (symbol === "_") {
                    console.log('❌ Symbol "_" is not allowed.');
                    continue;
                }
                if (this.players.some((p) => p.symbol === symbol)) {
                    console.log("❌ Symbol already taken by another player.");
                    continue;
                }
                this.players.push(new Player_1.Player(name, symbol));
            }
        });
    }
    checkWin(symbol) {
        const b = this.board.grid;
        // Rows, Columns, Diagonals
        for (let i = 0; i < 3; i++) {
            if (b[i].every((c) => c === symbol))
                return true;
            if ([b[0][i], b[1][i], b[2][i]].every((c) => c === symbol))
                return true;
        }
        if ([b[0][0], b[1][1], b[2][2]].every((c) => c === symbol))
            return true;
        if ([b[0][2], b[1][1], b[2][0]].every((c) => c === symbol))
            return true;
        return false;
    }
    checkDiagonalLock(symbol) {
        const b = this.board.grid;
        const playerHasA1C3 = b[0][0] === symbol && b[2][2] === symbol;
        const playerHasA3C1 = b[0][2] === symbol && b[2][0] === symbol;
        if ((playerHasA1C3 || playerHasA3C1) && b[1][1] === "_") {
            this.diagonalLock = { locked: true, owner: symbol };
            console.log(`🔐 Center cell locked for opponent! Only ${symbol} can claim B2.`);
        }
    }
}
exports.GameManager = GameManager;
