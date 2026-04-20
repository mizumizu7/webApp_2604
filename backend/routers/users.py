from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from db.models import User
from db.schemas import UserCreate, UserLogin, Token, UserResponse
from utils.auth import hash_password, verify_password, create_access_token
from utils.security import get_current_user


router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # すでに登録されているか確認
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        # 現状アカウント登録時にフロント側で、returnデータ使っていない
        "user_id": new_user.id,
        "email": new_user.email,
        "username": new_user.username
    }

@router.post("/login", response_model=Token)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    # ユーザ取得
    db_user = db.query(User).filter(User.email == user.email).first()

    # 要修正：原因切り分けように、一旦messageを分けているが同じにする
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password 1")
    
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password 2")
    
    token = create_access_token(data={"sub": str(db_user.id)})
    
    return {
        "access_token": token,
        "token_type": "bearer"
    }

    # return db_user

# @router.get("/me")
@router.get("/me", response_model=UserResponse)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user

