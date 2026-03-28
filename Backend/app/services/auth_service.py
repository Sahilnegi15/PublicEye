from app.database.connection import user_collection
from app.core.security import hash_password, verify_password, create_token

async def register_user(user):
    user["password"] = hash_password(user["password"])
    await user_collection.insert_one(user)

async def login_user(user):
    db_user = await user_collection.find_one({"email": user["email"]})
    if not db_user or not verify_password(user["password"], db_user["password"]):
        return None
    return create_token({"user_id": str(db_user["_id"])})