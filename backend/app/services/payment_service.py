import razorpay
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from ..models.payment import Payment, PaymentCreate, PaymentUpdate, PaymentStatus
from ..config import get_settings
from ..database import get_database

settings = get_settings()

class PaymentService:
    def __init__(self):
        self.client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )
        self.db = get_database()
        self.collection = self.db.payments

    async def create_payment(self, payment_data: PaymentCreate, user_id: str) -> Payment:
        # Create Razorpay order
        order_data = {
            'amount': int(payment_data.amount * 100),  # Convert to paise
            'currency': payment_data.currency,
            'receipt': str(ObjectId()),
            'notes': {
                'event_id': payment_data.event_id,
                'user_id': user_id,
                'description': payment_data.description
            }
        }
        
        order = self.client.order.create(data=order_data)
        
        # Create payment document
        payment_dict = payment_data.dict()
        payment_dict.update({
            '_id': str(ObjectId()),
            'user_id': user_id,
            'razorpay_order_id': order['id'],
            'status': PaymentStatus.PENDING,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        })
        
        await self.collection.insert_one(payment_dict)
        return Payment(**payment_dict)

    async def get_payment(self, payment_id: str) -> Optional[Payment]:
        payment = await self.collection.find_one({'_id': payment_id})
        if payment:
            return Payment(**payment)
        return None

    async def get_user_payments(self, user_id: str) -> List[Payment]:
        cursor = self.collection.find({'user_id': user_id})
        payments = await cursor.to_list(length=None)
        return [Payment(**payment) for payment in payments]

    async def get_event_payments(self, event_id: str) -> List[Payment]:
        cursor = self.collection.find({'event_id': event_id})
        payments = await cursor.to_list(length=None)
        return [Payment(**payment) for payment in payments]

    async def verify_payment(self, payment_id: str, payment_data: PaymentUpdate) -> Payment:
        # Verify payment signature
        params_dict = {
            'razorpay_order_id': payment_data.razorpay_order_id,
            'razorpay_payment_id': payment_data.razorpay_payment_id,
            'razorpay_signature': payment_data.razorpay_signature
        }
        
        try:
            self.client.utility.verify_payment_signature(params_dict)
        except razorpay.errors.SignatureVerificationError:
            # Update payment status to failed
            await self.collection.update_one(
                {'_id': payment_id},
                {
                    '$set': {
                        'status': PaymentStatus.FAILED,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            raise ValueError("Invalid payment signature")

        # Update payment with verification details
        update_data = {
            'status': payment_data.status,
            'razorpay_payment_id': payment_data.razorpay_payment_id,
            'razorpay_signature': payment_data.razorpay_signature,
            'updated_at': datetime.utcnow()
        }
        
        await self.collection.update_one(
            {'_id': payment_id},
            {'$set': update_data}
        )
        
        payment = await self.get_payment(payment_id)
        if not payment:
            raise ValueError("Payment not found")
        return payment 