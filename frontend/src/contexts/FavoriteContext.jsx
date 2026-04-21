import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

import { UserContext } from "./UserContext"


export const FavoriteContext = createContext(null)

export const FavoriteProvider = ({ children }) => {

    const { user } = useContext(UserContext)

    const [favoriteIds, setFavoriteIds] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("access_token")

        if (!token) return

        axios.get("http://localhost:8000/favorites/ids",
            {headers: {
                Authorization: `Bearer ${token}`,
            }}
        )
        .then(res => setFavoriteIds(res.data.results))
        .catch(() => console.log("お気に入りIDs取得失敗"))
    }, [user])

    return (
        <FavoriteContext.Provider value={{favoriteIds, setFavoriteIds}}>
            {children}
        </FavoriteContext.Provider>
    )
}
