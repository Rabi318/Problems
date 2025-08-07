# 🎮 Tic-Tac-Toe: Diagonal-Lock Variant (TypeScript)

A console-based Tic-Tac-Toe game built in TypeScript with an exciting twist — the **Diagonal Lock Rule**. Two players take turns marking a 3x3 board, with validations, win/draw detection, and a strategic locking mechanic.

---

## 📌 Features

- ✅ 3x3 board with coordinates (A1–C3)
- 👥 Player registration with unique names & symbols
- ❌ Input validation and error handling
- 🔐 **Diagonal Lock Rule**:
  - If a player marks both diagonal corners (A1 & C3 or A3 & C1), the center cell (B2) is locked for the opponent
- 🏆 Win conditions:
  - Three same symbols in a row, column, or diagonal
- 🤝 Draw detection when board is full

---

## 🗂 Folder Structure

```
tictactoe-diagonal-lock/
│
├── src/
│   ├── models/
│   │   ├── Board.ts
│   │   ├── Player.ts
│   │   └── Move.ts
│   │
│   ├── services/
│   │   ├── GameManager.ts
│   │   └── InputHandler.ts
│   │
│   ├── utils/
│   │   └── Validator.ts
│   │
│   └── index.ts   <-- Main entry file
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/tictactoe-diagonal-lock.git
cd tictactoe-diagonal-lock

### Install Dependencies
- npm install

### Compile Typescript
- tsc

### Run the Game

- node dist/index.js

### Game Preview
```

1 2 3
A _ | _ | _
---+---+---
B _ | _ | _
---+---+---
C _ | _ | \_

Player1 (X) - Enter your move (e.g., A1):

```

```
