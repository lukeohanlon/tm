#!/bin/bash
set -e

# Pull and run the Docker images on the EC2 instance
ssh -i "MedTracker.pem" $EC2_USERNAME@$EC2_PUBLIC_DNS "
  docker pull lukeohanlon/frontend:latest
  docker pull lukeohanlon/backend:latest

  cd backend # Switch to the backend directory
  docker run --rm -it -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=5e45f0cf35578dc9627cc6fd23e6954a lukeohanlon/backend:latest &
"

cd frontend # Switch back to the frontend directory
npm install
npm start
