#!/bin/bash
set -e

# Build the Docker images
docker build -t frontend-image:latest ./frontend
docker build -t backend-image:latest ./backend

# Tag the Docker images for Docker Hub
docker tag frontend-image:latest $DOCKER_USERNAME/frontend:latest
docker tag backend-image:latest $DOCKER_USERNAME/backend:latest

# Push the Docker images to Docker Hub
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker push $DOCKER_USERNAME/frontend:latest
docker push $DOCKER_USERNAME/backend:latest

# Deploy to your EC2 instance using SSH
ssh -i "MedTracker.pem" $EC2_USERNAME@$EC2_PUBLIC_DNS "cd tm/backend && docker run --rm -it -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a app"
ssh -i "MedTracker.pem" $EC2_USERNAME@$EC2_PUBLIC_DNS "cd tm/frontend && docker run -d -p 80:80 lukeohanlon/frontend:latest"
