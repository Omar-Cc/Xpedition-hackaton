# app/core/claude_client.py
from anthropic import AsyncAnthropic
from app.core.config import settings

client = AsyncAnthropic(api_key=settings.anthropic_api_key)