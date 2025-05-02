from enum import Enum
import os
from dotenv import load_dotenv

load_dotenv()

# Razorpay Configuration
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# Payment Status Enums
class PaymentStatus(str, Enum):
    PENDING = "pending"
    INITIATED = "initiated"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

# Payment Gateway Configuration
PAYMENT_GATEWAY = {
    "key_id": os.getenv("RAZORPAY_KEY_ID", ""),
    "key_secret": os.getenv("RAZORPAY_KEY_SECRET", ""),
    "webhook_secret": os.getenv("RAZORPAY_WEBHOOK_SECRET", "")
}

# JWT Configuration
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# CORS Configuration
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

# Email Configuration
EMAIL_SETTINGS = {
    "MAIL_USERNAME": os.getenv("MAIL_USERNAME", ""),
    "MAIL_PASSWORD": os.getenv("MAIL_PASSWORD", ""),
    "MAIL_FROM": os.getenv("MAIL_FROM", ""),
    "MAIL_PORT": int(os.getenv("MAIL_PORT", 587)),
    "MAIL_SERVER": os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    "MAIL_TLS": True,
    "MAIL_SSL": False,
    "USE_CREDENTIALS": True
}

# Payment Gateway Configuration
PAYMENT_GATEWAY = {
    "name": "razorpay",
    "currency": "INR",
    "timeout": 300,  # 5 minutes
    "theme": {
        "color": "#F37254"
    }
} 