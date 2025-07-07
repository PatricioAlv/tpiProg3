@echo off
echo ========================================
echo     TaskManager - Limpiar Base de Datos
echo ========================================
echo.

echo Deteniendo procesos...
taskkill /f /im dotnet.exe /T 2>nul
timeout /t 2 /nobreak > nul

echo Eliminando base de datos antigua...
cd TaskManager.API
del TaskManager.db 2>nul
del TaskManager.db-shm 2>nul
del TaskManager.db-wal 2>nul

echo Base de datos eliminada.
echo.
echo Reiniciando API...
start "TaskManager API (Limpia)" cmd /k "dotnet run"

echo.
echo ========================================
echo     Base de datos limpia - Lista para usar
echo ========================================
echo.
echo Ahora puedes registrar usuarios nuevos.
echo.
pause
