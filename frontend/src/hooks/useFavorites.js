import { useContext } from "react"
import apiClient from "../api/apiClient"

import { FavoriteContext } from "../contexts/FavoriteContext"


export const useFavorites = () => {
    const { favoriteIds, setFavoriteIds} = useContext(FavoriteContext)

    const toggleFavorite = async (id) => {

        try {
            if (favoriteIds.includes(id)) {
                await apiClient.delete(
                    `/favorites/delete/${id}`,
                )
                setFavoriteIds(prev => prev.filter(f => f !== id))
            } else {
                await apiClient.post(
                    "/favorites/register",
                    {poke_id: id},
                )
                setFavoriteIds(prev => [...prev, id])
            }
        } catch (err) {
            const err_msg = err.response?.data?.detail
            alert(`お気に入り処理に失敗しました\n${err_msg}`)
        }
    }

    return { favoriteIds, toggleFavorite }
}
