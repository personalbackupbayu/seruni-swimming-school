# Seruni Swimming School - Vercel Deployment Guide

## Project Information
- **Name**: Seruni Swimming School
- **Type**: Pure Front-End React Landing Page
- **Build Tool**: Vite
- **Framework**: React 19 + Tailwind CSS 4

## Prerequisites
1. GitHub account with the project repository
2. Vercel account (free tier available)
3. Node.js 18+ installed locally

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Convert to front-end only for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
Option A: Using Vercel CLI
```bash
npm i -g vercel
vercel
```

Option B: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click "Deploy"

### 3. Configuration
The `vercel.json` file is already configured with:
- Build command: `pnpm build`
- Output directory: `dist`
- Framework: Vite

## Project Structure
```
seruni-swimming-school/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── contexts/           # React contexts
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # React entry point
│   └── index.css            # Global styles
├── public/                 # Static assets
├── dist/                   # Build output
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel configuration
```

## Features
✅ Responsive design (mobile, tablet, desktop)
✅ Modern Aquatic Minimalism design
✅ Contact form with WhatsApp integration
✅ WhatsApp floating button
✅ Program showcase
✅ Location information
✅ About section
✅ Footer with social media links

## Environment Variables
No environment variables required for this front-end only app.

## Build & Test Locally
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Contact Information
- Email: seruniswimmingschool@gmail.com
- WhatsApp: +62 878-8034-3055
- Instagram: https://www.instagram.com/seruniswimmingschool
- TikTok: https://www.tiktok.com/@seruniswimmingschool

## Notes
- This is a pure front-end React app with no backend server
- All form submissions are handled via client-side WhatsApp and email links
- No database or authentication required
- Static hosting on Vercel is perfect for this use case
