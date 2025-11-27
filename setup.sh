#!/bin/bash

# Development Setup Script for SIS Admin Panel

set -e

echo "🚀 Setting up SIS Admin Panel..."

# Frontend setup
echo "📦 Setting up frontend..."
cp .env.example .env.local
echo "✅ Frontend .env.local created"

# Backend setup
echo "📦 Setting up backend..."
cd backend
cp .env.example .env
echo "✅ Backend .env created"
cd ..

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Configure your environment variables:"
echo "   - Frontend: Edit .env.local and add GEMINI_API_KEY"
echo "   - Backend: Edit backend/.env with your MySQL credentials"
echo ""
echo "2. Install dependencies:"
echo "   npm install"
echo "   cd backend && npm install && cd .."
echo ""
echo "3. Start the application:"
echo "   Terminal 1: cd backend && npm start"
echo "   Terminal 2: npm run dev"
echo ""
echo "💾 To deploy, see DEPLOYMENT.md"
