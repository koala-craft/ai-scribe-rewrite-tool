from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    ai_provider: str = "gemini"
    gemini_api_key: str = ""
    groq_api_key: str = ""
    groq_model: str = "llama-3.3-70b-versatile"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

@lru_cache()
def get_settings():
    return Settings()
