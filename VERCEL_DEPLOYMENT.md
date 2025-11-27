# Vercel Frontend Deployment Guide

## Overview
This is the frontend of the SIS Admin Panel. The frontend is deployed on Vercel, while the backend needs to be deployed separately.

## Deployment Steps for Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit: SIS Admin Panel"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Connect your GitHub repository: `Student_information`
4. Select project root (default `/`)
5. Build settings should auto-detect:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://your-backend-api-url.com/api
GEMINI_API_KEY=your-gemini-key
```

### Step 4: Deploy
Click "Deploy" - Vercel will automatically build and deploy!

## Backend Deployment

The backend (Express.js + MySQL) should be deployed separately to:
- **Heroku** (for Node.js server)
- **AWS** (EC2 or Lambda)
- **DigitalOcean** (App Platform)
- **Railway** (Modern alternative)

See `DEPLOYMENT.md` for backend deployment instructions.

## Environment Variables

### Development (.env.local)
```env
VITE_API_URL=http://localhost:3001/api
GEMINI_API_KEY=your-dev-key
```

### Production (Vercel)
```env
VITE_API_URL=https://your-api.com/api
GEMINI_API_KEY=your-production-key
```

## Build Output
- Frontend builds to `dist/` folder
- Vercel automatically serves from `dist/`
- All routes handled by React Router or fallback

## Features
- ✅ Dashboard with statistics
- ✅ Students management (CRUD)
- ✅ Courses management (CRUD)
- ✅ Instructors management (CRUD)
- ✅ Departments management (CRUD)
- ✅ Enrollments management (CRUD)
- ✅ Fees management (CRUD)
- ✅ Responsive design
- ✅ Dark mode ready

## Troubleshooting

### Issue: API calls fail in production
**Solution**: Ensure `VITE_API_URL` environment variable is set correctly in Vercel

### Issue: Build fails
**Solution**: Check `npm run build` works locally first

### Issue: Styles not loading
**Solution**: Verify CSS imports in components

## Redeployment

Changes automatically deploy when you push to GitHub:
```bash
git add .
git commit -m "Feature: description"
git push origin main
```

Vercel watches the repository and automatically rebuilds and deploys!

## Performance Tips
- Build size should be < 500KB (gzip)
- Use Vercel Analytics to monitor performance
- Enable caching headers in vercel.json
- Optimize images and assets

## Documentation
- See `README.md` for project overview
- See `DEPLOYMENT.md` for complete deployment guide
- See `GITHUB_SETUP.md` for GitHub configuration
