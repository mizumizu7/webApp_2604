from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, func

from db.database import get_db
from db.models import Favorite
from db.schemas import RankingResponseItem
from routers.pokemon import get_pokemons_by_ids


router = APIRouter(
    prefix="/ranking",
    tags=["ranking"],
)

@router.get("", response_model=list[RankingResponseItem])
async def get_ranking(db: Session = Depends(get_db)):

    cnt = func.count(Favorite.id).label("cnt")
    # cnt = func.count().label("cnt") # Favorite.idは通常NOT NULLなのでCOUNT(*)と同じ
    # SELECT poke_id, COUNT(favorites.id) AS cnt FROM favorites GROUP BY poke_id ORDER BY cnt DESC, poke_id ASC;
    stmt = (
        select(
            Favorite.poke_id,
            cnt
        )
        .group_by(Favorite.poke_id)
        .order_by(cnt.desc(), Favorite.poke_id.asc())
    )

    # DBを確認して[(poke_id, cnt), (poke_id, cnt), ...]の形で降順(人気順)でデータを取得する
    raw_ranking_data = db.execute(stmt).all()

    if not raw_ranking_data:
        raise HTTPException(status_code=404, detail="Ranking not found")

    # poke_idリストを作成して、それを元に対象のpoke_infoリストを取得する
    poke_id_list = [poke_id for poke_id, _ in raw_ranking_data]
    poke_info_list = await get_pokemons_by_ids(poke_id_list)

    # poke_idで辞書化（poke_infoが取得できない場合を考慮して、厳密にするため）
    poke_info_dict = {p["id"]: p for p in poke_info_list}

    # ランキングデータとカウント数をまとめて、フロント側に返す
    ranking_data = []
    rank = 0
    prev_count = None
    for poke_id, count in raw_ranking_data:
        poke_info = poke_info_dict.get(poke_id)
        if not poke_info:
            print(f"None pke_id : {poke_id} ---------------")
            continue

        if prev_count != count:
            rank += 1
        prev_count = count

        ranking_data.append({
            # 辞書のアンパック（展開）をしている
            **poke_info,
            "count": count,
            "rank": rank,
        })

    return ranking_data

