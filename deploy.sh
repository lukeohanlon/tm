#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the backend container 
cd "$SCRIPT_DIR/backend"
docker stop backend-container || true 
docker rm backend-container || true
docker run -d -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a --name backend-container app

# Build the frontend
cd "$SCRIPT_DIR/frontend"
npm install
npm run build     
npm run serve       

