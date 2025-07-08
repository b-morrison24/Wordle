export default function Key({value, onClick}) {
    return (
        <button
            className={`key ${value}`}
            onClick={(value) => onClick(value)}
        >
        {value}
        </button>
    )
}
