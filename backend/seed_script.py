import sys
sys.path.append('.')
from app.seed import seed_events
import asyncio

if __name__ == "__main__":
    asyncio.run(seed_events()) 