import { useEffect, useState } from "react";
import Guess from "./Guess";

export default function Board({currentLetter, guessNumber, letterIndex}) {
    // Number of guesses
    const [guessArr, setGuessArr] = useState(
        [
            {id: 0, letters: ["","","","",""]},
            {id: 1, letters: ["","","","",""]},
            {id: 2, letters: ["","","","",""]},
            {id: 3, letters: ["","","","",""]},
            {id: 4, letters: ["","","","",""]},
        ]
    )

    useEffect(() => {
        if (currentLetter) {
            setGuessArr(prevGuessArr => prevGuessArr.map((guess) => {
                if (guessNumber === guess.id) {
                    const newLetters = [...guess.letters]
                    newLetters[letterIndex] = currentLetter
                    return {...guess, letters: newLetters}
                }
                return guess
            }))
        }

    }, [currentLetter, guessNumber, letterIndex]);

    return (
        <div className="board_container">
            {
                guessArr.map(guess => (
                    <Guess key={guess.id} lettersArr={guess.letters}></Guess>
                ))
            }
        </div>
    )
}
