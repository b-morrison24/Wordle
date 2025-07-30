import { useState } from "react"
import { generate } from 'random-words'

import Board from "./Board"
import Keyboard from "./Keyboard"

export default function Game() {
  const WORD_LENGTH = 5
  const MAX_GUESSES = 6
  const words = generate({ exactly: 9000, minLength: WORD_LENGTH, maxLength: WORD_LENGTH, formatter: (word) => word.toUpperCase() })

  // How to keep track of what letter is being guessed
  const [letterIndex, setLetterIndex] = useState(0)

  // Keep track of guess (updated when enter is clicked and word is valid)
  const [guessNumber, setGuessNumber] = useState(0)

  // TODO: move winning word to backend for anti-cheating
  const [winningWord, setWinningWord] = useState(words[Math.floor(Math.random() * words.length)])

  const getInitialGuessArray = (numOfGuesses, word_length) => {
    return Array.from({ length: numOfGuesses }, (_, id) => ({
      id,
      letters: Array.from({ length: word_length }, () => ({
        value: "",
        status: "unused"
      }))
    }))
  }

  const [guessArr, setGuessArr] = useState(getInitialGuessArray(MAX_GUESSES, WORD_LENGTH))
  const [statusObj, setStatusObj] = useState({})

  const handleKeyClicked = (key) => {
    // Reached max number of guesses, no more input allowed
    if (guessNumber !== MAX_GUESSES) {
      // if key is enter, check if word is valid and update guess number
      // if key is backspace, check bounds of letter index and decrease by one
      // else, update letter within a guess
      if (key === "Backspace") {
        handleBackspace()
      } else if (key === "Enter") {
        handleSubmittedGuess()
      } else if (/^[A-Z]$/.test(key)) {
        handleLetterInput(key)
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
        return { ...guess, letters: newLetters }
      }
      return guess
    }))

    setLetterIndex((prevLetterIndex) => Math.min(prevLetterIndex + 1, WORD_LENGTH))
  }

  const handleBackspace = () => {
    if (letterIndex === 0) return

    setGuessArr(prevGuessArr => prevGuessArr.map((guess) => {
      if (guessNumber === guess.id) {
        return { ...guess, letters: guess.letters.with(letterIndex - 1, { value: "", status: "unused" }) }
      }
      return guess
    }))

    setLetterIndex(prevLetterIndex => Math.max(prevLetterIndex - 1, 0))
  }

  const handleSubmittedGuess = () => {
    //validate guess (word needs to be exactly 5 letters)
    if (validateGuess()) {
      updateGame()
    }
  }

  const validateGuess = () => {
    if (letterIndex !== WORD_LENGTH) {
      alert("Not enough letters")
      return false
    } else {
      return true
    }
  }

  const updateGame = () => {
    const newStatusObj = { ...statusObj }

    setGuessArr(prevGuessArr => {
      return prevGuessArr.map((guess, guessIdx) => {
        // Only update the current guess row
        if (guessIdx !== guessNumber) return guess

        // For the current guess, update letters with status
        const updatedLetters = guess.letters.map((letter, letterIdx) => {
          const isCorrect = winningWord[letterIdx] === letter.value
          const isMisplaced = !isCorrect && winningWord.includes(letter.value)
          const letterStatus = isCorrect ? "correct" : isMisplaced ? "misplaced" : "incorrect"

          newStatusObj[letter.value] = letterStatus

          return {
            ...letter,
            status: letterStatus,
          }
        })

        return { ...guess, letters: updatedLetters }
      })
    })

    setStatusObj(newStatusObj)

    if (winningWord === guessArr[guessNumber].letters.map(letter => letter.value).join('')) {
      alert("You WON")
      resetGame()
      return
    }

    // move to next guess, reset letter index
    setGuessNumber(prevGuessNumber => Math.min(prevGuessNumber + 1, MAX_GUESSES))

    if (guessNumber === MAX_GUESSES - 1) {
      alert("Sorry, you didn't win this time. Please try again.")
      resetGame()
    }
    setLetterIndex(0)
  }

  const resetGame = () => {
    setWinningWord(words[Math.floor(Math.random() * words.length)])
    setLetterIndex(0)
    setGuessNumber(0)
    setGuessArr(getInitialGuessArray(MAX_GUESSES, WORD_LENGTH))

    const newStatusObj = statusObj

    for (const key in newStatusObj) {
      newStatusObj[key] = "unused"
    }

    setStatusObj(newStatusObj)
  }

  return (
    <div className="game_container">
      <Board guessArr={guessArr}></Board>
      <Keyboard onKeyClicked={handleKeyClicked} letterStatus={statusObj}></Keyboard>
    </div>
  )
}
