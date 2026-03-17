from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from services.ai_service import AIService
from loguru import logger

app = FastAPI(title="AI Rewriting Tool API")

# CORS Settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

ai_service = AIService()

class RewriteRequest(BaseModel):
    text: str = Field(None, max_length=2000)
    mode: str = Field(..., pattern="^(polite|short|clear|casual|email|business|summary|refine|business_mail)$")
    original: str = Field(None, max_length=2000)
    points: str = Field(None, max_length=2000)

class RewriteResponse(BaseModel):
    result: str

@app.post("/rewrite", response_model=RewriteResponse)
async def rewrite(request: RewriteRequest):
    try:
        result = await ai_service.rewrite_text(
            text=request.text, 
            mode=request.mode,
            original=request.original,
            points=request.points
        )
        return {"result": result}
    except Exception as e:
        error_msg = str(e)
        logger.error(f"Endpoint Error: {error_msg}")
        
        # 安全なエラーメッセージをクライアントに返す
        if "429" in error_msg or "ResourceExhausted" in error_msg:
            raise HTTPException(status_code=429, detail="APIの利用制限に達しました。しばらく時間をおいてから再試行してください。")
        
        # 500エラー時は詳細を隠す
        raise HTTPException(status_code=500, detail="文章生成中にエラーが発生しました。時間を置いて再度お試しください。")

@app.get("/model")
async def get_model():
    return {"model": ai_service.model_name}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
