# Government Scheme Recommendation System - Auto Start Script

Write-Host "--- Starting Government Scheme Recommendation System ---" -ForegroundColor Cyan

# 1. Start Backend
Write-Host "Step 1: Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; node server.js" -WindowStyle Normal

# 2. Start Frontend
Write-Host "Step 2: Starting Frontend (Vite)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd mp-frontend--main; npm run dev" -WindowStyle Normal

Write-Host "SUCCESS: Both servers are starting in separate windows." -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend: http://localhost:5000" -ForegroundColor White
