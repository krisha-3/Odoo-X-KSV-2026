from pydantic_settings import BaseSettings


class Settings(BaseSettings):
	MONGODB_URI: str = "mongodb://127.0.0.1:27017"
	MONGODB_DB: str = "testdb"

	class Config:
		env_file = ".env"


settings = Settings()

