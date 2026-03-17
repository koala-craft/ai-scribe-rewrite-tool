# AI Scribe Rewrite Tool

AIを活用して、ビジネスメールの作成や文章のリライトを行うWebアプリケーションです。
「伝えたい要点」を入力するだけで、文脈を汲み取った自然なビジネスメールを生成します。

## 主な機能

- **メール作成・返信**:
  - 受信メールの原文がある場合は、その内容を汲み取った自然な返信を生成。
  - 要点のみから新規メールを構築。
  - 重複や無駄な表現を省いた、洗練されたビジネス日本語を出力。
- **文章リライト**:
  - 「丁寧」「要約」「簡潔」「カジュアル」の4つのモードで既存の文章をブラッシュアップ。
  - 2段階のAI処理（構造分析 → スタイル変換）により、意味を変えずに質を向上。

## 技術スタック

- **Frontend**: Next.js 15, React, Tailwind CSS (Lucide Icons)
- **Backend**: FastAPI (Python 3.10+), Uvicorn
- **AI**: Gemini 1.5 Flash / Groq (Llama 3.3 70B)

## セットアップガイド

### 1. 準備

- Python 3.10 以上がインストールされていること
- Node.js (npm) がインストールされていること

### 2. インストール

#### バックエンドのセットアップ
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

#### フロントエンドのセットアップ
```bash
cd ../frontend
npm install
```

### 3. 環境設定

`backend/.env` ファイルを作成し、APIキーを設定してください。

**Groqを使用する場合:**
```env
AI_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

**Geminiを使用する場合:**
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
```

### 4. 起動

ルートディレクトリにある `dev.bat` を実行すると、バックエンドとフロントエンドが別ウィンドウで同時に起動します。

```bash
.\dev.bat
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
