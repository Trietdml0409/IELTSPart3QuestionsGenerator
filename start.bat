@echo off
SET ROOT=%~dp0

echo Starting backend...
start "Backend" cmd /k "cd /d %ROOT%backend && call app\.venv\Scripts\activate && python -m uvicorn app.main:app --reload"

echo Starting frontend...
start "Frontend" cmd /k "cd /d %ROOT%my-app && npm run dev"

echo.
echo Backend  ^> http://localhost:8000
echo Frontend ^> http://localhost:3000
echo.
echo Close the Backend and Frontend windows to stop both services.
