import { useState } from "react"
import apiClient from "../../api/apiClient"

import "./SearchPokemon.css"
import FavoriteBtn from "../favorites/FavoriteBtn"
import { useFavorites } from "../../hooks/useFavorites"


const SearchPokemon = () => {

  const {favoriteIds, toggleFavorite} = useFavorites()

  // ポケモンAPI
  const [name, setName]       = useState("")
  const [pokemon, setPokemon] = useState(null)
  const [error, setError]     = useState("")

  const searchPokemon = async () => {
    try {
      setError("")
      const res = await apiClient.get(
        `/pokemon/search/${name.toLowerCase()}`
      )
      setPokemon(res.data)
    } catch {
      setError("ポケモンが見つかりません")
      setPokemon(null)
    }
  }

  return (
    <>
      <div>
        <h2>ポケモン検索</h2>
        
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="pikachu"
        />
        <button onClick={searchPokemon}>検索</button>

        {error && <p>{error}</p>}

        {pokemon && (
          <div className="search-result">
            <div className="base-info">
              <p>No. {pokemon.id}</p>
              <h3>{pokemon.name}</h3>
              <img src={pokemon.image} alt={pokemon.name} />
            </div>

            <FavoriteBtn
              poke_id={pokemon.id}
              isFavorite={favoriteIds.includes(pokemon.id)}
              onToggle={toggleFavorite} />

            <div className="sub-info">
              <p>タイプ: {pokemon.types.join(", ")}</p>
              <p>身長: {pokemon.height}</p>
              <p>体重: {pokemon.weight}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchPokemon
