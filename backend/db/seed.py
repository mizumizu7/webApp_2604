from db.database import SessionLocal
from db.models import User, Favorite
from utils.auth import hash_password

db = SessionLocal()

# -----------------
# User 作成
# -----------------

users_data = [
    {"name": "userA", "email": "userA@test.com", "pw": "passpass"},
    {"name": "userB", "email": "userB@test.com", "pw": "passpass"},
    {"name": "userC", "email": "userC@test.com", "pw": "passpass"},
    {"name": "userD", "email": "userD@test.com", "pw": "passpass"},
    {"name": "userE", "email": "userE@test.com", "pw": "passpass"},
    {"name": "userF", "email": "userF@test.com", "pw": "passpass"},
    {"name": "userG", "email": "userG@test.com", "pw": "passpass"},
    {"name": "userH", "email": "userH@test.com", "pw": "passpass"},
    {"name": "userI", "email": "userI@test.com", "pw": "passpass"},
    {"name": "userJ", "email": "userJ@test.com", "pw": "passpass"},
]

for data in users_data:

    existing_user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if existing_user:
        continue

    user = User(
        username=data["name"],
        email=data["email"],
        hashed_password=hash_password(data["pw"])
    )

    db.add(user)

db.commit()

# -----------------
# Favorite 作成
# -----------------

favorites_data = [
    
    # 1位 8票 ランキング表示用
    {"user_email": "userA@test.com", "poke_id": 25},
    {"user_email": "userB@test.com", "poke_id": 25},
    {"user_email": "userC@test.com", "poke_id": 25},
    {"user_email": "userD@test.com", "poke_id": 25},
    {"user_email": "userE@test.com", "poke_id": 25},
    {"user_email": "userF@test.com", "poke_id": 25},
    {"user_email": "userG@test.com", "poke_id": 25},
    {"user_email": "userH@test.com", "poke_id": 25},

    # 2位タイ 5票
    {"user_email": "userA@test.com", "poke_id": 133},
    {"user_email": "userB@test.com", "poke_id": 133},
    {"user_email": "userC@test.com", "poke_id": 133},
    {"user_email": "userD@test.com", "poke_id": 133},
    {"user_email": "userE@test.com", "poke_id": 133},

    {"user_email": "userF@test.com", "poke_id": 6},
    {"user_email": "userG@test.com", "poke_id": 6},
    {"user_email": "userH@test.com", "poke_id": 6},
    {"user_email": "userI@test.com", "poke_id": 6},
    {"user_email": "userJ@test.com", "poke_id": 6},

    # 3位タイ 4票
    {"user_email": "userA@test.com", "poke_id": 9},
    {"user_email": "userB@test.com", "poke_id": 9},
    {"user_email": "userC@test.com", "poke_id": 9},
    {"user_email": "userD@test.com", "poke_id": 9},

    {"user_email": "userE@test.com", "poke_id": 150},
    {"user_email": "userF@test.com", "poke_id": 150},
    {"user_email": "userG@test.com", "poke_id": 150},
    {"user_email": "userH@test.com", "poke_id": 150},

    # 4位タイ 3票
    {"user_email": "userA@test.com", "poke_id": 94},
    {"user_email": "userB@test.com", "poke_id": 94},
    {"user_email": "userC@test.com", "poke_id": 94},

    {"user_email": "userD@test.com", "poke_id": 39},
    {"user_email": "userE@test.com", "poke_id": 39},
    {"user_email": "userF@test.com", "poke_id": 39},

    # 5位 1票
    {"user_email": "userJ@test.com", "poke_id": 143},
    {"user_email": "userJ@test.com", "poke_id": 906},
    {"user_email": "userJ@test.com", "poke_id": 909},
    {"user_email": "userJ@test.com", "poke_id": 912},

]

for data in favorites_data:

    user = db.query(User).filter(
        User.email == data["user_email"]
    ).first()

    if not user:
        continue

    existing_favorite = db.query(Favorite).filter(
        Favorite.user_id == user.id,
        Favorite.poke_id == data["poke_id"]
    ).first()

    if existing_favorite:
        continue

    favorite = Favorite(
        user_id=user.id,
        poke_id=data["poke_id"]
    )

    db.add(favorite)

db.commit()
db.close()

print("seed completed")
