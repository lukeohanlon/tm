#!/bin/bash
set -e

# Run the backend container
# cd backend
docker run -d -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a --name backend-container app

# Build and run the frontend
cd ../frontend
npm install
docker stop frontend-container || true # Stop and remove the existing container if it's running
docker rm frontend-container || true
docker build -t frontend-image .
docker run -d -p 3001:3001 --name frontend-container frontend-image