@echo off
echo ========================================
echo BLS CES Digital Survey System
echo ========================================
echo.
echo This will start BOTH backend and frontend
echo in separate windows.
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause

echo Starting Backend...
start "BLS CES Backend" cmd /k "cd /d %~dp0backend\BLS.CES.API && dotnet restore && dotnet run"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "BLS CES Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend window:  Wait for "Now listening on: http://localhost:5000"
echo Frontend window: Wait for "Local: http://localhost:3000"
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause

