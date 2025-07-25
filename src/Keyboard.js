import Key from "./Key"

export default function Keyboard({onKeyClicked, letterStatus}) {
    // On click, value of KeyButton is passed to guess
    // Read from an array of objects (id, value, className) possible keys, map values to each KeyButton component
    const keyValues = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ]

    return (
        <div className="keyboard_container">
            {
                keyValues.map((row, rowIndex) => {
                    return (
                        <div className={`row ${rowIndex}`}>
                            {row.map((keyValue) => {
                                return (
                                    <Key
                                        key={keyValue}
                                        value={keyValue}
                                        status={letterStatus[keyValue] || "unused"}
                                        onClick={() => onKeyClicked(keyValue)}
                                    />
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}
