from app.database.connection import issue_collection
from app.utils.geo import calculate_distance

async def create_issue(issue_data):
    coords = issue_data["location"]["coordinates"]

    async for existing in issue_collection.find():
        ex = existing["location"]["coordinates"]
        dist = calculate_distance(coords[0], coords[1], ex[0], ex[1])

        if dist < 50 and existing["category"] == issue_data["category"]:
            await issue_collection.update_one(
                {"_id": existing["_id"]},
                {"$inc": {"reports": 1}}
            )
            return {"message": "Merged with existing issue"}

    result = await issue_collection.insert_one(issue_data)
    return {"message": "Created", "id": str(result.inserted_id)}