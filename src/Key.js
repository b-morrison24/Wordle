export default function Key({value, status, onClick}) {
    return (
        <button
            className={`key ${value} ${status}`}
            name={value}
            onClick={(value) => onClick(value)}
        >
        {value}
        </button>
    )
}
