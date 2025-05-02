from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class Event(BaseModel):
    id: str = Field(..., description="Unique identifier for the event")
    title: str = Field(..., description="Title of the event")
    description: str = Field(..., description="Description of the event")
    date: str = Field(..., description="Date of the event in YYYY-MM-DD format")
    location: str = Field(..., description="Location of the event")
    registration_fee: float = Field(..., description="Registration fee for the event")
    contact: str = Field(..., description="Contact email for the event")
    event_type: str = Field(..., description="Type of event (CONFERENCE, RETREAT, HACKATHON, SPORTS, MUSIC)")
    club: str = Field(..., description="Club organizing the event")
    image_url: str = Field(..., description="URL of the event's image")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "tedxcrce-2024",
                "title": "TEDxCRCE 2024",
                "description": "Annual TEDx event featuring inspiring speakers and thought-provoking discussions.",
                "date": "2024-03-15",
                "location": "FRCRCE Auditorium",
                "registration_fee": 500,
                "contact": "tedx@frcrce.ac.in",
                "event_type": "CONFERENCE",
                "club": "TEDxCRCE",
                "image_url": "/images/events/tedxcrce-2024.jpg"
            }
        } 