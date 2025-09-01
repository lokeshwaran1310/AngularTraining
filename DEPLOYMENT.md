# Full-Stack Deployment Guide

## Backend Deployment Options

### Option 1: Railway (Recommended - Free Tier)
1. Sign up at [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add `RAILWAY_TOKEN` to GitHub Secrets
4. Push changes - auto-deploys via GitHub Actions

### Option 2: Render (Alternative - Free Tier)
1. Sign up at [Render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Build Command: `cd phase1/day3p1/backend && mvn clean package -DskipTests`
5. Start Command: `java -jar target/*.jar`

### Option 3: Heroku (Paid)
1. Install Heroku CLI
2. `heroku create your-app-name`
3. `git subtree push --prefix=phase1/day3p1/backend heroku main`

## Frontend Configuration

After backend deployment, update Angular services:

### Day3p1 Frontend
```typescript
// Update API_BASE_URL in your service
private API_BASE_URL = 'https://your-backend-url.railway.app/api';
```

### Day4p1 Frontend
```typescript
// Update API_BASE_URL in auth.service.ts and bug.service.ts
private API_BASE_URL = 'https://your-backend-url.railway.app/api';
```

## Quick Setup Steps

1. **Deploy Backend:**
   - Push to main branch
   - GitHub Actions will auto-deploy to Railway

2. **Update Frontend:**
   - Change API URLs to deployed backend
   - Rebuild and redeploy frontend

3. **Test:**
   - Verify backend endpoints work
   - Test full-stack functionality

## Environment Variables

Set these in your deployment platform:
- `SPRING_PROFILES_ACTIVE=prod`
- `DATABASE_URL` (if using external DB)
- `JWT_SECRET` (for day4p1)

## CORS Configuration

Ensure your Spring Boot backend allows your frontend domain:
```java
@CrossOrigin(origins = "https://lokeshwaran1310.github.io")
```