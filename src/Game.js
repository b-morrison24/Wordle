import { useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

export default function Game() {
  const WORD_LENGTH = 5
  // How to keep track of what letter is being guessed
  const [letterIndex, setLetterIndex] = useState(0)

  // Keep track of guess (updated when enter is clicked and word is valid)
  const [guessNumber, setGuessNumber] = useState(0)

  // TODO: Look into dynamic creation for more guesses
  const [guessArr, setGuessArr] = useState(
  [
      {id: 0, letters: ["","","","",""]},
      {id: 1, letters: ["","","","",""]},
      {id: 2, letters: ["","","","",""]},
      {id: 3, letters: ["","","","",""]},
      {id: 4, letters: ["","","","",""]},
  ])

  const words = ["BEANS", "PLANE", "PIGGY","ZZZZZ"]
  //const winningWord = "BEANS"

  const handleKeyClicked = (key) => {
    // Reached max number of guesses, no more input allowed
    if (guessNumber !== 5) {
      // if key is enter, check if word is valid and update guess number
      // if key is backspace, check bounds of letter index and decrease by one
      // else, update letter within a guess
      if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Enter") {
        handleSubmittedGuess();
      } else if (/^[A-Z]$/.test(key)) {
        handleLetterInput(key);
      }
    }
  }

  const handleLetterInput = (key) => {
    // Max number of letters in a guess reached
    if (letterIndex === WORD_LENGTH) return

    setGuessArr(prevGuessArr => prevGuessArr.map((guess) => {
        if (guessNumber === guess.id) {
            const newLetters = [...guess.letters]
            newLetters[letterIndex] = key
            return {...guess, letters: newLetters}
        }
        return guess
    }))

    setLetterIndex((prevLetterIndex) => Math.min(prevLetterIndex + 1, WORD_LENGTH))
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
    //validate guess (word needs to be 5 letters and exist in dictionary)
    if (validateGuess()) {
      // compare each letter in guess to winning word
      compareGuess();
    }
  }

  const validateGuess = () => {
    if (letterIndex !== WORD_LENGTH) {
      alert("Not enough letters")
      return false
    } else if (!words.includes(guessArr[guessNumber].letters.join(''))) {
      alert("Not in word list")
      return false
    } else {
      return true
    }
  }

  // TODO: Decide what to do on last guess and what a guess returns
  const compareGuess = () => {
    // Compare each letter in guess to each letter in winning word

    // move to next guess, reset letter index
    setGuessNumber(prevGuessNumber => Math.min(prevGuessNumber + 1, 5))
    setLetterIndex(0)
    console.log(guessArr[guessNumber].letters.join(''));
  }

  return (
    <div className="game_container">
      <Board guessArr={guessArr}></Board>
      <Keyboard onKeyClicked={handleKeyClicked}></Keyboard>
    </div>
  );
}
