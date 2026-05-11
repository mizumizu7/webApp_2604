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

    const ranking_top5 = ranking.filter(item => item.rank <= 5)

    // 配列のグループ化 reduce（従来）, groupBy（未対応ブラウザあり）
    // acc(accumulator)の初期値は第二引数で設定する
    const grouped = ranking_top5.length ?
        ranking_top5.reduce((acc, item) => {
            if (!acc[item.rank]) {
                acc[item.rank] = []
            }

            acc[item.rank].push(item)

            return acc
        }, {})
        : null

    return(
        <div>
            <div className="ranking-title-color">
                <div className="left" />
                <div className="ranking-title"><h2>登録数 ランキング</h2></div>
                <div className="right" />
            </div>
            
            {grouped ?
            <div>
                {Object.entries(grouped).map(([rank, pokemons]) => (
                    <div key={rank} className="rank-layer">
                        <div>
                            <h2><span className={`rank-number-${rank}`}>{rank}</span> 位</h2>
                            <h4>{`票数: ${pokemons[0].count}`}</h4>
                        </div>
                        <div className="rank-poke-area">
                            {pokemons.map(p => (
                                <div key={p.id}>
                                    <PokemonCard pokemon={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            : 
            <p className="no-ranking-data">集計データがありません</p>
            }
        </div>
    )
}

export default Ranking
