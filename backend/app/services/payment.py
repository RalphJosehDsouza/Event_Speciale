from typing import List, Optional
from datetime import datetime
import razorpay
from bson import ObjectId

from ..models.payment import Payment, PaymentCreate, PaymentUpdate, PaymentStatus
from ..config import get_settings
from ..database import get_database

settings = get_settings()

class PaymentService:
    def __init__(self):
        self.db = get_database()
        self.razorpay_client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

    async def create_payment(self, payment_data: PaymentCreate) -> Payment:
        # Create Razorpay order
        razorpay_order = self.razorpay_client.order.create({
            'amount': int(payment_data.amount * 100),  # Convert to paise
            'currency': payment_data.currency,
            'receipt': str(ObjectId()),
            'payment_capture': '1'
        })

        # Prepare payment document
        payment_dict = payment_data.dict()
        payment_dict['_id'] = str(ObjectId())
        payment_dict['razorpay_order_id'] = razorpay_order['id']
        payment_dict['created_at'] = datetime.utcnow()
        payment_dict['updated_at'] = datetime.utcnow()

        # Insert into database
        await self.db.payments.insert_one(payment_dict)
        
        return Payment(**payment_dict)

    async def get_payment(self, payment_id: str) -> Optional[Payment]:
        payment = await self.db.payments.find_one({'_id': payment_id})
        if payment:
            return Payment(**payment)
        return None

    async def get_user_payments(self, user_id: str) -> List[Payment]:
        cursor = self.db.payments.find({'user_id': user_id})
        payments = await cursor.to_list(length=None)
        return [Payment(**payment) for payment in payments]

    async def get_event_payments(self, event_id: str) -> List[Payment]:
        cursor = self.db.payments.find({'event_id': event_id})
        payments = await cursor.to_list(length=None)
        return [Payment(**payment) for payment in payments]

    async def verify_payment(self, payment_id: str, payment_update: PaymentUpdate) -> Payment:
        # Verify Razorpay signature
        if payment_update.razorpay_payment_id and payment_update.razorpay_signature:
            params_dict = {
                'razorpay_order_id': payment_update.razorpay_order_id,
                'razorpay_payment_id': payment_update.razorpay_payment_id,
                'razorpay_signature': payment_update.razorpay_signature
            }
            try:
                self.razorpay_client.utility.verify_payment_signature(params_dict)
            except razorpay.errors.SignatureVerificationError:
                payment_update.status = PaymentStatus.FAILED

        # Update payment in database
        update_data = {
            '$set': {
                'status': payment_update.status,
                'razorpay_payment_id': payment_update.razorpay_payment_id,
                'razorpay_signature': payment_update.razorpay_signature,
                'updated_at': datetime.utcnow()
            }
        }
        
        await self.db.payments.update_one(
            {'_id': payment_id},
            update_data
        )

        payment = await self.get_payment(payment_id)
        return payment

# Create a singleton instance
payment_service = PaymentService() 