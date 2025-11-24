# Deployment Guide

This guide will help you deploy your Kasibot Client Portal to make it live and accessible to anyone.

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the easiest option and works great with Vite + React apps.

### Steps:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account

3. **Import your project**:
   - Click "Add New Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a Vite project

4. **Configure Environment Variables**:
   - In the "Environment Variables" section, add:
     - `VITE_CLERK_PUBLISHABLE_KEY` = Your Clerk publishable key (from your `.env` file)
   - Add any other environment variables you need (like Supabase keys)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at `https://your-project-name.vercel.app`

6. **Custom Domain (Optional)**:
   - Go to Project Settings → Domains
   - Add your custom domain

---

## Option 2: Deploy to Netlify

### Steps:

1. **Push your code to GitHub**

2. **Go to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub

3. **Import your project**:
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository

4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Add Environment Variables**:
   - Go to Site settings → Environment variables
   - Add `VITE_CLERK_PUBLISHABLE_KEY` and other variables

6. **Deploy**:
   - Click "Deploy site"
   - Your site will be live at `https://random-name.netlify.app`

---

## Option 3: Deploy to GitHub Pages

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.ts**:
   Add `base: '/your-repo-name/'` to the config

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## Important Notes:

### Environment Variables:
- **Never commit your `.env` file** (it's already in `.gitignore`)
- Add environment variables in your hosting platform's dashboard
- For Vite, all env vars must start with `VITE_` to be accessible in the browser

### Clerk Configuration:
- Make sure to add your Clerk publishable key as an environment variable
- Update Clerk dashboard with your production URL for redirects

### Supabase (if using):
- Add your Supabase URL and anon key as environment variables
- Update Supabase CORS settings to allow your production domain

### After Deployment:
1. Test all authentication flows
2. Verify all API calls work
3. Check that environment variables are loaded correctly
4. Test on mobile devices

---

## Quick Deploy Commands (Vercel CLI):

If you prefer using the command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
# Add environment variables when asked
```

---

## Troubleshooting:

- **Build fails**: Check that all dependencies are in `package.json`
- **Environment variables not working**: Make sure they start with `VITE_` for Vite
- **Routing issues**: The `vercel.json` includes rewrites for client-side routing
- **Clerk not working**: Verify the publishable key is set correctly in production

