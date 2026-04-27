import "./PokemonCard.css"


const PokemonCard = ({pokemon, isFavorite}) => {
  return (
    <div className="pokemon-card">
        {isFavorite && <span>⭐</span>}
        <img src={pokemon.image} alt={pokemon.name} />
        <p>{pokemon.id}: {pokemon.name}</p>
    </div>
  )
}

export default PokemonCard
