import Guess from "./Guess";

export default function Board({guessArr}) {
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
