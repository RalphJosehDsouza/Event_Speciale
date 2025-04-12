from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class CouncilType(str, Enum):
    ROTARACT = "rotaract"
    GDSC = "gdsc"
    TEDX = "tedx"
    STUDENT_COUNCIL = "student_council"

class EventType(str, Enum):
    TREK = "trek"
    MARATHON = "marathon"
    HACKATHON = "hackathon"
    CONFERENCE = "conference"
    TECHNICAL = "technical"
    CULTURAL = "cultural"
    RETREAT = "retreat"

class Event(BaseModel):
    id: str = Field(..., description="Unique identifier for the event")
    title: str = Field(..., description="Title of the event")
    description: str = Field(..., description="Detailed description of the event")
    council: CouncilType = Field(..., description="Council organizing the event")
    event_type: EventType = Field(..., description="Type of event")
    date: datetime = Field(..., description="Date and time of the event")
    location: str = Field(..., description="Venue of the event")
    registration_deadline: datetime = Field(..., description="Last date for registration")
    image_url: Optional[str] = Field(None, description="URL of the event image")
    registration_fee: Optional[float] = Field(None, description="Registration fee if any")
    max_participants: Optional[int] = Field(None, description="Maximum number of participants")
    rules: Optional[List[str]] = Field([], description="List of rules for the event")
    prizes: Optional[List[str]] = Field([], description="List of prizes for the event")
    contact_email: str = Field(..., description="Contact email for event queries")
    contact_phone: Optional[str] = Field(None, description="Contact phone number")
    sponsors: Optional[List[str]] = Field([], description="List of event sponsors")
    itinerary: Optional[List[dict]] = Field(None, description="Detailed schedule of the event")
    inclusions: Optional[List[str]] = Field([], description="What's included in the registration")
    requirements: Optional[List[str]] = Field([], description="What participants need to bring")
    terms_conditions: Optional[List[str]] = Field([], description="Terms and conditions")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Registration(BaseModel):
    id: str = Field(..., description="Unique identifier for the registration")
    event_id: str = Field(..., description="ID of the event being registered for")
    student_name: str = Field(..., description="Name of the student")
    roll_number: str = Field(..., description="Roll number of the student")
    email: str = Field(..., description="Email address of the student")
    phone: str = Field(..., description="Phone number of the student")
    department: str = Field(..., description="Department of the student")
    year: str = Field(..., description="Year of study")
    team_name: Optional[str] = Field(None, description="Name of the team (if applicable)")
    team_members: Optional[List[str]] = Field([], description="List of team members (if applicable)")
    registration_date: datetime = Field(default_factory=datetime.utcnow)
    payment_status: str = Field("pending", description="Status of payment")
    amount_paid: Optional[float] = Field(None, description="Amount paid for registration")
    status: str = Field("pending", description="Status of the registration (pending/approved/rejected)")

# Sample event data for each council
sample_events = [
    {
        "id": "footslog-2024",
        "title": "Footslog 2024: Kothaligad",
        "description": "An extraordinary adventure trek to Kothaligad, organized by Rotaract Club of CRCE",
        "council": CouncilType.ROTARACT,
        "event_type": EventType.TREK,
        "date": "2024-07-27",
        "location": "Kothaligad Fort",
        "registration_deadline": "2024-07-20",
        "image_url": "/images/events/footslog-2024.jpg",
    },
    {
        "id": "heart-and-sole-2025",
        "title": "The Heart & Sole Run 2025",
        "description": "A fundraiser marathon with categories: 1.5KM Soul Run, 5KM Dream Run, 10KM Eco Run, 15KM Grit Run",
        "council": CouncilType.ROTARACT,
        "event_type": EventType.MARATHON,
        "date": "2025-02-16",
        "location": "CRCE Campus",
        "registration_deadline": "2025-02-10",
        "image_url": "/images/events/heart-and-sole-2025.jpg",
    },
    {
        "id": "bit-n-build-2024",
        "title": "Bit N Build: Maharashtra Round",
        "description": "International Hackathon by Google Developer Student Clubs CRCE",
        "council": CouncilType.GDSC,
        "event_type": EventType.HACKATHON,
        "date": "2024-03-15",
        "location": "CRCE Campus",
        "registration_deadline": "2024-03-10",
        "image_url": "/images/events/bit-n-build-2024.jpg",
        "registration_fee": 200,
        "prizes": ["Rs. 100,000+"],
    },
    {
        "id": "unplug-beach-2024",
        "title": "Unplug: By The Beach",
        "description": "A three-day, two-night retreat in Alibaug focusing on connecting, learning, and building your future. Join us for an exclusive experience that combines workshops, networking, and beachside activities.",
        "council": CouncilType.GDSC,
        "event_type": EventType.RETREAT,
        "date": "2024-03-28",
        "location": "Alibaug Beach",
        "registration_deadline": "2024-03-20",
        "registration_fee": 3000,
        "image_url": "/images/events/unplug-2024.jpg",
        "contact_email": "crcegdsc@gmail.com",
        "contact_phone": {
            "Shaun Mendes": "+91 99207 78067",
            "Siddhant Jadhav": "+91 82910 61982",
            "Sarah Dayal": "+91 96193 59920"
        },
        "itinerary": [
            {
                "day": 1,
                "date": "March 28",
                "schedule": [
                    {"time": "16:00", "activity": "Arrival & Check-in"},
                    {"time": "17:00", "activity": "Drink & Snacks"},
                    {"time": "18:30", "activity": "Tent Allocation"},
                    {"time": "19:00", "activity": "Kickoff with Barbecue"},
                    {"time": "20:30", "activity": "Dinner"},
                    {"time": "21:30", "activity": "Pitch by Bonfire"},
                    {"time": "23:00", "activity": "Build or Sleep"}
                ]
            },
            {
                "day": 2,
                "date": "March 29",
                "schedule": [
                    {"time": "08:00", "activity": "Start the Day"},
                    {"time": "09:00", "activity": "Breakfast"},
                    {"time": "10:00", "activity": "Build / Mini-Event"},
                    {"time": "13:00", "activity": "Lunch"},
                    {"time": "16:30", "activity": "Beach Games"},
                    {"time": "19:00", "activity": "BBQ, Speakers & Build"},
                    {"time": "21:00", "activity": "DJ Night"},
                    {"time": "22:00", "activity": "Dinner"},
                    {"time": "23:00", "activity": "Movie, Bonfire & Work"}
                ]
            },
            {
                "day": 3,
                "date": "March 30",
                "schedule": [
                    {"time": "09:00", "activity": "Breakfast"},
                    {"time": "10:30", "activity": "Investor Rounds"},
                    {"time": "13:00", "activity": "Lunch & Bounty Reveal"},
                    {"time": "15:00", "activity": "Checkout & Departure"}
                ]
            }
        ],
        "inclusions": [
            "Beachside accommodation",
            "All meals (breakfast, lunch, dinner, snacks, BBQ)",
            "Workshops by MAANG professionals",
            "Startup assessment for funding",
            "$200 prizes from StartHackClub",
            "Internship opportunities",
            "Blockchain workshop & bounties",
            "Exclusive T-shirt and merch"
        ],
        "requirements": [
            "College ID",
            "Government ID (Aadhaar/PAN)",
            "Light, breathable outfits",
            "Flip-flops/slides & comfortable sneakers",
            "Sunglasses & cap/hat",
            "Toiletries",
            "Personal medications",
            "Reusable water bottle",
            "Cash/cards",
            "Small backpack",
            "First-aid kit"
        ],
        "terms_conditions": [
            "Open to all Fr. CRCE students from first to fourth year",
            "Selection is screening-based; applying doesn't guarantee entry",
            "Fees are non-refundable unless the event is canceled",
            "Travel costs to be covered by participants",
            "Strictly prohibited: Alcohol, drugs, and disruptive behavior",
            "Participants are responsible for their belongings and safety",
            "Swimming is at your own risk",
            "Participants must disclose any medical conditions"
        ],
        "special_offers": [
            "Early bird offer: ₹2100 per person"
        ]
    },
    {
        "id": "tedx-spectrum-2025",
        "title": "TEDxCRCE 2025: Beyond the Spectrum",
        "description": "Step into a world where stories break barriers and push limits! This year, the TEDxCRCE Annual Conference 2025 proudly presents our theme, 'Beyond the Spectrum', celebrating unique perspectives, daring ideas, and inspiring journeys.",
        "council": CouncilType.TEDX,
        "event_type": EventType.CONFERENCE,
        "date": "2025-01-31 14:00:00",
        "location": "Samvaad Auditorium, Fr. CRCE",
        "registration_deadline": "2025-01-25",
        "image_url": "/images/events/tedx-2025.jpg",
        "registration_fee": 650,
        "inclusions": [
            "Impactful TED Talks",
            "Networking opportunities",
            "Dinner and snacks",
            "Participation Certificate"
        ],
        "contact_email": "tedxcrce@gmail.com",
        "special_offers": [
            "Bundle deal: ₹600 per ticket when buying 3 tickets"
        ]
    },
    {
        "id": "crmd-2024",
        "title": "CRMD 2024: Singularity",
        "description": "Cultural and technical fest organized by the Student Council",
        "council": CouncilType.STUDENT_COUNCIL,
        "event_type": EventType.CULTURAL,
        "date": "2024-03-01",
        "location": "CRCE Campus",
        "registration_deadline": "2024-02-25",
        "image_url": "/images/events/crmd-2024.jpg",
    },
    {
        "id": "atlead-2024",
        "title": "ATLEAD 2024",
        "description": "Sports and leadership event by the Student Council",
        "council": CouncilType.STUDENT_COUNCIL,
        "event_type": EventType.TECHNICAL,
        "date": "2024-02-15",
        "location": "CRCE Sports Ground",
        "registration_deadline": "2024-02-10",
        "image_url": "/images/events/atlead-2024.jpg",
    }
] 