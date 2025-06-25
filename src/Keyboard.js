export default function Keyboard({updateLetter}) {
    // On click, value of KeyButton is passed to guess
    // Read from an array of objects (id, value, className) possible keys, map values to each KeyButton component
    const keyValues = [
        {id: "q", value: "q", classValue: "row_1"},
        {id: "w", value: "w", classValue: "row_1"},
        {id: "e", value: "e", classValue: "row_1"},
    ]

    return (
        <div className="keyboard_container">
            {
                keyValues.map((keyValue) => {
                    return (
                        <button key={keyValue.id} value={keyValue.value} className={keyValue.classValue} onClick={(e) => updateLetter(e)}>{keyValue.value}</button>
                    )
                })
            }
        </div>
    )
}
