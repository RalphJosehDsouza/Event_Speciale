from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection string
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

# Create MongoDB client
client = MongoClient(MONGODB_URL)
motor_client = AsyncIOMotorClient(MONGODB_URL)

# Get database
db = client.event_speciale
motor_db = motor_client.event_speciale

# Get collections
events_collection = db.events
motor_events_collection = motor_db.events

registrations_collection = db.registrations
motor_registrations_collection = motor_db.registrations 