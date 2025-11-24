# GitHub Setup & Deployment Guide

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `kasibot-client-portal` (or any name you prefer)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Run these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/kasibot-client-portal.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "Add New Project"
4. Select your `kasibot-client-portal` repository
5. Vercel will auto-detect it's a Vite project

### Configure Environment Variables:
- Click "Environment Variables"
- Add: `VITE_CLERK_PUBLISHABLE_KEY` = (your Clerk key from `.env` file)
- Add any other environment variables you need

### Deploy:
- Click "Deploy"
- Wait 2-3 minutes
- Your site will be live! 🎉

## Alternative: Quick Deploy via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? kasibot-client-portal
# - Directory? ./
# - Override settings? No
# - Add environment variables when prompted
```

## Important Notes:

- **Never commit `.env` file** - it's already in `.gitignore`
- Add environment variables in Vercel dashboard, not in code
- Your site will be live at: `https://your-project-name.vercel.app`
- You can add a custom domain later in Vercel settings

