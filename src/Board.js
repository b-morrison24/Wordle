import Guess from "./Guess";

export default function Board({currentLetter, currentLetterId}) {
    // Number of guesses

    return (
        <div className="board_container">
            <Guess currLetter={currentLetter}></Guess>
            <Guess currLetter={currentLetter}></Guess>
            <Guess currLetter={currentLetter}></Guess>
            <Guess currLetter={currentLetter}></Guess>
            <Guess currLetter={currentLetter}></Guess>
            <Guess currLetter={currentLetter}></Guess>
        </div>
    )
}