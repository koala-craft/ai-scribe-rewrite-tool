from loguru import logger
from config import get_settings
from .providers.gemini import GeminiProvider
from .providers.groq import GroqProvider
from . import prompts

class AIService:
    # ユーザーからのモード入力をシステム内部のタスク名に変換
    MODE_MAP = {
        "polite": "business",
        "short": "summary",
        "clear": "refine",
        "casual": "casual",
        "email": "email",
        "business_mail": "email"
    }

    def __init__(self):
        settings = get_settings()
        self.provider = self._get_provider(settings)
        
    def _get_provider(self, settings):
        provider_name = settings.ai_provider.lower().strip()
        if provider_name in ("groq", "xai"):
            logger.info(f"Using Groq provider with model: {settings.groq_model}")
            model_id = settings.groq_model.split("/")[-1]
            display_model = model_id.replace("-", " ").title()
            self.model_name = f"Groq ({display_model})"
            return GroqProvider(api_key=settings.groq_api_key, model=settings.groq_model)
        else:
            logger.info("Using Gemini provider")
            self.model_name = "Gemini 1.5 Flash"
            return GeminiProvider(api_key=settings.gemini_api_key)

    async def rewrite_text(self, text: str, mode: str, original: str = None, points: str = None) -> str:
        """ユーザーの要求に応じて、文章を変換またはメール返信を生成する。"""
        try:
            task = self.MODE_MAP.get(mode, mode)

            if task == "email":
                return await self.generate_email_reply(
                    original=original or "",
                    points=points or text
                )

            return await self.generate_text(text, task)
        except Exception as e:
            logger.error(f"AI Service Error during task '{mode}': {str(e)}")
            raise e

    async def generate_email_reply(self, original: str, points: str) -> str:
        """要点からビジネスメールを構築する。原文がある場合は返信、ない場合は新規作成。"""
        logger.info(f"Generating business email (has_original: {bool(original.strip())})")

        if original.strip():
            prompt = prompts.EMAIL_REPLY_WITH_ORIGINAL_TEMPLATE.format(
                original=original,
                points=points
            )
        else:
            prompt = prompts.EMAIL_NEW_PROMPT_TEMPLATE.format(
                points=points
            )

        return await self.provider.generate_content(prompt)

    async def generate_text(self, text: str, task: str) -> str:
        """文章を分析した上で、指定されたスタイルに整理・変換する（単一API呼び出し）。"""
        logger.info(f"Starting text transformation task: {task}")

        instruction = prompts.TASK_INSTRUCTIONS.get(task, prompts.TASK_INSTRUCTIONS["refine"])
        prompt = prompts.REWRITE_PROMPT_TEMPLATE.format(
            instruction=instruction,
            text=text
        )

        return await self.provider.generate_content(prompt)
