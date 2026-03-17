from openai import OpenAI
from .base import BaseProvider

class GroqProvider(BaseProvider):
    def __init__(self, api_key: str, model: str = "llama-3.3-70b-versatile"):
        # Groq API endpoint
        base_url = "https://api.groq.com/openai/v1"
        self.model = model
            
        self.client = OpenAI(
            api_key=api_key,
            base_url=base_url,
        )

    async def generate_content(self, prompt: str) -> str:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "user", "content": prompt},
            ],
        )
        content = response.choices[0].message.content
        if not content:
            raise ValueError("Empty response from Groq")
        return content.strip()
