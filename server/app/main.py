from fastapi import FastAPI

from server.app.db.database import get_database, get_client
from server.app.modules.users import router as users_router

app = FastAPI(title="Minimal FastAPI MongoDB Backend")


@app.on_event("startup")
async def startup_event():
	db = get_database()
	# ensure users collection has unique index on email
	try:
		await db.users.create_index("email", unique=True)
	except Exception:
		pass


@app.on_event("shutdown")
async def shutdown_event():
	client = get_client()
	try:
		client.close()
	except Exception:
		pass


@app.get("/api/ping")
def ping():
	return {"message": "pong"}


app.include_router(users_router, prefix="/api")
