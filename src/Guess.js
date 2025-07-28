export default function Guess({lettersArr}) {
    return (
        <div className="guess_container">
            {lettersArr.map((letter) => (
                <div className={`guess_letter ${letter.status}`}>{letter.value}</div>
            ))}
        </div>
    )
}
