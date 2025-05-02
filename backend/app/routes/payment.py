from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..models.payment import Payment, PaymentCreate, PaymentUpdate
from ..services.payment_service import PaymentService
from ..auth.jwt_bearer import JWTBearer
from ..auth.jwt_handler import get_current_user

router = APIRouter(
    prefix="/payments",
    tags=["payments"],
    dependencies=[Depends(JWTBearer())]
)

@router.post("/", response_model=Payment)
async def create_payment(
    payment_data: PaymentCreate,
    current_user: dict = Depends(get_current_user),
    payment_service: PaymentService = Depends()
):
    """
    Create a new payment for an event.
    """
    try:
        return await payment_service.create_payment(payment_data, current_user["id"])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/user", response_model=List[Payment])
async def get_user_payments(
    current_user: dict = Depends(get_current_user),
    payment_service: PaymentService = Depends()
):
    """
    Get all payments for the current user.
    """
    return await payment_service.get_user_payments(current_user["id"])

@router.get("/event/{event_id}", response_model=List[Payment])
async def get_event_payments(
    event_id: str,
    current_user: dict = Depends(get_current_user),
    payment_service: PaymentService = Depends()
):
    """
    Get all payments for a specific event.
    """
    return await payment_service.get_event_payments(event_id)

@router.get("/{payment_id}", response_model=Payment)
async def get_payment(
    payment_id: str,
    current_user: dict = Depends(get_current_user),
    payment_service: PaymentService = Depends()
):
    """
    Get a specific payment by ID.
    """
    payment = await payment_service.get_payment(payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.post("/{payment_id}/verify", response_model=Payment)
async def verify_payment(
    payment_id: str,
    payment_data: PaymentUpdate,
    current_user: dict = Depends(get_current_user),
    payment_service: PaymentService = Depends()
):
    """
    Verify a payment after Razorpay callback.
    """
    try:
        return await payment_service.verify_payment(payment_id, payment_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) 