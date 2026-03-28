from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI

client = AsyncIOMotorClient(MONGO_URI)
db = client["crowd_reporting"]

user_collection = db["users"]
issue_collection = db["issues"]