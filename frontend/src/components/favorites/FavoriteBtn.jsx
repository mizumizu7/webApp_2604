
const FavoriteBtn = ({ poke_id, isFavorite, onToggle }) => {

    return (
        <>
        <button
            onClick={() => onToggle(poke_id)}
            className={isFavorite ? "del-btn" : "add-btn"}
        >
            {isFavorite ? "解除" : "登録"}
        </button>
        </>
    )
}

export default FavoriteBtn

