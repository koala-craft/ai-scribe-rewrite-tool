@echo off
setlocal
set PROJECT_ROOT=%~dp0

echo Starting AI Scribe Rewrite Tool...

:: Backend Setup & Start
echo [1/2] Launching Backend...
start "Backend (FastAPI)" cmd /k "cd /d %PROJECT_ROOT%backend && .\venv\Scripts\activate && uvicorn main:app --reload"

:: Frontend Setup & Start
echo [2/2] Launching Frontend...
start "Frontend (Next.js)" cmd /k "cd /d %PROJECT_ROOT%frontend && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo - Backend: http://127.0.0.1:8000
echo - Frontend: http://localhost:3000
echo.
pause
