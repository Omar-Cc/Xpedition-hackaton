# app/core/ai_client.py
from groq import AsyncGroq
from app.core.config import settings

client = AsyncGroq(api_key=settings.groq_api_key)