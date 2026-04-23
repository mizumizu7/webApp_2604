import { createContext, useContext, useEffect, useState } from "react"
import apiClient from "../api/apiClient"

import { UserContext } from "./UserContext"


export const FavoriteContext = createContext(null)

export const FavoriteProvider = ({ children }) => {

    const { user } = useContext(UserContext)

    const [favoriteIds, setFavoriteIds] = useState([])

    useEffect(() => {
        if (!user) return

        apiClient.get("/favorites/ids")
        .then(res => setFavoriteIds(res.data.results))
        .catch(() => console.log("お気に入りIDs取得失敗"))
    }, [user])

    return (
        <FavoriteContext.Provider value={{favoriteIds, setFavoriteIds}}>
            {children}
        </FavoriteContext.Provider>
    )
}
