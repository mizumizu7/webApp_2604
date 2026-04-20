from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import httpx
import asyncio

from db.database import get_db
from db.models import User, Favorite
from db.schemas import FavoriteRequest
from utils.security import get_current_user


router = APIRouter(
    prefix="/favorites",
    tags=["favorites"],
)


# 再利用できるよう抽出
def get_favorite_poke_ids(db, user_id):
    favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    return [f.poke_id for f in favorites]


@router.get("/ids")
async def get_favorite_ids(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    poke_id_list = get_favorite_poke_ids(db, current_user.id)
    return {"results": poke_id_list}


@router.get("")
async def get_favorites_info(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    poke_id_list = get_favorite_poke_ids(db, current_user.id)
    if not poke_id_list:
        return {"results": []}

    url = f"https://pokeapi.co/api/v2/pokemon/"
    poke_info_list = []

    async with httpx.AsyncClient() as client:
        tasks = [client.get(f"{url}{int(poke_id)}") for poke_id in poke_id_list]
        responses = await asyncio.gather(*tasks)
    
    for res in responses:
        poke_info_data = res.json()

        poke_info_list.append({
            "id": poke_info_data["id"],
            "name": poke_info_data["name"],
            "image": poke_info_data["sprites"]["front_default"],
        })

    return {
        "results": poke_info_list
    }


@router.post("/register")
def add_favorite(
    favorite: FavoriteRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    poke_count = db.query(Favorite).filter(Favorite.user_id == current_user.id).count()
    if poke_count >= 6:
        raise HTTPException(status_code=409, detail="Registration limit")
    
    existing = db.query(Favorite).filter_by(user_id=current_user.id, poke_id=favorite.poke_id).first()
    if existing:
        raise HTTPException(status_code=409, detail="Already favorited")

    new_favorite = Favorite(
        user_id=current_user.id,
        poke_id=favorite.poke_id,
    )

    db.add(new_favorite)
    db.commit()

    return {"poke_id": favorite.poke_id}


@router.delete("/delete/{poke_id}")
def delete_favorite(
    poke_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    del_favo = db.query(Favorite).filter_by(user_id=current_user.id, poke_id=poke_id).first()
    if not del_favo:
        raise HTTPException(status_code=404, detail="No favorites found")

    db.delete(del_favo)
    db.commit()

    return {"poke_id": poke_id}

