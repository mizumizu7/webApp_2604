import { useContext, useEffect, useState } from "react"
import apiClient from "../../api/apiClient"

import "./PokemonList.css"
import PokemonCard from "./PokemonCard"
import FavoriteBtn from "../favorites/FavoriteBtn"

import { UserContext } from "../../contexts/UserContext"
import { useFavorites } from "../../hooks/useFavorites"


const PokemonList = () => {

  const { user } = useContext(UserContext)
  const { favoriteIds, toggleFavorite } = useFavorites()

  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset]           = useState(0)

  // ポケモン一覧を取得 現状50体ずつ表示
  useEffect(() => {
    apiClient.get("/pokemon/index",
      {
        params:{offset, limit: 50}
        // params:{offset, limit: 1025}
      })
      .then(res => setPokemonList(res.data.results))
  }, [offset])

  return (
    <>
      <div className="title">
        {offset >= 50 && (
          <button onClick={() => setOffset(offset - 50)}>← prev</button>
        )}
        <h2>ポケモン一覧</h2>
        {/* TODO ページ遷移、問題になる可能性あり*/}
        {/* もう少し自由に閲覧できるようになるといいかも */}
        {offset <= 975 && (
          <>
          {offset == 950 ?
            <button onClick={() => setOffset(offset + 25)}>next →</button>
          :
            <button onClick={() => setOffset(offset + 50)}>next →</button>
          }
          </>
        )}
      </div>

      <div className="pokemon-list">
        {pokemonList.map((p) => (
          <div key={p.id}>
            <PokemonCard pokemon={p} />
            {user &&
            <FavoriteBtn
              poke_id={p.id}
              isFavorite={favoriteIds.includes(p.id)}
              onToggle={toggleFavorite} />
            }
          </div>
        ))}
      </div>
    </>
  )
}

export default PokemonList
