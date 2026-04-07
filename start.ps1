# start.ps1
# This script sets up and runs the OpenGuardian AI project locally.

Write-Host "Starting OpenGuardian AI Environment Setup..." -ForegroundColor Cyan

# 1. Setup Backend
Push-Location "backend"
Write-Host "Checking Backend dependencies..." -ForegroundColor Yellow
npm install
Write-Host "Starting Node.js Backend Server on port 8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node --watch server.js"
Pop-Location

# 2. Setup Frontend
Push-Location "frontend"
Write-Host "Checking Frontend dependencies..." -ForegroundColor Yellow
# Run npm install if node_modules is missing or not fully populated
npm install
Write-Host "Starting Frontend Vite Development server..." -ForegroundColor Green
# Start Vite and wait
npm run dev
Pop-Location
