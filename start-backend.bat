@echo off
echo Starting BLS CES Backend API...
echo.
cd backend\BLS.CES.API
echo Current directory: %CD%
echo.
echo Restoring packages...
call dotnet restore
echo.
echo Starting backend server...
echo Backend will be available at http://localhost:5000
echo Swagger documentation at http://localhost:5000/swagger
echo.
echo Press Ctrl+C to stop the server
echo.
call dotnet run
pause

