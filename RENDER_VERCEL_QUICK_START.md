# 🚀 Render + Vercel Quick Start (5 Minutes)

Fast deployment path for Mini Lab e-commerce.

---

## What You'll Get

✅ Frontend deployed on Vercel  
✅ Backend deployed on Render  
✅ Database on Render MySQL  
✅ Auto-deployments on git push  
✅ Free tier (upgradeable)  

**Total Monthly Cost: $0-22**

---

## Step 1: Prepare Repository (2 minutes)

```bash
cd e:\mini_lab_ecommerce_website\mini_lab_ecommerce_website-main

# Ensure everything is committed
git status
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

---

## Step 2: Deploy Frontend on Vercel (2 minutes)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub** → Authorize
3. **Click "Add New Project"**
4. **Select `mini_lab_ecommerce_website` repository**
5. **Configure:**
   - Framework: **Vite**
   - Root Directory: **./frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Add Environment Variables:**
   - `VITE_API_BASE_URL` = (leave empty for now)
   - `VITE_RAZORPAY_KEY` = your_key

7. **Click "Deploy"** ✅
   - Wait 2-5 minutes
   - You get a URL like: `https://mini-lab-XXXX.vercel.app`

---

## Step 3: Deploy Backend on Render (3 minutes)

### Create render.yaml

In repository root, create `render.yaml`:

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
      - key: CORS_ALLOWED_ORIGINS
        value: https://mini-lab-XXXX.vercel.app
      - key: RAZORPAY_KEY_ID
        value: ${RAZORPAY_KEY_ID}
      - key: RAZORPAY_SECRET_KEY
        value: ${RAZORPAY_SECRET_KEY}

databases:
  - name: mini-lab-db
    engine: mysql
    version: 8
    plan: free
```

### Push to GitHub

```bash
git add render.yaml
git commit -m "chore: add render deployment config"
git push origin main
```

### Deploy

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub** → Authorize
3. **Click "New +"** → **"Web Service"**
4. **Select your repository**
5. **Render auto-detects render.yaml** ✅
6. **Click "Deploy"**
   - Wait 5-10 minutes
   - You get a URL like: `https://mini-lab-api-XXXX.onrender.com`

---

## Step 4: Connect Frontend to Backend (1 minute)

### Update Frontend Environment Variable

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings** → **Environment Variables**
4. **Update `VITE_API_BASE_URL`:**
   ```
   https://mini-lab-api-XXXX.onrender.com
   ```
5. **Redeploy:**
   ```bash
   git commit --allow-empty -m "trigger redeploy"
   git push origin main
   ```

---

## Step 5: Set Backend Secrets (1 minute)

1. **Go to Render Dashboard**
2. **Select your service**
3. **Environment** tab
4. **Add environment variables:**
   ```
   RAZORPAY_KEY_ID = your_actual_key
   RAZORPAY_SECRET_KEY = your_actual_secret
   CORS_ALLOWED_ORIGINS = https://mini-lab-XXXX.vercel.app
   ```

---

## ✅ Verify Deployment

### Frontend Works

```bash
# Open in browser
https://mini-lab-XXXX.vercel.app

# Should see:
✓ Home page loads
✓ Products visible
✓ No errors in console (F12)
```

### Backend Works

```bash
# Test health endpoint
curl https://mini-lab-api-XXXX.onrender.com/api/actuator/health

# Response should be:
{"status":"UP"}

# Test API
curl https://mini-lab-api-XXXX.onrender.com/api/products

# Should return products JSON
```

### Full Integration Works

1. **Frontend → Backend connectivity**
   - Go to frontend URL
   - Open DevTools (F12) → Network tab
   - Click Shop page
   - Should see `/api/products` call succeed (200 OK)

2. **Database Works**
   - Try to create account
   - Should save to database

---

## 🎯 URLs After Deployment

| Service | URL |
|---------|-----|
| Frontend | `https://mini-lab-XXXX.vercel.app` |
| Backend | `https://mini-lab-api-XXXX.onrender.com` |
| Health Check | `https://mini-lab-api-XXXX.onrender.com/api/actuator/health` |

---

## 💰 Costs

| Service | Plan | Cost |
|---------|------|------|
| Frontend | Vercel Free | $0 |
| Backend | Render Free | $0 |
| Database | Render Free | $0 |
| **Total** | | **$0/month** |

**To upgrade later (always-on):**
- Backend Starter: +$7/month
- Database Basic: +$15/month
- Total: $22/month

---

## 🔄 Auto-Deployments

Now every time you push to `main`:

```bash
git add .
git commit -m "your message"
git push origin main
```

Both Vercel and Render automatically:
- ✅ Build your code
- ✅ Run tests
- ✅ Deploy to production
- ✅ No manual steps needed

---

## ⚠️ Common Issues

### Frontend shows 503 (Bad Gateway)

**Problem:** Backend not responding  
**Fix:** Wait 2-3 minutes (Render startup time on free tier)

### API calls failing (CORS error)

**Problem:** CORS not configured  
**Fix:**
```bash
# In Render → Environment
CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app
# Redeploy service
```

### Database not connecting

**Problem:** Render auto-created database  
**Fix:** Check Render dashboard → Database credentials are in environment variables

### Build fails

**Problem:** Java/Maven issue  
**Fix:**
```bash
# Test locally
cd backend
mvn clean package

# Check Render logs
# Render → Service → Logs tab
```

---

## 📚 Full Documentation

For complete details, see:
- **RENDER_VERCEL_DEPLOYMENT.md** - Full guide with all options
- **DEPLOYMENT_GUIDE.md** - Multiple platform options
- **DEPLOYMENT_CHECKLIST.md** - Pre/post verification
- **MONITORING_AND_LOGGING_GUIDE.md** - Setup monitoring
- **DATABASE_MIGRATION_GUIDE.md** - Backups & recovery

---

## 🎉 You're Live!

Your application is now deployed and auto-updates whenever you push to `main`.

**Next Steps:**
1. ✅ Test all features
2. 📊 Setup monitoring (optional)
3. 💾 Setup backups (optional)
4. 🌐 Add custom domain (optional)

---

**Deployment Time:** ~15 minutes  
**Skill Level:** Beginner-friendly  
**Production Ready:** ✅ Yes
