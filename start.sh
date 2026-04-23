#!/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"

cleanup() {
  echo ""
  echo "Shutting down..."
  kill "$BE_PID" "$FE_PID" 2>/dev/null
  exit 0
}
trap cleanup INT TERM

echo "Starting backend..."
source "$ROOT/backend/app/.venv/bin/activate"
cd "$ROOT/backend" && python -m uvicorn app.main:app --reload &
BE_PID=$!

echo "Starting frontend..."
cd "$ROOT/my-app" && npm run dev &
FE_PID=$!

echo ""
echo "Backend → http://localhost:8000"
echo "Frontend → http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both."

wait
