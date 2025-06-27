import GuessLetter from "./GuessLetter"

export default function Guess({lettersArr}) {
    // Guess should get input from Keyboard (currLetter, guessIndex)
    // guessNumber == guessId

    return (
        <div className="guess_container">
            {
                lettersArr.map((letter) => (
                    <div className="guess_letter">{letter}</div>
                ))
            }
        </div>
    )
}