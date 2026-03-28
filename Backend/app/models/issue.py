from pydantic import BaseModel
from typing import List, Optional

class Location(BaseModel):
    type: str = "Point"
    coordinates: List[float]

class Issue(BaseModel):
    title: str
    category: str
    description: Optional[str] = ""
    location: Location
    image_url: Optional[str] = None
    reports: int = 1
    status: str = "open"