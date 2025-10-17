@echo off
title Auto Push to GitHub
echo ================================================
echo  🚀 Iniciando autoguardado y subida a GitHub...
echo ================================================
:loop
git add .
git commit -m "Auto update"
git push origin main
echo 🔄 Cambios subidos. Esperando 30 segundos...
timeout /t 30 >nul
goto loop
