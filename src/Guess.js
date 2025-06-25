import GuessLetter from "./GuessLetter"

export default function Guess({currLetter}) {
    //Guess should get input from Keyboard

    return (
        <div className="guess_container">
            <GuessLetter currLetter={currLetter}></GuessLetter>
            <GuessLetter></GuessLetter>
            <GuessLetter></GuessLetter>
            <GuessLetter></GuessLetter>
            <GuessLetter></GuessLetter>
        </div>
    )
}