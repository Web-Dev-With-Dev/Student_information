#!/bin/bash
# Deployment script for Vercel

echo "Installing frontend dependencies..."
npm install

echo "Building frontend..."
npm run build

echo "✅ Frontend build complete!"
echo "Dist folder ready for deployment"
