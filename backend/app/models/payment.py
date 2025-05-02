from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.config import PaymentStatus
from enum import Enum

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class PaymentBase(BaseModel):
    amount: float = Field(..., gt=0)
    currency: str = "INR"
    event_id: str
    description: Optional[str] = None

class PaymentCreate(PaymentBase):
    user_id: Optional[str] = None  # Will be set from the authenticated user

class PaymentUpdate(BaseModel):
    razorpay_payment_id: str
    razorpay_signature: str
    status: PaymentStatus = PaymentStatus.COMPLETED

class Payment(PaymentBase):
    id: str = Field(alias="_id")
    user_id: str
    razorpay_order_id: str
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None
    status: PaymentStatus = PaymentStatus.PENDING
    created_at: datetime
    updated_at: datetime

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 