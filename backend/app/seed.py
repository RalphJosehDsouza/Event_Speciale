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
    # First, clear existing events
    await motor_events_collection.delete_many({})
    
    # Event data
    events = [
        # TEDx Events
        {
            "id": "tedx-spectrum-2025",
            "title": "TEDxCRCE 2025: Beyond the Spectrum",
            "description": "Step into a world where stories break barriers and push limits! Experience impactful TED Talks, connect with inspiring speakers, enjoy dinner and networking.",
            "council": "tedx",
            "event_type": "conference",
            "date": datetime(2025, 1, 31, 14, 0).isoformat(),
            "location": "Samvaad Auditorium, Fr. CRCE",
            "registration_deadline": datetime(2025, 1, 25).isoformat(),
            "registration_fee": 650,
            "contact_email": "tedxcrce@gmail.com",
            "inclusions": [
                "TED Talks",
                "Dinner and Snacks",
                "Networking",
                "Participation Certificate"
            ],
            "special_offers": ["Buy 3 Tickets at ₹600 each"],
            "speakers": [
                "Faisal Khan - Automobile Influencer",
                "Nidhi Bhasin - Growth Marketer",
                "Shweta Gandhi - Social Entrepreneur",
                "Dr. Rohit Sane - Healthcare Pioneer",
                "Abhash Jha - Multifaceted Artist"
            ]
        },
        
        # Rotaract Events
        {
            "id": "heart-and-sole-2025",
            "title": "The Heart & Sole Run 2025",
            "description": "A scenic run and fundraiser event featuring multiple distance categories. #MILESFORSMILES",
            "council": "rotaract",
            "event_type": "marathon",
            "date": datetime(2025, 2, 16, 6, 0).isoformat(),
            "location": "Fr. CRCE",
            "registration_deadline": datetime(2025, 2, 10).isoformat(),
            "contact_email": "rotaractcrce@gmail.com",
            "categories": [
                {"distance": "15KM", "name": "Grit Run", "fee": 900},
                {"distance": "10KM", "name": "Eco Run", "fee": 800},
                {"distance": "5KM", "name": "Dream Run", "fee": 450},
                {"distance": "1.5KM", "name": "Soul Run", "fee": 250}
            ],
            "inclusions": [
                "Timing chips",
                "Finisher medals",
                "Dry-FIT T-Shirts",
                "Bibs",
                "Certificates",
                "Vouchers & Goodies"
            ]
        },
        {
            "id": "footslog-2024",
            "title": "Footslog: Kothaligad Trek",
            "description": "Take only memories, leave only footprints. Join us for an adventurous trek to Kothaligad fort.",
            "council": "rotaract",
            "event_type": "trek",
            "date": datetime(2024, 7, 27, 5, 15).isoformat(),
            "location": "Kothaligad Fort",
            "registration_deadline": datetime(2024, 7, 20).isoformat(),
            "contact_email": "rotaractcrce@gmail.com",
            "itinerary": [
                "5:15 AM: Reporting at College",
                "6:00 AM: Departure from College",
                "9:00 AM: Reach Base Village",
                "9:15 AM: Start Ascend",
                "11:15 AM: Reach the Top of Kothaligad",
                "12:00 PM: Start Descend",
                "2:00 PM: Reach Base Village",
                "2:45 PM: Departure from Kothaligad",
                "4:15 PM: Halt for Lunch at a Restaurant",
                "6:00 PM: Head to Bandra Station",
                "8:30 PM: Reach Bandra Station"
            ],
            "sponsors": {
                "snacks": "Balaji",
                "beverages": "Swaras"
            }
        },
        
        # GDSC Events
        {
            "id": "bit-n-build-2024",
            "title": "Bit N Build: Maharashtra Round",
            "description": "International Hackathon by Google Developer Student Clubs CRCE. 2-3 members per team, Rs.200 per team, Prize pool of Rs.100,000+",
            "council": "gdsc",
            "event_type": "hackathon",
            "date": datetime(2024, 3, 15).isoformat(),
            "location": "Fr. CRCE",
            "registration_deadline": datetime(2024, 3, 10).isoformat(),
            "registration_fee": 200,
            "contact_email": "crcegdsc@gmail.com",
            "team_size": {"min": 2, "max": 3},
            "prizes": ["Rs. 100,000+"]
        },
        {
            "id": "unplug-beach-2024",
            "title": "Unplug: By The Beach",
            "description": "A three-day, two-night retreat in Alibaug focusing on connecting, learning, and building your future.",
            "council": "gdsc",
            "event_type": "retreat",
            "date": datetime(2024, 3, 28).isoformat(),
            "location": "Alibaug Beach",
            "registration_deadline": datetime(2024, 3, 20).isoformat(),
            "registration_fee": 3000,
            "contact_email": "crcegdsc@gmail.com",
            "contacts": [
                {"name": "Shaun Mendes", "phone": "+91 99207 78067"},
                {"name": "Siddhant Jadhav", "phone": "+91 82910 61982"},
                {"name": "Sarah Dayal", "phone": "+91 96193 59920"}
            ],
            "inclusions": [
                "Beachside accommodation",
                "All meals",
                "Workshops by MAANG professionals",
                "Startup assessment",
                "Exclusive T-shirt and merch"
            ],
            "special_offers": ["Early bird offer: ₹2100 per person"]
        },
        
        # Student Council Events
        {
            "id": "athlead-2024",
            "title": "Athlead 2024",
            "description": "INSPIRE. COMPETE. ACHIEVE. Annual sports event by the Student Council.",
            "council": "student_council",
            "event_type": "sports",
            "date": datetime(2024, 4, 15).isoformat(),
            "location": "Fr. CRCE Sports Ground",
            "registration_deadline": datetime(2024, 4, 10).isoformat(),
            "registration_fee": 100,
            "contact_email": "stucocrce@gmail.com"
        },
        {
            "id": "crmd-2024",
            "title": "CRMD 2024: Maze of Conflict",
            "description": "Annual technical and cultural festival by Fr. CRCE Student Council.",
            "council": "student_council",
            "event_type": "technical",
            "date": datetime(2024, 3, 25).isoformat(),
            "location": "Fr. CRCE",
            "registration_deadline": datetime(2024, 3, 20).isoformat(),
            "registration_fee": 150,
            "contact_email": "stucocrce@gmail.com"
        }
    ]
    
    # Insert events
    for event in events:
        await motor_events_collection.insert_one(event)
    
    print("Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_events()) 