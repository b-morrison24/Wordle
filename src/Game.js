import { useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

export default function Game() {
  // What's current letter
  const [currentLetter, setCurrentLetter] = useState("")

  // How to keep track of what letter is being guessed
  const [letterIndex, setLetterIndex] = useState(0)

  // Keep track of guess (updated when enter is clicked and word is valid)
  const [guessNumber, setGuessNumber] = useState(0)

  const handleLetterChange = (e) => {
    // if key is enter, check if word is valid and update guess number
    // if key is delete, check bounds of letter index and decrease by one
    // else, update letter
    setCurrentLetter(e.target.value)
    setLetterIndex((prevLetterIndex) => prevLetterIndex + 1)
  }

  return (
    <>
      <Board currentLetter={currentLetter}></Board>
      <Keyboard updateLetter={handleLetterChange}></Keyboard>
    </>
  );
}
