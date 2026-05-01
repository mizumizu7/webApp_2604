import { useEffect, useState } from "react"

import "./Ranking.css"
import apiClient from "../../api/apiClient"
import PokemonCard from "../pokemon/PokemonCard"


const Ranking = () => {

    const [ranking, setRanking] = useState([])
    
    useEffect(() => {
        apiClient.get("/ranking")
        .then(res => setRanking(res.data))
    }, [])

    return(
        <div>
            <div className="ranking-title-color">
                <div className="left" />
                <div className="ranking-title"><h2>ランキング</h2></div>
                <div className="right" />
            </div>
            
            <div>
                ランキング内容
                {ranking.map(p => (
                    <div key={p.id}>
                        <PokemonCard pokemon={p} />
                        <p>No. {p.id} 票数：{p.count}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Ranking
