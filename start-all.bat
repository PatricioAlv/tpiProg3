@echo off
echo ========================================
echo      TaskManager - Inicio del Sistema
echo ========================================
echo.

echo Iniciando los componentes del sistema...
echo.

echo [1/3] Iniciando API RESTful...
start "TaskManager API" cmd /k "cd /d %~dp0TaskManager.API && dotnet run --launch-profile http"
timeout /t 3 /nobreak > nul

echo [2/3] Iniciando aplicación MVC...
start "TaskManager MVC" cmd /k "cd /d %~dp0TaskManager.MVC && dotnet run"
timeout /t 3 /nobreak > nul

echo [3/3] Iniciando SPA React...
start "TaskManager SPA" cmd /k "cd /d %~dp0TaskManager.SPA && npm start"
timeout /t 3 /nobreak > nul

echo.
echo ========================================
echo     Componentes iniciados exitosamente
echo ========================================
echo.
echo URLs de acceso:
echo   - API: http://localhost:5000
echo   - MVC: http://localhost:5001
echo   - SPA: http://localhost:3000
echo.
echo Presione cualquier tecla para continuar...
pause > nul
