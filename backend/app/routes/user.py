from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ..models.user import User, UserCreate, UserUpdate
from ..services.user_service import UserService
from ..auth.jwt_bearer import JWTBearer
from ..auth.jwt_handler import signJWT

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.post("/register", response_model=dict)
async def register_user(user: UserCreate):
    user_service = UserService()
    try:
        new_user = await user_service.create_user(user)
        return {
            "status": "success",
            "message": "User registered successfully",
            "token": signJWT(str(new_user.id))
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/login")
async def login(email: str, password: str):
    user_service = UserService()
    user = await user_service.authenticate_user(email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    return {
        "status": "success",
        "message": "Login successful",
        "token": signJWT(str(user.id))
    }

@router.get("/me", response_model=User)
async def get_current_user(current_user: dict = Depends(JWTBearer())):
    user_service = UserService()
    user = await user_service.get_user(current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.put("/me", response_model=User)
async def update_current_user(
    user_update: UserUpdate,
    current_user: dict = Depends(JWTBearer())
):
    user_service = UserService()
    updated_user = await user_service.update_user(current_user["user_id"], user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return updated_user

@router.delete("/me")
async def delete_current_user(current_user: dict = Depends(JWTBearer())):
    user_service = UserService()
    if await user_service.delete_user(current_user["user_id"]):
        return {"message": "User deleted successfully"}
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )

@router.get("/", response_model=List[User])
async def get_users(
    skip: int = 0,
    limit: int = 10,
    current_user: dict = Depends(JWTBearer())
):
    # Only admin users can list all users
    user_service = UserService()
    current_user_obj = await user_service.get_user(current_user["user_id"])
    if not current_user_obj or current_user_obj.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to perform this action"
        )
    
    return await user_service.get_all_users(skip, limit) 