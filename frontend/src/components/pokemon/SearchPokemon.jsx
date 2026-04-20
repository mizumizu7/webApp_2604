import { useState } from "react"
import axios from "axios"
import "./SearchPokemon.css"


const SearchPokemon = () => {
  // ポケモンAPI
  const [name, setName]       = useState("")
  const [pokemon, setPokemon] = useState(null)
  const [error, setError]     = useState("")

  const searchPokemon = async () => {
    try {
      setError("")
      const res = await axios.get(
        `http://localhost:8000/pokemon/search/${name.toLowerCase()}`
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
          <div>
            <span><p>ID: {pokemon.id}</p></span>
            <span><h2>{pokemon.name}</h2></span>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>タイプ: {pokemon.types.join(", ")}</p>
            <p>身長: {pokemon.height}</p>
            <p>体重: {pokemon.weight}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchPokemon
