import asyncio
import os
from services.ai_service import AIService

async def test():
    service = AIService()
    try:
        print("Testing rewrite...")
        result = await service.rewrite_text("これはテスト文章です。短くしてください。", "short")
        print(f"Result: {result}")
    except Exception as e:
        print(f"Error caught: {type(e).__name__}: {str(e)}")

if __name__ == "__main__":
    asyncio.run(test())
