# Render + Vercel Deployment Guide

Step-by-step guide to deploy Mini Lab e-commerce:
- **Frontend**: Vercel (recommended for React)
- **Backend**: Render (easy Java/Spring Boot support)
- **Database**: Render PostgreSQL or external MySQL

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- [ ] GitHub account (repo must be public or private with access)
- [ ] Vercel account (free)
- [ ] Render account (free)

### Software
- [ ] Git installed
- [ ] Node.js 18+ (for local testing)
- [ ] Maven 3.8+ (for local testing)
- [ ] Java 11+ (for local testing)

### Repository Setup
```bash
# Ensure code is pushed to GitHub
git remote -v
git branch --list
git push origin main
```

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Project

1. **Sign up/login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "GitHub" authentication
   - Authorize Vercel to access GitHub

2. **Import your repository:**
   - Click "Add New..." → "Project"
   - Search for `mini_lab_ecommerce_website`
   - Click "Import"

### Step 2: Configure Vercel Project

1. **Project Settings:**
   - Framework Preset: **Vite**
   - Root Directory: **./frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Environment Variables:**
   - Add the following:
   ```
   VITE_API_BASE_URL=https://api.your-domain.com
   VITE_RAZORPAY_KEY=your_razorpay_key
   VITE_APP_NAME=Mini Lab
   ```
   - Get these from `frontend/.env.production`

3. **Click "Deploy"**
   - Vercel builds and deploys automatically
   - Takes 2-5 minutes

### Step 3: Get Vercel URL

After deployment completes:
- Frontend URL: `https://mini-lab-XXXX.vercel.app`
- Custom domain (optional): Go to Settings → Domains
  - Add your domain (e.g., mini-lab.com)
  - Update DNS records with Vercel's nameservers

### Troubleshooting Vercel

**Build fails:**
```bash
# Test locally
cd frontend
npm install
npm run build

# Check for errors in Vercel logs
# Vercel dashboard → Project → Deployments → Latest → Logs
```

**Environment variables not working:**
```bash
# Verify they're set in Vercel
Settings → Environment Variables
# Must include VITE_ prefix for frontend
```

---

## Backend Deployment (Render)

### Step 1: Create render.yaml

Create `/render.yaml` in your repository root:

```yaml
services:
  - type: web
    name: mini-lab-api
    env: java
    plan: free
    buildCommand: cd backend && mvn clean package -DskipTests
    startCommand: java -jar backend/target/spring-backend-0.0.1-SNAPSHOT.jar
    healthCheckPath: /api/actuator/health
    envVars:
      - key: PORT
        value: 8080
      - key: SPRING_DATASOURCE_URL
        fromDatabase:
          name: mini-lab-db
          property: connectionString
      - key: SPRING_DATASOURCE_USERNAME
        fromDatabase:
          name: mini-lab-db
          property: user
      - key: SPRING_DATASOURCE_PASSWORD
        fromDatabase:
          name: mini-lab-db
          property: password
      - key: SPRING_PROFILES_ACTIVE
        value: prod
      - key: RAZORPAY_KEY_ID
        value: ${RAZORPAY_KEY_ID}
      - key: RAZORPAY_SECRET_KEY
        value: ${RAZORPAY_SECRET_KEY}
      - key: CORS_ALLOWED_ORIGINS
        value: https://your-frontend-domain.vercel.app

databases:
  - name: mini-lab-db
    engine: mysql
    version: 8
    plan: free
```

### Step 2: Push to GitHub

```bash
git add render.yaml
git commit -m "chore: add render deployment config"
git push origin main
```

### Step 3: Deploy on Render

1. **Sign up/login to Render:**
   - Go to [render.com](https://render.com)
   - Click "Sign Up"
   - Choose "GitHub" authentication
   - Authorize Render to access GitHub

2. **Create new service:**
   - Click "New+" → "Web Service"
   - Select your GitHub repository
   - Click "Connect"

3. **Configure service:**
   - Service Name: `mini-lab-api`
   - Environment: `Java`
   - Plan: **Free** (or Starter for production)
   - **Important:** Under "Advanced" → Set Environment Region close to users

4. **Click "Deploy"**
   - Render builds and deploys
   - Takes 5-10 minutes

### Step 4: Get Render URL

After deployment:
- Backend URL: `https://mini-lab-api-XXXX.onrender.com`
- View logs: Render dashboard → Service → Logs

### Troubleshooting Render

**Build fails:**
```bash
# Check build logs
Render dashboard → Service → Logs

# Test locally
cd backend
mvn clean package

# Common issues:
# - Java version mismatch (need Java 11+)
# - Maven version issue
# - Missing dependencies
```

**Service not starting:**
```bash
# Check health endpoint
curl https://mini-lab-api-XXXX.onrender.com/api/actuator/health

# If 503: Service loading, wait 1-2 minutes
# If 502: Backend crashed, check logs
```

**Database connection error:**
```bash
# Verify database exists
# Render dashboard → Service → Environment

# Test connection
mysql -h your-host -u admin -p minilabdb
```

---

## Database Setup

### Option 1: Render-Managed MySQL (Easiest)

Render automatically creates MySQL database when you specify it in `render.yaml`.

**Verify database:**
1. Go to Render dashboard
2. Click on your service
3. Click "Databases" tab
4. Copy connection string for environment variables

### Option 2: External MySQL Database

If you prefer a separate database host:

**AWS RDS:**
```bash
aws rds create-db-instance \
    --db-instance-identifier mini-lab-mysql \
    --db-instance-class db.t3.micro \
    --engine mysql \
    --engine-version 8.0 \
    --allocated-storage 20 \
    --master-username admin \
    --master-user-password your-secure-password \
    --publicly-accessible \
    --backup-retention-period 30
```

**DigitalOcean Managed Database:**
- Go to DigitalOcean console
- Create managed MySQL database
- Copy connection details

### Initial Database Setup

1. **Connect to database:**
```bash
mysql -h your-host -u admin -p minilabdb
```

2. **Run migrations:**
```bash
# Via Spring Boot (automatic)
# Or manually:
cat > /tmp/init.sql << 'EOF'
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    description TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address VARCHAR(500),
    payment_id VARCHAR(255),
    amount DECIMAL(10,2),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
EOF

mysql -h your-host -u admin -p minilabdb < /tmp/init.sql
```

---

## Environment Variables

### Frontend Environment Variables (Vercel)

Set in Vercel dashboard → Settings → Environment Variables:

```
# API Configuration
VITE_API_BASE_URL=https://mini-lab-api-XXXX.onrender.com

# Razorpay (get from Razorpay dashboard)
VITE_RAZORPAY_KEY=rzp_live_XXXXXXXXXXXXX

# App Configuration
VITE_APP_NAME=Mini Lab
VITE_APP_VERSION=1.0.0
```

### Backend Environment Variables (Render)

Set in Render dashboard → Service → Environment:

```
# Database (auto-filled if using Render MySQL)
SPRING_DATASOURCE_URL=jdbc:mysql://host:3306/minilabdb
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=your-password

# CORS
CORS_ALLOWED_ORIGINS=https://mini-lab-XXXX.vercel.app

# Payment Gateway
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
RAZORPAY_SECRET_KEY=your_secret_key

# Environment
SPRING_PROFILES_ACTIVE=prod
```

---

## Verification

### Test Frontend

```bash
# 1. Visit your Vercel URL
https://mini-lab-XXXX.vercel.app

# Should see:
✓ Home page loads
✓ Products display
✓ No console errors (F12)

# 2. Test navigation
- Click on product → detail page
- Add to cart → cart updates
- Click profile icon
```

### Test Backend

```bash
# 1. Health check
curl https://mini-lab-api-XXXX.onrender.com/api/actuator/health
# Response: {"status":"UP"}

# 2. API endpoints
curl https://mini-lab-api-XXXX.onrender.com/api/products

# 3. Database connection
curl https://mini-lab-api-XXXX.onrender.com/api/actuator/db

# Should show database pool info
```

### Test Full Flow

1. **Frontend → Backend connectivity**
   - Frontend: Open DevTools (F12) → Network tab
   - Frontend: Navigate to Shop page
   - Network: Should see API calls to `/api/products`
   - Status should be 200 OK

2. **Login/Logout**
   - Frontend: Click Profile → Sign Up
   - Create account
   - Verify user in backend logs

3. **Purchase Flow**
   - Add product to cart
   - Proceed to checkout
   - Enter address
   - Click "Continue to Payment"
   - Should redirect to Razorpay (test mode)

---

## Monitoring

### Vercel Monitoring

**Dashboard:**
- Vercel → Project → Analytics
- View:
  - Page load times
  - Error rates
  - Deployments

**Logs:**
```bash
# Install Vercel CLI
npm install -g vercel

# View logs
vercel logs --follow
```

### Render Monitoring

**Dashboard:**
- Render → Service → Logs (real-time)
- Render → Service → Metrics
  - CPU usage
  - Memory usage
  - Request count

**Health checks:**
```bash
# Monitor health endpoint
watch -n 5 'curl -s https://mini-lab-api-XXXX.onrender.com/api/actuator/health'
```

---

## Troubleshooting

### Frontend Issues

**Page not loading:**
```
1. Check Vercel deployment status
   - Vercel dashboard → Deployments
   - Look for failed builds

2. Clear browser cache
   - Ctrl+Shift+Delete → Clear browsing data

3. Check environment variables
   - Vercel → Settings → Environment Variables
   - Verify VITE_API_BASE_URL is correct
```

**API calls failing:**
```
1. Open DevTools (F12) → Console tab
   - Look for error messages
   - Check CORS errors

2. Verify backend is running
   - curl https://mini-lab-api-XXXX.onrender.com/api/actuator/health

3. Check CORS_ALLOWED_ORIGINS
   - Should include your Vercel frontend URL
```

### Backend Issues

**Service won't start:**
```
1. Check build logs
   - Render → Logs tab
   - Look for "build failed" message

2. Common issues:
   - Java version incompatible
   - Dependency download failed
   - Port already in use

3. Fix:
   - Restart service (Render dashboard)
   - Or redeploy
```

**Database connection error:**
```
1. Verify database is running
   - mysql -h host -u admin -p -e "SELECT 1;"

2. Check environment variables
   - Render → Environment
   - Verify SPRING_DATASOURCE_URL format

3. Test locally
   - cd backend
   - mvn spring-boot:run
```

**High memory/CPU usage:**
```
1. Check logs for memory leaks
   - Render → Logs
   - Search for "OutOfMemory"

2. Optimize Spring Boot
   - Set JVM options in render.yaml:
   - startCommand: java -Xmx512m -jar ...
```

---

## Performance Optimization

### Frontend (Vercel)

```javascript
// Enable image optimization
import Image from 'next/image'; // If using Next.js
// Or use <img loading="lazy" />

// Code splitting
const Shop = lazy(() => import('./pages/Shop'));

// Compression already enabled on Vercel
```

### Backend (Render)

```properties
# connection pooling
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=2

# caching
spring.cache.type=caffeine

# compression
server.compression.enabled=true
```

---

## Cost Analysis

### Frontend (Vercel)

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 100 deployments/day, 6000 build minutes/month |
| Pro | $20 | Unlimited deployments, priority support |

### Backend (Render)

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 750 hours/month, manual deploys, auto-stops after 15 min inactivity |
| Starter | $7 | Always-on, auto-deploys, 0.5 GB RAM |
| Standard | $12 | 1 GB RAM, auto-deploys |

### Database (Render)

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 1 GB storage, auto-pauses |
| Basic | $15 | Always-on, 10 GB storage |

**Recommended Setup:**
- Frontend: Vercel Free ($0)
- Backend: Render Starter ($7)
- Database: Render Basic ($15)
- **Total: $22/month**

Or upgrade to Standard ($12) for more RAM if needed.

---

## Next Steps

1. ✅ Deploy frontend on Vercel
2. ✅ Deploy backend on Render
3. ✅ Configure database
4. ✅ Update environment variables
5. ✅ Test all endpoints
6. 📊 Setup monitoring (see MONITORING_AND_LOGGING_GUIDE.md)
7. 💾 Setup backups (see DATABASE_MIGRATION_GUIDE.md)
8. 🔐 Enable HTTPS (automatic on both platforms)

---

## Support

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Render Support:** [render.com/docs](https://render.com/docs)
- **GitHub Issues:** Check repository issues

---

**Last Updated:** October 2026
**Version:** 1.0
