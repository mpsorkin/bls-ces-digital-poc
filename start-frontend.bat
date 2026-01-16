@echo off
echo Starting BLS CES Frontend...
echo.
cd frontend
echo Current directory: %CD%
echo.
echo Installing dependencies (first time only)...
call npm install
echo.
echo Starting frontend server...
echo Frontend will be available at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
call npm run dev
pause

