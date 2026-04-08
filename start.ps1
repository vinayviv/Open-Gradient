# start.ps1
# This script sets up and runs the OpenGuardian AI project locally.

Write-Host "Starting OpenGuardian AI Environment Setup..." -ForegroundColor Cyan

# Setup Application (Frontend & Backend merged)
Push-Location "frontend"
Write-Host "Checking dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Starting Frontend Vite Development server..." -ForegroundColor Green
# Start Vite and wait
npm run dev

Pop-Location
