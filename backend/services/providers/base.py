from abc import ABC, abstractmethod

class BaseProvider(ABC):
    @abstractmethod
    async def generate_content(self, prompt: str) -> str:
        pass
