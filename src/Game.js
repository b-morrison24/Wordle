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
      {id: 0, letters: [
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
      ]},
      {id: 1, letters: [
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
      ]},
      {id: 2, letters: [
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
      ]},
      {id: 3, letters: [
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
      ]},
      {id: 4, letters: [
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
        {value: "", status: "unused"},
      ]},
  ])

  const [statusObj, setStatusObj] = useState({})

  const words = ["BEANS", "PLANE", "PIGGY","ZZZZZ"]
  const winningWord = "BEANS"

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
            const newLetters = guess.letters
            newLetters[letterIndex].value = key
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
          return {...guess, letters: guess.letters.with(letterIndex - 1, {value: "", status: "unused"})}
        }
        return guess
    }))

    setLetterIndex(prevLetterIndex => Math.max(prevLetterIndex - 1, 0))
  }

  const handleSubmittedGuess = () => {
    //validate guess (word needs to be 5 letters and exist in dictionary)
    if (validateGuess()) {
      compareGuess();
    }
  }

  const validateGuess = () => {
    if (letterIndex !== WORD_LENGTH) {
      alert("Not enough letters")
      return false
    } else if (!words.includes(guessArr[guessNumber].letters.map(letter => letter.value).join(''))) {
      alert("Not in word list")
      return false
    } else {
      return true
    }
  }

  // TODO: Decide what to do on last guess and what a guess returns
  const compareGuess = () => {
    const newStatusObj = {...statusObj}

    setGuessArr(prevGuessArr => {
      return prevGuessArr.map((guess, guessIdx) => {
        // Only update the current guess row
        if (guessIdx !== guessNumber) return guess;

        // For the current guess, update letters with status
        const updatedLetters = guess.letters.map((letter, letterIdx) => {
          const isCorrect = winningWord[letterIdx] === letter.value;
          const isMisplaced = !isCorrect && winningWord.includes(letter.value);
          const letterStatus = isCorrect ? "correct" : isMisplaced ? "misplaced" : "incorrect"

          newStatusObj[letter.value] = letterStatus

          return {
            ...letter,
            status: letterStatus,
          };
        });

        return { ...guess, letters: updatedLetters };
      })
    })

    setStatusObj(newStatusObj)

    // move to next guess, reset letter index
    setGuessNumber(prevGuessNumber => Math.min(prevGuessNumber + 1, 5))
    setLetterIndex(0)
  }

  return (
    <div className="game_container">
      <Board guessArr={guessArr}></Board>
      <Keyboard onKeyClicked={handleKeyClicked} letterStatus={statusObj}></Keyboard>
    </div>
  );
}
