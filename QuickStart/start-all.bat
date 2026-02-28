@echo off
echo ======================================
echo   RecyclEye - Tam Sistem Baslatiyor
echo ======================================
echo.
echo [1/2] Backend baslatiyor...
start "RecyclEye Backend" cmd /k "cd backend && py -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

timeout /t 3 /nobreak >nul

echo [2/2] Mobile uygulama baslatiyor...
start "RecyclEye Mobile" cmd /k "cd mobile && npx expo start"

echo.
echo ======================================
echo   Tum servisler baslatildi!
echo ======================================
echo   Backend: http://localhost:8000
echo   Mobile: Expo Developer Tools acildi
echo ======================================
