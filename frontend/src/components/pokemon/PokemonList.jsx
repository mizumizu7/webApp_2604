import { useEffect, useState } from "react"
import axios from "axios"
import PokemonCard from "./PokemonCard"
import "./PokemonList.css"
import AddFavoriteBtn from "../favorites/AddFavoriteBtn"
import DelFavoriteBtn from "../favorites/DelFavoriteBtn"
import FavoriteBtn from "../favorites/FavoriteBtn"


const PokemonList = ({user}) => {
  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset]           = useState(0)
  const [favoriteIds, setFavoriteIds] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("access_token")

    axios.get("http://localhost:8000/favorites/ids",
        {headers: {
            Authorization: `Bearer ${token}`,
        }}
      )
      .then(res => setFavoriteIds(res.data.results))
      .catch(() => console.log("お気に入り取得失敗"))
  }, [user])

  // ポケモン一覧を取得 現状50体ずつ表示
  useEffect(() => {
    axios.get("http://localhost:8000/pokemon/index",
      {
        params:{offset, limit: 50}
        // params:{offset, limit: 1025}
      })
      .then(res => setPokemonList(res.data.results))
  }, [offset])

  
  const [error, setError] = useState("")

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
                  {id},
                  {headers: {
                          Authorization: `Bearer ${token}`,
                  }}
              )
              setFavoriteIds(prev => [...prev, id])
          }
      } catch (err) {
          setError("お気に入り処理に失敗しました")
      }
  }

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
            {/* <AddFavoriteBtn poke_id={p.id} className="add-btn" />
            <DelFavoriteBtn poke_id={p.id} className="del-btn" /> */}
            <FavoriteBtn
              poke_id={p.id}
              isFavorite={favoriteIds.includes(p.id)}
              onToggle={toggleFavorite} />
          </div>
        ))}
      </div>
    </>
  )
}

export default PokemonList
