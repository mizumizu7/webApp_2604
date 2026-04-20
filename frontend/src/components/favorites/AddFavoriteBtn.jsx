import axios from "axios"
import { useState } from "react"


const AddFavoriteBtn = ({poke_id}) => {
    // const [favorite, setFavorite] = useState(null)
    const [error, setError] = useState("")
    
    const handleFavorite = async () => {
        const token = localStorage.getItem("access_token")

        try {
            const res = await axios.post(
                "http://localhost:8000/favorites/register",
                {poke_id},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (err) {
            setError("お気に入り登録に失敗しました")
        }
    }


    return (
        <>
        <button onClick={() => handleFavorite()}>登録</button>
        {error && <p>{error}</p>}
        </>
    )

}


export default AddFavoriteBtn
