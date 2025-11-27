# Backend Deployment Guide

## Overview
Deploy the Express.js backend with MySQL connection to production.

## Option 1: Deploy to Railway (Recommended - Easiest)

### Step 1: Setup Railway
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select `Student_information` repository

### Step 2: Configure Backend Service
1. In Railway Dashboard, click "New Service"
2. Add MySQL database
3. Select your GitHub repo as app source
4. Set working directory to `/backend`

### Step 3: Set Environment Variables
In Railway → Variables:
```
NODE_ENV=production
PORT=3000
DB_HOST=your-mysql-host.railway.app
DB_USER=root
DB_PASSWORD=your-secure-password
DB_DATABASE=sis_db
CORS_ORIGIN=https://your-vercel-frontend.vercel.app
```

### Step 4: Deploy
Railway automatically deploys when you push to GitHub!

**Frontend URL**: https://your-vercel-app.vercel.app
**Backend URL**: https://your-backend-railway.app

---

## Option 2: Deploy to Heroku

### Prerequisites
- Heroku account (heroku.com)
- Heroku CLI installed
- MySQL database (use ClearDB or JawsDB)

### Step 1: Login to Heroku
```bash
heroku login
```

### Step 2: Create Heroku App
```bash
heroku create your-sis-backend
```

### Step 3: Add MySQL Database
```bash
heroku addons:create jawsdb:kitefin
```

### Step 4: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
heroku config:set CORS_ORIGIN=https://your-vercel-frontend.vercel.app
# Get these from your database provider
heroku config:set DB_HOST=your-db-host
heroku config:set DB_USER=your-db-user
heroku config:set DB_PASSWORD=your-db-password
heroku config:set DB_DATABASE=sis_db
```

### Step 5: Deploy Backend Only
```bash
# Deploy backend folder to Heroku
git subtree push --prefix backend heroku main
```

---

## Option 3: Deploy to AWS EC2

### Prerequisites
- AWS account
- EC2 instance running Ubuntu 20.04 or later
- MySQL database (RDS)

### Step 1: SSH into EC2
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

### Step 2: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3: Clone Repository
```bash
git clone https://github.com/Web-Dev-With-Dev/Student_information.git
cd Student_information/backend
npm install
```

### Step 4: Create .env File
```bash
nano .env
```
Add:
```env
NODE_ENV=production
PORT=3000
DB_HOST=your-rds-endpoint
DB_USER=admin
DB_PASSWORD=secure-password
DB_DATABASE=sis_db
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

### Step 5: Start with PM2
```bash
npm install -g pm2
pm2 start server.js --name "sis-backend"
pm2 startup
pm2 save
```

### Step 6: Setup Nginx Reverse Proxy
```bash
sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then:
```bash
sudo systemctl restart nginx
```

---

## Database Setup for Production

### Create Database
```bash
mysql -u root -p -h your-db-host << EOF
CREATE DATABASE sis_db;
USE sis_db;
-- Run database.sql here
EOF
```

### Or Import from File
```bash
mysql -u root -p -h your-db-host sis_db < database.sql
```

---

## Environment Variables Summary

### Production Environment
```env
NODE_ENV=production
PORT=3000 (or assigned by platform)
DB_HOST=production-db-host
DB_USER=db-username
DB_PASSWORD=secure-password
DB_DATABASE=sis_db
CORS_ORIGIN=https://your-frontend-domain.com
```

### Security Notes
- ❌ Never commit .env files
- ✅ Use platform environment variable settings
- ✅ Use strong database passwords
- ✅ Restrict CORS to your frontend domain only
- ✅ Use HTTPS only in production
- ✅ Enable SSL/TLS certificates

---

## API Endpoints (Production)

After deployment, your API will be available at:
```
https://your-backend-api.com/api/students
https://your-backend-api.com/api/courses
https://your-backend-api.com/api/instructors
https://your-backend-api.com/api/departments
https://your-backend-api.com/api/enrollments
https://your-backend-api.com/api/fees
https://your-backend-api.com/api/dashboard/stats
https://your-backend-api.com/api/ping
```

---

## Monitoring & Logs

### Railway
- Dashboard shows real-time logs
- Auto-restart on failure

### Heroku
```bash
heroku logs --tail
```

### AWS EC2
```bash
pm2 logs
# or
tail -f /var/log/nginx/error.log
```

---

## Continuous Deployment

All platforms automatically redeploy when you push to GitHub:

```bash
git add .
git commit -m "Fix: description"
git push origin main
```

The backend will automatically:
1. Build with `npm install`
2. Start with configured start command
3. Connect to production database
4. Serve API requests

---

## Troubleshooting

### Issue: Database connection failed
- Verify DB credentials in environment variables
- Check network access (firewall rules)
- Ensure MySQL user has proper permissions

### Issue: CORS errors
- Check `CORS_ORIGIN` matches frontend URL exactly
- Include protocol (https://)
- Include full domain, no trailing slash

### Issue: 502 Bad Gateway
- Check if server is running: `pm2 logs` or platform logs
- Verify PORT is correctly set
- Check error messages in logs

### Issue: Slow response times
- Check database query performance
- Add database indexes
- Enable caching
- Monitor CPU/Memory usage

---

## Deployment Checklist

Before deploying to production:
- [ ] Database credentials secure
- [ ] CORS_ORIGIN set correctly
- [ ] Environment variables all set
- [ ] No `.env` file committed to GitHub
- [ ] `package.json` has Node version specified
- [ ] `Procfile` present (for Heroku)
- [ ] Database schema imported
- [ ] Test API endpoints
- [ ] Monitor logs for errors
- [ ] Setup SSL/HTTPS
- [ ] Configure backups
- [ ] Setup monitoring/alerts

---

## Quick Deployment (All 3 Options)

### Railway (30 seconds)
```
1. Go to railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select Student_information
4. Set environment variables
5. Deploy!
```

### Heroku (2 minutes)
```bash
heroku create your-app
heroku addons:create jawsdb:kitefin
heroku config:set [your-vars]
git subtree push --prefix backend heroku main
```

### AWS (10 minutes)
```bash
# SSH, clone, install, configure, deploy
```

---

## Next Steps

1. Choose deployment platform (Railway recommended)
2. Deploy backend
3. Get backend URL
4. Update frontend VITE_API_URL in Vercel
5. Test all API endpoints
6. Monitor logs for issues
7. Setup backups and monitoring

**Result**: Live production SIS Admin Panel! 🚀
