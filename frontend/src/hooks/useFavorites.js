import { useContext } from "react"
import axios from "axios"

import { FavoriteContext } from "../contexts/FavoriteContext"


export const useFavorites = () => {
    const { favoriteIds, setFavoriteIds} = useContext(FavoriteContext)

    const toggleFavorite = async (id) => {
        const token = localStorage.getItem("access_token")

        try {
            if (favoriteIds.includes(id)) {
                const res = await axios.delete(
                    `http://localhost:8000/favorites/delete/${id}`,
                    {headers: {
                        Authorization: `Bearer ${token}`,
                    }}
                )
                setFavoriteIds(prev => prev.filter(f => f !== id))
            } else {
                const res = await axios.post(
                    "http://localhost:8000/favorites/register",
                    {poke_id: id},
                    {headers: {
                            Authorization: `Bearer ${token}`,
                    }}
                )
                setFavoriteIds(prev => [...prev, id])
            }
        } catch (err) {
            alert("お気に入り処理に失敗しました")
        }
    }

    return { favoriteIds, toggleFavorite }
}