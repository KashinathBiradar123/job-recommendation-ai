@echo off
echo ========================================
echo    CareerGenie AI - Setup Script
echo ========================================
echo.

echo [1/3] Setting up Python backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
echo Backend setup complete!
echo.

echo [2/3] Setting up React frontend...
cd ..\frontend
npm install
echo Frontend setup complete!
echo.

echo [3/3] Done! 
echo.
echo To run the project:
echo   Terminal 1 - Backend:
echo     cd backend
echo     venv\Scripts\activate
echo     python main.py
echo.
echo   Terminal 2 - Frontend:
echo     cd frontend
echo     npm start
echo.
echo Open http://localhost:3000 in your browser
pause
