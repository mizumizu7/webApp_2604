from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import SessionLocal, engine
from db.models import Base
from routers import users, pokemon, favorites


# テーブル作成
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    # "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(pokemon.router)
app.include_router(favorites.router)
