#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the backend container
cd "$SCRIPT_DIR/backend"
if docker ps -a --format '{{.Names}}' | grep -q '^backend-container$'; then
  docker stop backend-container || true
  docker rm backend-container || true
fi
docker run -d -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a --name backend-container app

# Build and run the frontend
cd "$SCRIPT_DIR/frontend"
npm install
docker stop frontend-container || true
docker rm frontend-container || true
docker build -t frontend-image .
docker run -d -p 3001:3001 --name frontend-container frontend-image
