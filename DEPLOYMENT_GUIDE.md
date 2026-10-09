# Deployment Guide - Mini Lab E-Commerce

Complete guide to deploy both frontend and backend to production.

---

## 📋 Table of Contents

1. [Frontend Deployment](#frontend-deployment)
2. [Backend Deployment](#backend-deployment)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Post-Deployment](#post-deployment)

---

# Frontend Deployment

## Option 1: Vercel (Recommended for Vite)

### Advantages
- ✅ Automatic deployments on git push
- ✅ Built-in Vite support
- ✅ Free tier available
- ✅ Custom domain support
- ✅ SSL/HTTPS included

### Step 1: Prepare Project
```bash
cd frontend
npm run build
# Verify dist/ folder exists
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, GitLab, or Bitbucket
3. Authorize repository access

### Step 3: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or use Vercel Dashboard:
1. Go to Vercel Dashboard
2. Click "New Project"
3. Select your repository
4. Configure settings (see below)
5. Click "Deploy"

### Step 4: Configure Vercel
In Vercel Dashboard → Project Settings:

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
```
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_RAZORPAY_KEY=your_razorpay_key_here
```

**Domains:**
- Add custom domain or use provided vercel domain

### Deployment Output
```
✓ Production: https://mini-lab.vercel.app
✓ Preview: https://mini-lab-[branch].vercel.app
```

---

## Option 2: Netlify

### Advantages
- ✅ Easy GitHub integration
- ✅ Automatic previews for PRs
- ✅ Serverless functions support
- ✅ Form handling built-in

### Step 1: Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select GitHub and authorize
4. Choose repository

### Step 2: Configure Netlify
**Build settings:**
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

**Environment variables:**
```
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_RAZORPAY_KEY=your_razorpay_key_here
```

### Step 3: Deploy
Click "Deploy site" - Netlify will auto-deploy on every git push

---

## Option 3: AWS S3 + CloudFront

### Advantages
- ✅ Highly scalable
- ✅ Global CDN
- ✅ Pay per use
- ✅ AWS ecosystem integration

### Step 1: Create S3 Bucket
```bash
aws s3 mb s3://mini-lab-frontend-prod
```

### Step 2: Build Frontend
```bash
cd frontend
npm run build
```

### Step 3: Deploy to S3
```bash
aws s3 sync dist/ s3://mini-lab-frontend-prod --delete
```

### Step 4: Create CloudFront Distribution
```bash
# Via AWS Console:
1. Go to CloudFront
2. Create Distribution
3. Set S3 bucket as origin
4. Enable compression
5. Set default root object to index.html
```

### Step 5: Configure DNS
- Point domain to CloudFront distribution
- SSL auto-configured

---

## Option 4: Docker + Any Server

### Step 1: Create Dockerfile
See `frontend/Dockerfile` (we'll create this next)

### Step 2: Build Docker Image
```bash
docker build -t mini-lab-frontend:latest -f frontend/Dockerfile .
```

### Step 3: Push to Registry
```bash
docker tag mini-lab-frontend:latest your-registry/mini-lab-frontend:latest
docker push your-registry/mini-lab-frontend:latest
```

### Step 4: Deploy to Server
```bash
docker run -d \
  -p 80:3000 \
  -e VITE_API_BASE_URL=https://api.example.com \
  your-registry/mini-lab-frontend:latest
```

---

# Backend Deployment

## Option 1: Render (Recommended for Spring Boot)

### Advantages
- ✅ Easy GitHub integration
- ✅ Built-in Java/Maven support
- ✅ Free tier available
- ✅ Managed PostgreSQL/MySQL databases
- ✅ Environment variables built-in
- ✅ Auto-deployments on git push

### Step 1: Create render.yaml Configuration

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

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New+" → "Web Service"
4. Select your repository
5. Render automatically detects render.yaml
6. Click "Deploy"

### Step 4: Set Environment Variables

After service is deployed:
1. Render Dashboard → Your Service → "Environment"
2. Add sensitive variables:
   ```
   RAZORPAY_KEY_ID=your_key
   RAZORPAY_SECRET_KEY=your_secret
   CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```

### Deployment Output
```
✓ Backend API: https://mini-lab-api-XXXX.onrender.com
✓ Health Check: https://mini-lab-api-XXXX.onrender.com/api/actuator/health
```

---

## Option 2: Heroku (Legacy)

### Step 1: Launch EC2 Instance
```bash
# Using AWS CLI
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --key-name your-key-pair \
  --security-groups web-sg
```

### Step 2: Connect to Instance
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

### Step 3: Install Java & Maven
```bash
sudo yum update -y
sudo yum install java-17-amazon-corretto -y
sudo yum install maven -y
```

### Step 4: Clone Repository
```bash
git clone https://github.com/yourusername/mini-lab.git
cd mini-lab/backend
```

### Step 5: Build Application
```bash
mvn clean package
```

### Step 6: Configure Database
```bash
# RDS instance setup
aws rds create-db-instance \
  --db-instance-identifier mini-lab-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password your-password
```

### Step 7: Run Application
```bash
java -jar target/spring-backend-0.0.1-SNAPSHOT.jar \
  --spring.datasource.url=jdbc:mysql://rds-endpoint:3306/minilabdb \
  --spring.datasource.username=admin \
  --spring.datasource.password=your-password \
  --server.port=8085
```

### Step 8: Setup Load Balancer
- Create Application Load Balancer
- Point to EC2 instance
- Configure health checks
- Add SSL certificate

---

## Option 2: Heroku

### Advantages
- ✅ Git push to deploy
- ✅ Built-in PostgreSQL/MySQL
- ✅ Automatic scaling
- ✅ Easy to use

### Step 1: Create Heroku Account
- Sign up at [heroku.com](https://heroku.com)
- Install Heroku CLI: `npm install -g heroku`

### Step 2: Create Procfile
Create `backend/Procfile`:
```
web: java -cp target/classes:target/dependency/* com.example.springbackend.SpringBackendApplication
```

### Step 3: Add Heroku Remote
```bash
heroku create mini-lab-api
heroku git:remote -a mini-lab-api
```

### Step 4: Configure Dyno Type
```bash
heroku dyos:type standard-1x -a mini-lab-api
```

### Step 5: Set Environment Variables
```bash
heroku config:set \
  SPRING_DATASOURCE_URL=jdbc:mysql://db.example.com:3306/minilabdb \
  SPRING_DATASOURCE_USERNAME=admin \
  SPRING_DATASOURCE_PASSWORD=your-password \
  SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

### Step 6: Deploy
```bash
git push heroku main
```

Monitor deployment:
```bash
heroku logs --tail
```

---

## Option 3: DigitalOcean App Platform

### Step 1: Create DigitalOcean Account
- Sign up at [digitalocean.com](https://digitalocean.com)

### Step 2: Create App
1. Go to App Platform
2. Select repository
3. Choose backend folder
4. Auto-detect Java/Maven

### Step 3: Configure Database
1. Add MySQL database component
2. Set connection details
3. Link to app

### Step 4: Set Environment Variables
```
SPRING_DATASOURCE_URL=mysql://user:pass@host:port/db
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=password
```

### Step 5: Deploy
Click "Deploy" - DigitalOcean handles everything

---

## Option 4: Docker + Docker Compose

### Step 1: Create Docker Files
- `backend/Dockerfile` (we'll create this)
- `docker-compose.yml` (we'll create this)

### Step 2: Build Images
```bash
docker-compose build
```

### Step 3: Run Containers
```bash
docker-compose up -d
```

### Step 4: Verify
```bash
docker-compose ps
docker-compose logs -f backend
```

---

# Database Setup

## MySQL on Cloud

### AWS RDS Setup
```bash
aws rds create-db-instance \
  --db-instance-identifier mini-lab-mysql \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --engine-version 8.0 \
  --master-username admin \
  --master-user-password SecurePassword123! \
  --allocated-storage 20 \
  --publicly-accessible
```

### Initialize Database
```sql
CREATE DATABASE minilabdb;
USE minilabdb;

-- Spring Boot will create tables with ddl-auto=update
-- Or manually run schema if provided
```

### Backup Strategy
```bash
# Daily backup
mysqldump -h rds-endpoint -u admin -p minilabdb > backup-$(date +%Y%m%d).sql

# Restore from backup
mysql -h rds-endpoint -u admin -p minilabdb < backup-20261008.sql
```

---

# Environment Configuration

## Frontend Production (.env.production)
```env
VITE_API_BASE_URL=https://api.mini-lab.com
VITE_RAZORPAY_KEY=your_production_razorpay_key
VITE_NODE_ENV=production
```

## Backend Production (application-prod.properties)
```properties
# Server
server.port=8085
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:mysql://db.example.com:3306/minilabdb
spring.datasource.username=admin
spring.datasource.password=SecurePassword123!
spring.jpa.hibernate.ddl-auto=validate

# Security
spring.security.cors.allowed-origins=https://mini-lab.com

# Logging
logging.level.root=WARN
logging.level.com.example=INFO
```

---

# Post-Deployment

## Verification Checklist

### Frontend
- [ ] Frontend loads at custom domain
- [ ] All images load correctly
- [ ] API calls connect to backend
- [ ] Login/signup works
- [ ] Cart functionality works
- [ ] Checkout completes
- [ ] Payment processing works
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Performance acceptable

### Backend
- [ ] API responds to requests
- [ ] Database connection working
- [ ] User creation/login works
- [ ] Product list returns data
- [ ] Orders can be created
- [ ] Error handling works
- [ ] CORS configured correctly
- [ ] SSL certificate valid
- [ ] Logging active
- [ ] Backups configured

## Monitoring Setup

### Application Performance Monitoring (APM)
```bash
# For New Relic
JAVA_OPTS="-javaagent:/path/to/newrelic.jar" java -jar app.jar

# For Datadog
DD_AGENT_HOST=localhost java -jar app.jar
```

### Error Tracking
- Sentry for frontend: `npm install --save @sentry/react`
- Sentry for backend: Maven dependency

### Logging
- CloudWatch for AWS
- Stackdriver for GCP
- ELK Stack for self-hosted

---

## Cost Estimation

| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Frontend (Vercel) | $0-20 | Free tier available |
| Backend (Heroku) | $50-200 | Dyno type dependent |
| Database (AWS RDS) | $30-100 | t3.micro to small |
| CDN (CloudFront) | $0.085/GB | Data transfer cost |
| Domain | $12/year | .com domain |
| SSL | $0 | AWS/Heroku auto |

**Estimated Total:** $100-300/month for production

---

## Security Checklist

- [ ] Database password rotated
- [ ] API keys stored in environment
- [ ] HTTPS/SSL enabled
- [ ] CORS properly configured
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] Authentication tokens encrypted
- [ ] Rate limiting configured
- [ ] Backup strategy implemented
- [ ] Monitoring alerts set up

---

## Next Steps

1. Choose deployment platform
2. Set up environment variables
3. Create Docker files (if needed)
4. Configure CI/CD pipeline
5. Run deployment checklist
6. Monitor production

See individual deployment guides for platform-specific instructions.
