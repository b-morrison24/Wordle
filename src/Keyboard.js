import Key from "./Key"

export default function Keyboard({onKeyClicked}) {
    // On click, value of KeyButton is passed to guess
    // Read from an array of objects (id, value, className) possible keys, map values to each KeyButton component
    const keyValues = [
        {id: "Q", value: "Q", classValue: "row_1"},
        {id: "W", value: "W", classValue: "row_1"},
        {id: "E", value: "E", classValue: "row_1"},
        {id: "Backspace", value: "Backspace", classValue: "row_1"},
    ]

    return (
        <div className="keyboard_container">
            {
                keyValues.map((keyValue) => {
                    return (
                        <Key
                            key={keyValue.id}
                            value={keyValue.value}
                            onClick={() => onKeyClicked(keyValue.value)}
                        />
                    )
                })
            }
        </div>
    )
}
