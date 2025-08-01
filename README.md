# Wordle Clone - React

A browser-based clone of the popular word-guessing game, built with React.

[Wordle Screenshot](./Screenshot.png)

## Features

✅ **Core Gameplay**:

- Guess a 5-letter word in 6 attempts.
- Color feedback (green = correct, yellow = misplaced, gray = incorrect).
- Virtual keyboard support.

✅ **Technical Highlights**:

- Immutable state management.
- Responsive design (works on mobile/desktop).
- Word generator using random-words module.

✅ **Possible Additional Features**:

- Daily puzzle mode (random word per day).
- Dark/light theme toggle.
- High Score: time-based past completions
- Additional languages

✅ **Possible Technical Features**:

- useMemo hook for expensive calculations (ie: keyboard and word generation)
- centralize application state using Redux or Context API
- Animation effects (tile flips, shake on invalid words).

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your-username/wordle-clone.git
   ```
2. Change working directory and install packages
   ```sh
   cd wordle-clone && npm install
   ```
3. Run the app locally
   ```sh
   npm start
   ```
4. Open http://localhost:3000 in your browser.
