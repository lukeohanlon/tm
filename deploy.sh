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
