from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
from datetime import datetime
import os
import uuid
import shutil
from pathlib import Path
from typing import List, Optional
from pydantic import BaseModel
from .database import motor_events_collection, motor_registrations_collection
from bson import ObjectId, json_util
import json
from .routes import event, payment, auth

app = FastAPI(title="FRCRCE Events API")

# Create and mount static directory for images
STATIC_DIR = Path(__file__).parent.parent / "static"
IMAGES_DIR = STATIC_DIR / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(event.router)
app.include_router(payment.router)

class EventCreate(BaseModel):
    title: str
    description: str
    event_type: str
    date: str
    registration_fee: float

@app.get("/")
async def root():
    return {"message": "Welcome to FRCRCE Events API"}

@app.get("/events")
async def get_events(council: Optional[str] = None):
    if council:
        cursor = motor_events_collection.find({"council": council})
    else:
        cursor = motor_events_collection.find()
    
    events = await cursor.to_list(length=None)
    return json.loads(json_util.dumps(events))

@app.get("/events/{event_id}")
async def get_event(event_id: str):
    event = await motor_events_collection.find_one({"id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.post("/events")
async def create_event(
    event: EventCreate,
    image: UploadFile = File(...)
):
    try:
        event_id = str(uuid.uuid4())
        
        # Save the uploaded image
        file_extension = image.filename.split(".")[-1]
        image_filename = f"{event_id}.{file_extension}"
        image_path = IMAGES_DIR / image_filename
        
        with image_path.open("wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        # Create event
        event_data = event.dict()
        event_data.update({
            "id": event_id,
            "image": image_filename,
            "image_url": f"/static/images/{image_filename}",
            "created_at": datetime.utcnow().isoformat()
        })
        
        # Insert into MongoDB
        await motor_events_collection.insert_one(event_data)
        return event_data
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/register")
async def register_for_event(registration_data: dict):
    try:
        # Generate registration ID
        registration_id = str(uuid.uuid4())
        
        # Extract event ID
        event_id = registration_data.get("eventId")
        event = await motor_events_collection.find_one({"id": event_id})
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")

        # Process registration
        registration = {
            "id": registration_id,
            "event_id": event_id,
            "status": "pending",
            "created_at": datetime.utcnow().isoformat(),
            **registration_data
        }

        # Insert into MongoDB
        await motor_registrations_collection.insert_one(registration)

        return {
            "status": "success",
            "registration_id": registration_id,
            "message": "Registration successful"
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/councils/{council}/events")
async def get_council_events(council: str):
    cursor = motor_events_collection.find({"council": council})
    events = await cursor.to_list(length=None)
    return json.loads(json_util.dumps(events))

@app.post("/seed")
async def seed_database():
    try:
        from .seed import seed_events
        await seed_events()
        return {"message": "Database seeded successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 