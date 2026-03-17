import google.generativeai as genai
from .base import BaseProvider

class GeminiProvider(BaseProvider):
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        # 404エラー回避のため安定版モデルを指定
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    async def generate_content(self, prompt: str) -> str:
        response = self.model.generate_content(prompt)
        if not response.text:
            raise ValueError("Empty response from Gemini")
        return response.text.strip()
