# Deployment Guide

This guide covers deploying the SIS Admin Panel to production environments.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database setup and migrations completed
- [ ] API keys securely stored
- [ ] Frontend built and tested
- [ ] Backend tested locally
- [ ] Security considerations addressed

## Frontend Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy Options

#### 1. **Static Hosting (Vercel, Netlify, GitHub Pages)**

```bash
# Build the frontend
npm run build

# Deploy the dist/ folder to your hosting service
# Update VITE_API_URL to point to your backend URL
```

**Example for Vercel:**
```bash
npm i -g vercel
vercel
```

#### 2. **Node.js Server (Heroku, AWS EC2, DigitalOcean)**

```bash
# Build frontend
npm run build

# Install a simple server
npm install -g serve

# Run the built application
serve -s dist -l 3000
```

#### 3. **Docker Deployment**

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Backend Deployment

### Environment Setup

Create production `.env` file:
```
PORT=3001
NODE_ENV=production
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
DB_DATABASE=sis_db_prod
CORS_ORIGIN=https://your-frontend-domain.com
```

### Deploy Options

#### 1. **Heroku**

```bash
# Install Heroku CLI
# heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set DB_HOST=your-db-host
heroku config:set DB_USER=your-user
heroku config:set DB_PASSWORD=your-password
heroku config:set DB_DATABASE=sis_db_prod

# Deploy
git push heroku main
```

#### 2. **AWS EC2**

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone repository
git clone your-repo-url
cd sis-admin-panel/backend

# Install dependencies
npm install

# Set up PM2 for process management
sudo npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

#### 3. **Docker Deployment**

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t sis-backend .
docker run -p 3001:3001 \
  -e DB_HOST=your-db \
  -e DB_USER=root \
  -e DB_PASSWORD=password \
  -e DB_DATABASE=sis_db \
  sis-backend
```

#### 4. **DigitalOcean App Platform**

1. Push code to GitHub
2. Connect GitHub repo to DigitalOcean
3. Create app from repository
4. Configure environment variables
5. Deploy

## Database Setup for Production

### 1. Create Database

```bash
mysql -u admin -p -h your-db-host

# In MySQL console:
CREATE DATABASE sis_db_prod;
USE sis_db_prod;

# Import schema (if you have a dump file)
SOURCE path/to/schema.sql;
```

### 2. Create Database User

```sql
CREATE USER 'sis_user'@'%' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON sis_db_prod.* TO 'sis_user'@'%';
FLUSH PRIVILEGES;
```

## SSL/HTTPS Setup

### Using Nginx with Let's Encrypt

```bash
sudo apt-get install nginx certbot python3-certbot-nginx

sudo certbot certonly --nginx -d yourdomain.com

# Configure Nginx
sudo nano /etc/nginx/sites-available/sis-api
```

Example Nginx config:
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## Monitoring and Maintenance

### Health Checks

Use the `/api/ping` endpoint to monitor server status:
```bash
curl https://yourdomain.com/api/ping
```

### Logs

#### Using PM2:
```bash
pm2 logs
pm2 monit
```

#### Using Docker:
```bash
docker logs container-id
docker logs -f container-id  # Follow logs
```

### Database Backups

```bash
# Regular backup schedule
mysqldump -u sis_user -p sis_db_prod > backup_$(date +%Y%m%d).sql

# Or use managed database backups from your cloud provider
```

## Scaling Considerations

1. **Load Balancing**: Use Nginx or AWS Load Balancer
2. **Database Optimization**: Add indexes, optimize queries
3. **Caching**: Implement Redis for frequently accessed data
4. **CDN**: Use CloudFlare or AWS CloudFront for frontend
5. **Auto-scaling**: Configure in Docker Swarm or Kubernetes

## Troubleshooting Production Issues

### Database Connection Errors
- Verify database host is accessible
- Check firewall rules
- Confirm credentials are correct

### CORS Errors
- Update `CORS_ORIGIN` environment variable
- Ensure frontend URL matches exactly

### High Memory Usage
- Monitor Node.js process
- Enable cluster mode with PM2
- Check for memory leaks

## Security Best Practices

1. Always use HTTPS in production
2. Keep dependencies updated: `npm audit`
3. Use environment variables for secrets
4. Implement rate limiting
5. Enable database user permissions properly
6. Regular security audits
7. Monitor for unusual activity

## Performance Optimization

1. Enable gzip compression
2. Use connection pooling for database
3. Implement caching strategies
4. Optimize database queries
5. Use CDN for static assets
6. Minimize bundle size
