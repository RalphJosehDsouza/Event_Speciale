from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..models.event import Event
from ..auth.jwt_bearer import JWTBearer
from ..database import get_database
from bson import ObjectId

router = APIRouter(prefix="/events", tags=["events"])

@router.get("/", response_model=List[Event])
async def get_events():
    """Get all events"""
    db = await get_database()
    events = await db.events.find().to_list(length=None)
    return events

@router.get("/{event_id}", response_model=Event)
async def get_event(event_id: str):
    """Get a specific event by ID"""
    db = await get_database()
    event = await db.events.find_one({"id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.get("/club/{club}", response_model=List[Event])
async def get_club_events(club: str):
    """Get all events for a specific club"""
    db = await get_database()
    events = await db.events.find({"club": club}).to_list(length=None)
    return events

@router.get("/type/{event_type}", response_model=List[Event])
async def get_events_by_type(event_type: str):
    """Get all events of a specific type"""
    db = await get_database()
    events = await db.events.find({"event_type": event_type.upper()}).to_list(length=None)
    return events

@router.post("/", response_model=Event, dependencies=[Depends(JWTBearer())])
async def create_event(event: Event):
    """Create a new event (admin only)"""
    db = await get_database()
    existing_event = await db.events.find_one({"id": event.id})
    if existing_event:
        raise HTTPException(status_code=400, detail="Event ID already exists")
    
    await db.events.insert_one(event.dict())
    return event

@router.put("/{event_id}", response_model=Event, dependencies=[Depends(JWTBearer())])
async def update_event(event_id: str, event: Event):
    """Update an event (admin only)"""
    db = await get_database()
    existing_event = await db.events.find_one({"id": event_id})
    if not existing_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    await db.events.update_one({"id": event_id}, {"$set": event.dict()})
    return event

@router.delete("/{event_id}", dependencies=[Depends(JWTBearer())])
async def delete_event(event_id: str):
    """Delete an event (admin only)"""
    db = await get_database()
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"} 