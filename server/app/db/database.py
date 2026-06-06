from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient
from server.app.core.config import settings

_client: Optional[AsyncIOMotorClient] = None


def get_client() -> AsyncIOMotorClient:
	global _client
	if _client is None:
		_client = AsyncIOMotorClient(settings.MONGODB_URI)
	return _client


def get_database():
	client = get_client()
	return client[settings.MONGODB_DB]
