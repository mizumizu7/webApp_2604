from fastapi import APIRouter, Query, HTTPException
import httpx
import asyncio
import json
from typing import List


router = APIRouter(
    prefix="/pokemon",
    tags=["pokemon"],
)


@router.get("/search/{name}")
async def search_pokemon(name: str):
    # 暫定対応：日本語名での検索
    tmp_name = name
    try:
        with open("pokename_ja2en.json", encoding="utf-8") as f:
            ja2en = json.load(f)
            en_name = ja2en[name]
            name = en_name
    except:
        name = tmp_name
        pass

    url = f"https://pokeapi.co/api/v2/pokemon/{name}"

    async with httpx.AsyncClient() as client:
        res = await client.get(url)

    if res.status_code != 200:
        raise HTTPException(status_code=404, detail="Pokemon not found")

    data = res.json()

    # フロント向けに整形
    return {
        "id": data["id"],
        "name": data["name"],
        "image": data["sprites"]["front_default"],
        "types": [t["type"]["name"] for t in data["types"]],
        "height": data["height"],
        "weight": data["weight"],
    }

@router.get("/index")
async def get_pokemon_index(
    offset: int = Query(0, ge=0),
    limit: int = Query(50, le=1025)
    ):

    poke_list_url = f"https://pokeapi.co/api/v2/pokemon?offset={offset}&limit={limit}"
    species_url = f"https://pokeapi.co/api/v2/pokemon-species/"

    async with httpx.AsyncClient() as client:
        res = await client.get(poke_list_url)

        if res.status_code != 200:
            return {"error": "Pokemon not found"}

        data = res.json()

        # speciesAPIを並列で取得（data["results"]を回してポケIDを取得して、日本語名取得用のURLを作成、実行する）
        species_tasks = [client.get(f"{species_url}{int(p["url"].split("/")[-2])}")  for p in data["results"]]
        species_responses = await asyncio.gather(*species_tasks)

    results = []
    for p, species_res in zip(data["results"], species_responses):
        pokemon_id = int(p["url"].split("/")[-2])
        species_data = species_res.json()

        # 日本語名取得
        jp_name = next((n["name"] for n in species_data["names"] if n["language"]["name"] == "ja"), p["name"])

        results.append({
            "id": pokemon_id,
            # "name": p["name"], # 英語名のそのまま
            "name": jp_name, # 日本語名対応
            "image": f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon_id}.png",
        })

    # フロント向けに整形
    return {
        "count": data["count"],
        "next": data["next"],
        "previous": data["previous"],
        "results": results,
    }

async def get_pokemons_by_ids(poke_id_list):
    url = "https://pokeapi.co/api/v2/pokemon/"
    species_url = f"https://pokeapi.co/api/v2/pokemon-species/"

    async with httpx.AsyncClient() as client:
        tasks = []
        for poke_id in poke_id_list:
            tasks.append(
                asyncio.gather(
                    client.get(f"{url}{int(poke_id)}"), # 基本情報取得用
                    client.get(f"{species_url}{int(poke_id)}") # 日本語名取得用
                )
            )
        
        # asyncio.gatherの入れ子構造で、poke_id単位＋API単位の二重並列処理
        responses = await asyncio.gather(*tasks)

        poke_info_list = []
        for pokemon_res, species_res in responses:
            if pokemon_res.status_code != 200 or species_res.status_code != 200:
                continue
            pokemon_data = pokemon_res.json() # 基本情報取得用
            species_data = species_res.json() # 日本語名取得用

            # 日本語名取得
            jp_name = next((n["name"] for n in species_data["names"] if n["language"]["name"] == "ja"), species_data["name"])

            poke_info_list.append({
                "id": pokemon_data["id"],
                "name": jp_name,
                "image": pokemon_data["sprites"]["front_default"],
                # "image": pokemon_data["sprites"]["other"]["official-artwork"]["front_default"],
            })
    
    return poke_info_list

