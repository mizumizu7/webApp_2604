from pydantic import BaseModel, EmailStr, Field
from typing_extensions import Annotated
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: Annotated[str, Field(min_length=8, max_length=64)]


class UserLogin(BaseModel):
    email: EmailStr
    password: Annotated[str, Field(min_length=8, max_length=64)]


class Token(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: int
    email: str
    username: str

    class Config:
        from_attributes = True


class FavoriteRequest(BaseModel):
    poke_id: int

