# GitHub & Deployment Setup Guide

## Step 1: Initialize Git Repository

### Open Terminal in Project Root
```powershell
cd c:\Users\gonda\OneDrive\Desktop\sis-admin-panel
```

### Initialize Git
```powershell
git init
git add .
git commit -m "Initial commit: SIS Admin Panel with database connection"
```

---

## Step 2: Add GitHub Remote

### Add Your Repository
```powershell
git remote add origin https://github.com/Web-Dev-With-Dev/Student_information.git
```

### Verify Remote
```powershell
git remote -v
```

Should show:
```
origin  https://github.com/Web-Dev-With-Dev/Student_information.git (fetch)
origin  https://github.com/Web-Dev-With-Dev/Student_information.git (push)
```

---

## Step 3: Push to GitHub

### Set Main Branch
```powershell
git branch -M main
```

### Push All Code
```powershell
git push -u origin main
```

### First Time Push
If prompted, authenticate with GitHub:
- Use your GitHub username
- Use Personal Access Token (not password)

---

## Step 4: Deploy Frontend on Vercel

### Option A: Direct GitHub Integration (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import GitHub Repository**
   - Authorize Vercel with GitHub
   - Select `Student_information` repository
   - Click "Import"

4. **Configure Build Settings**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Root Directory: `./` (default)

5. **Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_API_URL = https://your-backend-api.com/api
   GEMINI_API_KEY = your-gemini-key
   ```

6. **Click "Deploy"**
   - Vercel automatically builds and deploys
   - You get a URL like: `your-app-name.vercel.app`

---

## Step 5: Deploy Backend on Railway (Recommended)

Railway is the easiest option for deploying Node.js + MySQL.

### Step 1: Create Railway Project
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Authorize and select `Student_information`

### Step 2: Configure Services
1. Click "Add Service"
2. Search "MySQL" and add
3. MySQL will be automatically configured

### Step 3: Add Backend Service
1. In your Railway project
2. Select GitHub as source
3. Choose `Student_information` repo
4. Set root directory to `/backend`
5. Set start command to `npm start`

### Step 4: Set Environment Variables
In Railway Dashboard → Variables → Add:
```
NODE_ENV=production
PORT=3000
DB_HOST=${{ MYSQLHOST }}
DB_USER=${{ MYSQLUSER }}
DB_PASSWORD=${{ MYSQLPASSWORD }}
DB_DATABASE=${{ MYSQLDATABASE }}
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

Railway automatically provides MySQL credentials as environment variables!

### Step 5: Deploy
Click "Deploy" - Railway deploys automatically!

Your backend will be at: `your-app-name.railway.app`

---

## Step 6: Connect Frontend to Backend

### After Both Are Deployed

1. **Get Backend URL** from Railway or your deployment platform
2. **Update Vercel Environment Variable**:
   - Go to Vercel Project Settings
   - Environment Variables
   - Change `VITE_API_URL` to your backend URL:
     ```
     VITE_API_URL=https://your-backend-railway.app/api
     ```
3. **Redeploy Frontend**
   - Vercel will automatically redeploy
   - Or push a new commit to trigger redeploy

---

## Step 7: Test Deployment

### Test Frontend
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Verify the UI loads
3. Check browser console for errors

### Test Backend
```bash
curl https://your-backend.railway.app/api/ping
# Should return: {"message":"pong"}
```

### Test Full Connection
1. In deployed frontend, go to Students page
2. Should see students data from production database
3. Try adding a new student
4. Verify it appears in list and database

---

## Complete Deployment Workflow

```
┌─────────────────────────────────────────────────────┐
│ 1. Code locally and test                            │
│    npm run dev (frontend)                           │
│    npm start (backend)                              │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│ 2. Push to GitHub                                   │
│    git add .                                        │
│    git commit -m "message"                          │
│    git push origin main                             │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│ 3. GitHub Workflows Run (automatic)                 │
│    - Build check                                    │
│    - Tests (if configured)                          │
└──────────────┬──────────────────────────────────────┘
               │
        ┌──────┴─────┐
        │             │
┌───────▼────┐  ┌────▼────────┐
│ Vercel     │  │ Railway     │
│ Auto-      │  │ Auto-       │
│ deploys    │  │ deploys     │
│ Frontend   │  │ Backend     │
└───────┬────┘  └────┬────────┘
        │             │
        └──────┬──────┘
               │
        ┌──────▼─────────────┐
        │ ✅ Live & Working  │
        │ Users can access   │
        └────────────────────┘
```

---

## Continuous Deployment

After initial setup, every push to `main` automatically:
1. ✅ Triggers GitHub Workflows
2. ✅ Runs build check
3. ✅ Deploys to Vercel (frontend)
4. ✅ Deploys to Railway (backend)
5. ✅ No manual intervention needed!

---

## URLs After Deployment

### Frontend (Vercel)
- Main: `https://your-app-name.vercel.app`
- Preview: Each PR gets unique URL

### Backend (Railway)
- API: `https://your-backend-name.railway.app`
- Health: `https://your-backend-name.railway.app/api/ping`

### Git Repository
- GitHub: `https://github.com/Web-Dev-With-Dev/Student_information`
- Clone: `git clone https://github.com/Web-Dev-With-Dev/Student_information.git`

---

## Troubleshooting

### Issue: Vercel says "No build output"
**Solution**: 
- Check `vercel.json` is in root
- Verify build command: `npm run build`
- Check `dist` folder created locally

### Issue: Backend can't connect to database on Railway
**Solution**:
- Use Railway's provided env vars: `${{ MYSQLHOST }}` etc.
- Don't hardcode credentials
- Check MySQL service is running in Railway dashboard

### Issue: Frontend can't reach backend
**Solution**:
- Set `VITE_API_URL` to correct backend URL
- Include `/api` at end of URL
- Check CORS_ORIGIN in backend matches frontend URL
- Redeploy after changing env vars

### Issue: Build fails on Vercel
**Solution**:
```bash
# Test build locally
npm run build

# Check for errors
# Fix any TypeScript errors
# Re-push to GitHub
```

### Issue: Git push rejected
**Solution**:
```bash
# Pull latest changes
git pull origin main --rebase

# Then push
git push origin main
```

---

## Environment Variables Checklist

### Frontend (Vercel)
- [ ] `VITE_API_URL` = backend URL
- [ ] `GEMINI_API_KEY` = API key

### Backend (Railway)
- [ ] `NODE_ENV` = production
- [ ] `DB_HOST` = `${{ MYSQLHOST }}`
- [ ] `DB_USER` = `${{ MYSQLUSER }}`
- [ ] `DB_PASSWORD` = `${{ MYSQLPASSWORD }}`
- [ ] `DB_DATABASE` = `${{ MYSQLDATABASE }}`
- [ ] `CORS_ORIGIN` = frontend URL

---

## Monitoring & Updates

### View Logs
- **Vercel**: Dashboard → Deployments → Logs
- **Railway**: Dashboard → Logs tab

### Monitor Performance
- **Vercel Analytics**: https://vercel.com/analytics
- **Railway Metrics**: Dashboard → Metrics

### Update Code
```bash
# Make changes locally
# Test thoroughly
git add .
git commit -m "Feature: description"
git push origin main
# Automatic deployment happens!
```

---

## Production Checklist

Before going live:
- [ ] Database backups configured
- [ ] Environment variables secure
- [ ] CORS properly restricted
- [ ] SSL certificates valid
- [ ] Error logging configured
- [ ] Monitoring alerts set
- [ ] Tested all features
- [ ] Performance acceptable
- [ ] Security issues fixed
- [ ] Documentation updated

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy frontend on Vercel
3. ✅ Deploy backend on Railway
4. ✅ Update environment variables
5. ✅ Test deployment
6. ✅ Monitor for errors
7. ✅ Share URLs with team

**Result**: Live SIS Admin Panel accessible to everyone! 🚀

See `VERCEL_DEPLOYMENT.md` and `BACKEND_DEPLOYMENT.md` for specific platform details.
