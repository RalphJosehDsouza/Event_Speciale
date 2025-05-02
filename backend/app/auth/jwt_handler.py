import time
import jwt
from typing import Dict
from decouple import config

JWT_SECRET = config("JWT_SECRET", default="your-secret-key")
JWT_ALGORITHM = config("JWT_ALGORITHM", default="HS256")

def token_response(token: str) -> Dict[str, str]:
    return {
        "access_token": token,
        "token_type": "bearer",
    }

def signJWT(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 24 * 60 * 60  # 24 hours
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)

def decodeJWT(token: str) -> Dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return None 