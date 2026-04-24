import { useContext } from "react"

import "./DetailModal.css"
import FavoriteBtn from "../favorites/FavoriteBtn"

import { FavoriteContext } from "../../contexts/FavoriteContext"
import { useFavorites } from "../../hooks/useFavorites"


const DetailModal = ({selectPoke, onClose}) => {
    if (!selectPoke) return null

    const { favoriteIds } = useContext(FavoriteContext)
    const { isFavorite, toggleFavorite } = useFavorites()
    const isFavo = favoriteIds.includes(selectPoke.id)
    
    // 公式寄りのイラスト（ドット絵でない）を表示したい場合
    // const officialArtImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectPoke.id}.png`

    return (
        <div className="modal-overlay">
            <div className="id-name">
                <p>No. {selectPoke.id} {selectPoke.name}</p>
            </div>
            
            {isFavo ? <p>のお気に入りを解除する</p> : <p>をお気に入りに登録する</p>}

            <div>
                <FavoriteBtn
                    poke_id={selectPoke.id}
                    isFavorite={isFavo}
                    onToggle={toggleFavorite} />
            </div>
            
            <img src={selectPoke.image} alt={selectPoke.name} />
            {/* <img src={officialArtImgUrl} alt={selectPoke.name} /> */}
            
            <div>
                <button onClick={onClose} className="close-btn">close</button>
            </div>
        </div>
    )
}

export default DetailModal
