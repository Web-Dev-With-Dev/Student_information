@echo off
REM Development Setup Script for SIS Admin Panel (Windows)

echo 🚀 Setting up SIS Admin Panel...

REM Frontend setup
echo 📦 Setting up frontend...
if not exist .env.local (
    copy .env.example .env.local
    echo ✅ Frontend .env.local created
) else (
    echo ⚠️  .env.local already exists
)

REM Backend setup
echo 📦 Setting up backend...
cd backend
if not exist .env (
    copy .env.example .env
    echo ✅ Backend .env created
) else (
    echo ⚠️  .env already exists
)
cd ..

echo.
echo ✨ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Configure your environment variables:
echo    - Frontend: Edit .env.local and add GEMINI_API_KEY
echo    - Backend: Edit backend\.env with your MySQL credentials
echo.
echo 2. Install dependencies:
echo    npm install
echo    cd backend ^&^& npm install ^&^& cd ..
echo.
echo 3. Start the application:
echo    Terminal 1: cd backend ^&^& npm start
echo    Terminal 2: npm run dev
echo.
echo 💾 To deploy, see DEPLOYMENT.md
