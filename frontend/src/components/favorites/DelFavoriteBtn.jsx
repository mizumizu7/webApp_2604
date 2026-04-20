import axios from "axios"
import { useState } from "react"


const DelFavoriteBtn = ({poke_id}) => {
    // const [favorite, setFavorite] = useState(null)
    const [error, setError] = useState("")
    
    const handleFavorite = async () => {
        const token = localStorage.getItem("access_token")

        try {
            const res = await axios.delete(
                `http://localhost:8000/favorites/delete/${poke_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (err) {
            setError("お気に入り解除に失敗しました")
        } 
    }


    return (
        <>
        <button onClick={() => handleFavorite()}>解除</button>
        {error && <p>{error}</p>}
        </>
    )

}

export default DelFavoriteBtn
