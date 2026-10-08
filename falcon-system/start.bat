@echo off
cd /d "%~dp0"
echo Falcon System running at http://localhost:8080  (close this window to stop)
start "" http://localhost:8080
python -m http.server 8080 || py -m http.server 8080
