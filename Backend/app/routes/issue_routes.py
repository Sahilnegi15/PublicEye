from fastapi import APIRouter, UploadFile, File, Form, Depends
from app.services.issue_service import create_issue
from app.core.deps import get_current_user
from app.utils.file_handler import save_file

router = APIRouter()

@router.post("/issues/upload")
async def upload_issue(
    title: str = Form(...),
    category: str = Form(...),
    lat: float = Form(...),
    lng: float = Form(...),
    image: UploadFile = File(...),
    user=Depends(get_current_user)
):
    file_path = save_file(image)

    issue_data = {
        "title": title,
        "category": category,
        "location": {
            "type": "Point",
            "coordinates": [lng, lat]
        },
        "image_url": file_path
    }

    return await create_issue(issue_data)