import os
import requests
from datetime import datetime, timedelta
import uuid
import shutil
from pathlib import Path
from .database import motor_events_collection
import asyncio

# Get the static directory path
STATIC_DIR = Path(__file__).parent / "static"
IMAGES_DIR = STATIC_DIR / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# Sample event data with image URLs
sample_events = [
    {
        "title": "Tech Conference 2024",
        "description": "Annual technology conference featuring the latest in AI and Machine Learning",
        "event_type": "CONFERENCE",
        "date": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
        "registration_fee": 1500.00,
        "image_url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
    },
    {
        "title": "Mountain Trek Adventure",
        "description": "Exciting trek through the Western Ghats with experienced guides",
        "event_type": "TREK",
        "date": (datetime.now() + timedelta(days=15)).strftime("%Y-%m-%d"),
        "registration_fee": 2000.00,
        "image_url": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
    },
    {
        "title": "Coding Bootcamp",
        "description": "Intensive 3-day coding bootcamp covering web development",
        "event_type": "WORKSHOP",
        "date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
        "registration_fee": 1000.00,
        "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
    }
]

def download_image(url, filename):
    """Download image from URL and save to static/images directory"""
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(IMAGES_DIR / filename, 'wb') as f:
            response.raw.decode_content = True
            shutil.copyfileobj(response.raw, f)
        return True
    return False

async def seed_events():
    # Clear existing events
    await motor_events_collection.delete_many({})
    
    # TEDxCRCE Events
    tedx_events = [
        {
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
    ]
    
    # Footslog Events
    footslog_events = [
        {
            "id": "footslog-2024",
            "title": "Footslog 2024",
            "description": "Annual retreat for students to unwind and connect with nature.",
            "date": "2024-04-20",
            "location": "Lonavala",
            "registration_fee": 2000,
            "contact": "footslog@frcrce.ac.in",
            "event_type": "RETREAT",
            "club": "Footslog",
            "image_url": "/images/events/footslog-2024.jpg"
        }
    ]
    
    # BitNBuild Events
    bitnbuild_events = [
        {
            "id": "bitnbuild-2024",
            "title": "BitNBuild 2024",
            "description": "Annual hackathon for innovative tech solutions.",
            "date": "2024-05-10",
            "location": "FRCRCE Computer Labs",
            "registration_fee": 300,
            "contact": "bitnbuild@frcrce.ac.in",
            "event_type": "HACKATHON",
            "club": "BitNBuild",
            "image_url": "/images/events/bitnbuild-2024.jpg"
        }
    ]
    
    # Athlead Events
    athlead_events = [
        {
            "id": "athlead-2024",
            "title": "Athlead 2024",
            "description": "Annual sports festival featuring various competitions.",
            "date": "2024-06-15",
            "location": "FRCRCE Sports Complex",
            "registration_fee": 100,
            "contact": "athlead@frcrce.ac.in",
            "event_type": "SPORTS",
            "club": "Athlead",
            "image_url": "/images/events/athlead-2024.jpg"
        }
    ]
    
    # Unplug Events
    unplug_events = [
        {
            "id": "unplug-2024",
            "title": "Unplug 2024",
            "description": "Annual music festival featuring live performances.",
            "date": "2024-07-20",
            "location": "FRCRCE Amphitheater",
            "registration_fee": 200,
            "contact": "unplug@frcrce.ac.in",
            "event_type": "MUSIC",
            "club": "Unplug",
            "image_url": "/images/events/unplug-2024.jpg"
        }
    ]
    
    # Insert all events
    all_events = tedx_events + footslog_events + bitnbuild_events + athlead_events + unplug_events
    for event in all_events:
        await motor_events_collection.insert_one(event)
    
    print("Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_events()) 