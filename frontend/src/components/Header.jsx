import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import apiClient from "../api/apiClient"

import "./Header.css"
import PokemonCard from "./pokemon/PokemonCard"
import FavoriteBtn from "./favorites/FavoriteBtn"

import { UserContext } from "../contexts/UserContext"
import { FavoriteContext } from "../contexts/FavoriteContext"
import { useFavorites } from "../hooks/useFavorites"


const Header = () => {

    const { user, setUser, screen, setScreen } = useContext(UserContext)
    const { favoriteIds, toggleFavorite } = useFavorites()

    const [error, setError] = useState("")
    const [favoList, setFavoList] = useState([])
    const [isShowEdit, setIsShowEdit] = useState(false)

    useEffect(() => {
        if (!user) return

        apiClient.get("/favorites")
            .then((res) => {
                setFavoList(res.data.results)
            })
            .catch(() => {
                setError("お気に入り取得に失敗しました")
            })
    }, [user, favoriteIds])

    return (
        <div className="header-area">
            <div className="nav-area">
                <nav className="link-area">
                    <Link to="/">ポケモン一覧</Link>
                    <Link to="/ranking">ランキング</Link>
                </nav>
            </div>
            
            <div className="favo-area">
                {user ?
                <div>
                    <p>お気に入り一覧</p>
                    {error && <p>{error}</p>}

                    {favoList.length === 0  &&
                    <p>☆タップや検索でポケモンをお気に入りに登録できます☆</p>
                    }

                    {favoList.length > 0  &&
                    <div className="card-btn-area">
                        <div className="card-area">
                            {favoList.map((poke_info) => (
                                <div key={poke_info.id}>
                                    <PokemonCard pokemon={poke_info} />
                                    {isShowEdit &&
                                    <FavoriteBtn
                                        poke_id={poke_info.id}
                                        isFavorite={true}
                                        onToggle={toggleFavorite} />
                                    }
                                </div>
                            ))}
                        </div>                    
                        <button
                            onClick={() => setIsShowEdit(!isShowEdit)}
                            className="edit-btn">
                            {isShowEdit ? <>編集終了</> : <>編集する</>}
                        </button>
                    </div>
                    }
                </div>
                :
                <p>☆ログイン後お気に入り登録できます☆</p>
                }
            </div>
        </div>
    )
}

export default Header
