#!/bin/bash
set -e

# Stop and remove all Docker containers
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Deploy the backend container
cd "$SCRIPT_DIR/backend"
# docker ps -q --filter "expose=3000" | xargs -r docker stop
docker build -t app .
docker run -d -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a app

# Deploy the frontend
cd "$SCRIPT_DIR/frontend"
npm install
npm run build
serve -l 3001
