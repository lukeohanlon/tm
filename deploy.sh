#!/bin/bash
set -e

# Pull and run the Docker images on the EC2 instance
# ssh -i "MedTracker.pem" $EC2_USERNAME@$EC2_PUBLIC_DNS '
  'docker pull lukeohanlon/frontend:latest
  docker pull lukeohanlon/backend:latest

  # Run the backend container
  docker stop backend-container || true # Stop and remove the existing container if it's running
  docker rm backend-container || true
  docker run -d -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a --name backend-container lukeohanlon/backend:latest
'

# Build and run the frontend
cd frontend
npm install
docker stop frontend-container || true # Stop and remove the existing container if it's running
docker rm frontend-container || true
docker build -t frontend-image .
docker run -d -p 3001:3001 --name frontend-container frontend-image
