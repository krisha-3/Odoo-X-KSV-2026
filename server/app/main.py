from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db.database import get_database, get_client
from .modules.users import router as users_router
from .modules.auth.router import router as auth_router

app = FastAPI(title="Minimal FastAPI MongoDB Backend")

# Allow CORS for frontend during development
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


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
app.include_router(auth_router, prefix="/api/v1")
