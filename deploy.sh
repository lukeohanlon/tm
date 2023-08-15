#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the backend container
cd "$SCRIPT_DIR/backend"
docker build -t app .
docker run -d -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a app

cd "$SCRIPT_DIR/frontend"
npm install
npm run build

# Copy the built assets to the Nginx web directory (usually /var/www/html)
cp -R build/* /var/www/html/