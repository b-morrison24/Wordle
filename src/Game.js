import { useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

export default function Game() {
  // How to keep track of what letter is being guessed
  const [letterIndex, setLetterIndex] = useState(0)

  // Keep track of guess (updated when enter is clicked and word is valid)
  const [guessNumber, setGuessNumber] = useState(0)

  const [guessArr, setGuessArr] = useState(
  [
      {id: 0, letters: ["","","","",""]},
      {id: 1, letters: ["","","","",""]},
      {id: 2, letters: ["","","","",""]},
      {id: 3, letters: ["","","","",""]},
      {id: 4, letters: ["","","","",""]},
  ])

  const handleKeyClicked = (key) => {
    // if key is enter, check if word is valid and update guess number
    // if key is delete, check bounds of letter index and decrease by one
    // else, update letter
    if (key === "Backspace") {
      handleBackspace();
    } else if (key === "Enter") {
      handleSubmittedGuess();
    } else if (/^[A-Z]$/.test(key)) {
      handleLetterInput(key);
    }
  }

  const handleLetterInput = (key) => {
    if (letterIndex === 5) return 
    setGuessArr(prevGuessArr => prevGuessArr.map((guess) => {
        if (guessNumber === guess.id) {
            const newLetters = [...guess.letters]
            newLetters[letterIndex] = key
            return {...guess, letters: newLetters}
        }
        return guess
    }))

    setLetterIndex((prevLetterIndex) => Math.min(prevLetterIndex + 1, 5))
  }

  const handleBackspace = () => {
    if (letterIndex === 0) return;

    setGuessArr(prevGuessArr => prevGuessArr.map((guess) => {
        if (guessNumber === guess.id) {
          // // guess.letters.with(letterIndex - 1, "") is the same as the following 2 lines:
          // // const newLetters = [...guess.letters]
          // // newLetters[letterIndex - 1] = ""
          return {...guess, letters: guess.letters.with(letterIndex - 1, "")}
        }
        return guess
    }))

    setLetterIndex(prevLetterIndex => Math.max(prevLetterIndex - 1, 0))
  }

  const handleSubmittedGuess = () => {
    return
  }

  return (
    <div className="game_container">
      <Board guessArr={guessArr}></Board>
      <Keyboard onKeyClicked={handleKeyClicked}></Keyboard>
    </div>
  );
}
