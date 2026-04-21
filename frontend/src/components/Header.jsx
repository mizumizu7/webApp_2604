import { useContext, useEffect, useState } from "react"
import axios from "axios"

import "./Header.css"
import PokemonCard from "./pokemon/PokemonCard"

import { UserContext } from "../contexts/UserContext"
import { FavoriteContext } from "../contexts/FavoriteContext"


const Header = () => {

    const { user, setUser, screen, setScreen } = useContext(UserContext)
    const { favoriteIds } = useContext(FavoriteContext)

    const [error, setError] = useState("")
    const [favoList, setFavoList] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("access_token")

        if (!token) return

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        axios.get("http://localhost:8000/favorites")
            .then((res) => {
                setFavoList(res.data.results)
            })
            .catch(() => {
                setError("お気に入り取得に失敗しました")
            })
    }, [user, favoriteIds])

    return (
        <div className="header-area">
            {user ?
            <>
            <p>お気に入り一覧</p>
            {error && <p>{error}</p>}

            {favoList.length > 0  &&
            <div className="card-area">
                {favoList.map((poke_info) => (
                    <PokemonCard key={poke_info.id} pokemon={poke_info} />
                ))}
            </div>
            }
            </>
            :
            <p>
            ログイン後お気に入り登録できます
            </p>
            }
        </div>
    )
}

export default Header
