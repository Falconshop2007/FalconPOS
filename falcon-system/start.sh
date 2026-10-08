#!/usr/bin/env bash
# Starts a tiny local web server and opens the app
cd "$(dirname "$0")"
echo "Falcon System running at http://localhost:8080  (press Ctrl+C to stop)"
( sleep 1; command -v xdg-open >/dev/null && xdg-open http://localhost:8080 || command -v open >/dev/null && open http://localhost:8080 ) >/dev/null 2>&1 &
python3 -m http.server 8080
