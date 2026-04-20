import "./PokemonCard.css"

const PokemonCard = ({pokemon}) => {
  return (
    <div className="pokemon-card">
        <img src={pokemon.image} alt={pokemon.name} />
        <p>
          <span>{pokemon.id} : </span>
          <span>{pokemon.name}</span>
        </p>
    </div>
  )
}

export default PokemonCard
