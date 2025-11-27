# GitHub Setup Instructions

## Prerequisites

- Git installed on your machine
- GitHub account
- Project folder ready to upload

## Steps to Push to GitHub

### 1. Create a New Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `sis-admin-panel`
3. Description: "Student Information System - Admin Panel"
4. Choose visibility: Public or Private
5. Do NOT initialize with README, .gitignore, or license (we already have them)
6. Click "Create repository"

### 2. Initialize Git in Your Local Project

```bash
cd c:/Users/gonda/OneDrive/Desktop/sis-admin-panel

# Initialize git repository
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/sis-admin-panel.git

# Verify remote
git remote -v
```

### 3. Configure Git User (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 4. Stage and Commit Files

```bash
# Add all files
git add .

# Check what will be committed
git status

# Commit changes
git commit -m "Initial commit: SIS Admin Panel with frontend and backend"
```

### 5. Push to GitHub

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 6. Verify on GitHub

Visit `https://github.com/YOUR_USERNAME/sis-admin-panel` to verify your code is uploaded.

## Important Notes

✅ Already configured:
- `.gitignore` - Excludes node_modules, .env, build files
- `.env.example` - Template for environment variables
- `README.md` - Comprehensive project documentation
- `DEPLOYMENT.md` - Deployment guide

⚠️ Make sure these are NOT committed:
- `.env` and `.env.local` files (sensitive data)
- `node_modules/` folder (large size)
- `dist/` folder (will be built on deployment)

## Updating After Initial Push

```bash
# Check status
git status

# Stage changes
git add .

# Commit with meaningful message
git commit -m "Add feature: description of changes"

# Push to GitHub
git push origin main
```

## Branching Strategy (Recommended)

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "Add feature-name"

# Push feature branch
git push origin feature/feature-name

# Create Pull Request on GitHub
# After review, merge to main
```

## Cloning the Repository Later

```bash
git clone https://github.com/YOUR_USERNAME/sis-admin-panel.git
cd sis-admin-panel

# Install dependencies
npm install
cd backend && npm install && cd ..

# Configure environment
cp .env.example .env.local
cp backend/.env.example backend/.env

# Start application
# Terminal 1: cd backend && npm start
# Terminal 2: npm run dev
```

## Useful Git Commands

```bash
# View commit history
git log --oneline

# View changes
git diff

# Revert last commit (before push)
git reset --soft HEAD~1

# See current branch
git branch

# Switch branch
git checkout branch-name

# Delete branch
git branch -d branch-name
```

## GitHub Pages (Optional - for Frontend)

To host the frontend on GitHub Pages:

1. Go to repository Settings
2. Select "Pages"
3. Select "Deploy from a branch"
4. Branch: `main`, Folder: `/(root)` or `/docs`
5. Build and deploy the frontend to the docs folder
6. Your site will be available at: `https://YOUR_USERNAME.github.io/sis-admin-panel`

## Authentication

### Using Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Create new token with `repo` scope
3. Use token as password when pushing

### Using SSH (Alternative)

1. Generate SSH key: `ssh-keygen -t ed25519 -C "your.email@example.com"`
2. Add to GitHub Settings → SSH and GPG keys
3. Use SSH URL: `git@github.com:YOUR_USERNAME/sis-admin-panel.git`

## Need Help?

- GitHub Docs: https://docs.github.com
- Git Docs: https://git-scm.com/doc
- Troubleshoot: https://docs.github.com/en/get-started/quickstart/troubleshooting-cloning-errors
