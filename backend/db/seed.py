from db.database import SessionLocal
from db.models import User, Favorite
from utils.auth import hash_password

db = SessionLocal()

# -----------------
# User 作成
# -----------------

users_data = [
    {"name": "Taro", "email": "taro@example.com", "pw": "passpass"},
    {"name": "Hanako", "email": "hanako@example.com", "pw": "passpass"},
    {"name": "Ken", "email": "ken@example.com", "pw": "passpass"},
    {"name": "Yuki", "email": "yuki@example.com", "pw": "passpass"},
    {"name": "Satoshi", "email": "satoshi@example.com", "pw": "passpass"},
    {"name": "Aiko", "email": "aiko@example.com", "pw": "passpass"},
    {"name": "Daichi", "email": "daichi@example.com", "pw": "passpass"},
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
    
    {"user_email": "taro@example.com", "poke_id": 1},
    {"user_email": "hanako@example.com", "poke_id": 1},
    {"user_email": "ken@example.com", "poke_id": 1},
    {"user_email": "yuki@example.com", "poke_id": 1},

    {"user_email": "taro@example.com", "poke_id": 4},
    {"user_email": "hanako@example.com", "poke_id": 4},
    {"user_email": "aiko@example.com", "poke_id": 4},

    {"user_email": "hanako@example.com", "poke_id": 7},
    {"user_email": "ken@example.com", "poke_id": 7},
    {"user_email": "yuki@example.com", "poke_id": 7},

    {"user_email": "taro@example.com", "poke_id": 26},
    {"user_email": "ken@example.com", "poke_id": 26},
    {"user_email": "yuki@example.com", "poke_id": 26},
    {"user_email": "aiko@example.com", "poke_id": 26},
    {"user_email": "daichi@example.com", "poke_id": 26},

    {"user_email": "daichi@example.com", "poke_id": 39},
    {"user_email": "aiko@example.com", "poke_id": 39},

    {"user_email": "aiko@example.com", "poke_id": 94},
    {"user_email": "daichi@example.com", "poke_id": 94},

    {"user_email": "taro@example.com", "poke_id": 133},
    {"user_email": "hanako@example.com", "poke_id": 133},

    {"user_email": "ken@example.com", "poke_id": 150},
    {"user_email": "yuki@example.com", "poke_id": 150},

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