from datetime import datetime
from typing import List, Optional
from bson import ObjectId
from fastapi import HTTPException
from passlib.context import CryptContext
from ..models.user import User, UserCreate, UserUpdate
from ..database import get_database

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db.users

    async def create_user(self, user: UserCreate) -> User:
        # Check if user already exists
        if await self.collection.find_one({"email": user.email}):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash the password
        hashed_password = pwd_context.hash(user.password)
        
        # Prepare user data
        user_data = user.dict()
        user_data["password"] = hashed_password
        user_data["created_at"] = datetime.utcnow()
        user_data["updated_at"] = datetime.utcnow()
        
        # Insert user into database
        result = await self.collection.insert_one(user_data)
        user_data["_id"] = str(result.inserted_id)
        
        return User(**user_data)

    async def get_user(self, user_id: str) -> Optional[User]:
        user = await self.collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
            return User(**user)
        return None

    async def get_user_by_email(self, email: str) -> Optional[User]:
        user = await self.collection.find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])
            return User(**user)
        return None

    async def update_user(self, user_id: str, user_update: UserUpdate) -> Optional[User]:
        user = await self.get_user(user_id)
        if not user:
            return None

        update_data = user_update.dict(exclude_unset=True)
        if "password" in update_data:
            update_data["password"] = pwd_context.hash(update_data["password"])
        
        update_data["updated_at"] = datetime.utcnow()

        await self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )

        return await self.get_user(user_id)

    async def delete_user(self, user_id: str) -> bool:
        result = await self.collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0

    async def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = await self.get_user_by_email(email)
        if not user:
            return None
        if not await self.verify_password(password, user.password):
            return None
        return user

    async def get_all_users(self, skip: int = 0, limit: int = 10) -> List[User]:
        users = []
        cursor = self.collection.find().skip(skip).limit(limit)
        async for user in cursor:
            user["_id"] = str(user["_id"])
            users.append(User(**user))
        return users 