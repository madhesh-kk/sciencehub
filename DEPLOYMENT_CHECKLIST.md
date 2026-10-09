# Deployment Checklist

Complete verification before and after deployment.

---

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing locally
  ```bash
  cd frontend && npm test
  cd backend && mvn test
  ```
- [ ] No console errors or warnings
- [ ] ESLint/Prettier checks pass
  ```bash
  cd frontend && npm run lint
  ```
- [ ] Code reviewed and approved
- [ ] No hardcoded credentials in code
- [ ] No console.log statements in production code

### Build Verification
- [ ] Frontend builds successfully
  ```bash
  cd frontend && npm run build
  ```
- [ ] Build output size acceptable (dist/ < 500KB)
- [ ] No build warnings
- [ ] Backend builds successfully
  ```bash
  cd backend && mvn clean package
  ```
- [ ] JAR file created (< 100MB)
- [ ] No compilation errors

### Environment Setup
- [ ] Production .env variables prepared
- [ ] Database credentials secured
- [ ] API keys rotated (if needed)
- [ ] SSL certificates valid
- [ ] Domain DNS records configured
- [ ] CORS origins whitelisted

### Database
- [ ] Database schema validated
- [ ] Migrations tested locally
- [ ] Backup strategy in place
- [ ] Database user permissions configured
- [ ] Connection string verified

### Dependencies
- [ ] All npm packages up to date
  ```bash
  npm audit fix
  ```
- [ ] No critical vulnerabilities
  ```bash
  npm audit
  ```
- [ ] Maven dependencies resolved
- [ ] License compliance checked

### Security
- [ ] HTTPS/SSL configured
- [ ] Security headers configured
- [ ] CORS properly set
- [ ] Authentication tokens encrypted
- [ ] Rate limiting configured
- [ ] Input validation implemented
- [ ] SQL injection prevention enabled

### Performance
- [ ] Frontend optimized
  - [ ] Images compressed
  - [ ] Code splitting enabled
  - [ ] Lazy loading configured
  - [ ] Bundle size analyzed
- [ ] Backend optimized
  - [ ] Database indexes created
  - [ ] Connection pooling configured
  - [ ] Caching enabled

### Documentation
- [ ] Deployment procedure documented
- [ ] Rollback procedure documented
- [ ] Environment variables documented
- [ ] API documentation updated
- [ ] Known issues documented

---

## Deployment Steps

### Step 1: Frontend Deployment

#### Option A: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod

# Verify
# - Check domain loads
# - Verify API calls work
# - Test on mobile
```

#### Option B: Netlify
```bash
# Via Netlify Dashboard
# 1. Push to main branch
# 2. Netlify auto-deploys
# 3. Verify deployment in Netlify dashboard
```

#### Option C: AWS S3 + CloudFront
```bash
cd frontend
npm run build

aws s3 sync dist/ s3://mini-lab-frontend-prod --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

### Step 2: Backend Deployment

#### Option A: Heroku
```bash
# Ensure Procfile exists
git push heroku main

# Verify
heroku logs --tail
curl https://your-app.herokuapp.com/api/actuator/health
```

#### Option B: AWS EC2
```bash
# SSH to instance
ssh -i key.pem ec2-user@instance-ip

# Pull latest code
git pull origin main

# Build
cd backend
mvn clean package

# Run with systemd
sudo systemctl restart mini-lab-backend
```

#### Option C: Docker
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Verify
docker-compose ps
docker-compose logs -f backend
```

### Step 3: Database Deployment
```bash
# Apply migrations
cd backend
mvn flyway:migrate

# Or if using Spring Boot auto-update
# Ensure spring.jpa.hibernate.ddl-auto=update

# Verify connection
mysql -h db.example.com -u admin -p minilabdb -e "SELECT 1"
```

---

## Post-Deployment Verification

### Immediate Tests (Within 5 minutes)

#### Frontend
- [ ] Domain loads (https://mini-lab.com)
- [ ] Logo displays correctly
- [ ] Navigation menu functional
- [ ] Search bar responsive
- [ ] Cart button visible and clickable
- [ ] Profile icon present
- [ ] No console errors (F12)
- [ ] Mobile view works (DevTools)

#### Backend
- [ ] API health check passes
  ```bash
  curl https://api.mini-lab.com/api/actuator/health
  ```
- [ ] CORS configured correctly
  ```bash
  curl -H "Origin: https://mini-lab.com" \
       -H "Access-Control-Request-Method: POST" \
       https://api.mini-lab.com/api/auth/login -v
  ```

### Functional Tests (First 30 minutes)

#### User Flow
- [ ] **Login**
  - [ ] Can sign up
  - [ ] Can login with valid credentials
  - [ ] Cannot login with invalid credentials
  - [ ] Remember password works
  - [ ] Logout works

- [ ] **Shopping**
  - [ ] Products load from API
  - [ ] Can search products
  - [ ] Can add to cart
  - [ ] Cart count updates
  - [ ] Can remove from cart
  - [ ] Cart persists on refresh

- [ ] **Checkout**
  - [ ] Can enter address
  - [ ] Can proceed to payment
  - [ ] Razorpay loads
  - [ ] Payment processing works
  - [ ] Order confirmation displays
  - [ ] Email confirmation sent (if configured)

#### API Endpoints
- [ ] `GET /api/products` - Returns 200
- [ ] `POST /api/auth/login` - Returns 200 with valid credentials
- [ ] `POST /api/orders` - Creates order
- [ ] Error responses are valid (4xx, 5xx)

### Performance Tests (First hour)

#### Frontend
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 80
  ```bash
  npm install -g lighthouse
  lighthouse https://mini-lab.com --view
  ```
- [ ] Mobile performance good
- [ ] Images load quickly
- [ ] Animations smooth

#### Backend
- [ ] API response time < 200ms
- [ ] Database queries efficient
- [ ] No connection pool exhaustion
- [ ] Memory usage stable
- [ ] CPU usage normal

### Monitoring Setup

#### Logs
- [ ] Frontend errors logged to Sentry
- [ ] Backend logs to CloudWatch/Stackdriver
- [ ] Database query logs monitored

#### Metrics
- [ ] Response times tracked
- [ ] Error rates monitored
- [ ] Traffic monitored
- [ ] Database performance tracked

#### Alerts
- [ ] Downtime alert configured
- [ ] High error rate alert configured
- [ ] Resource limit alert configured
- [ ] Unusual traffic alert configured

---

## Rollback Procedure

If deployment fails or issues are discovered:

### Frontend Rollback (Vercel)
```bash
# Option 1: Revert git commit
git revert HEAD
git push origin main
# Vercel auto-deploys

# Option 2: Manually rollback in Vercel dashboard
# 1. Go to Deployments
# 2. Click previous deployment
# 3. Click "Promote to Production"
```

### Backend Rollback (Heroku)
```bash
# Rollback to previous release
heroku releases --app your-app-name
heroku rollback v123 --app your-app-name

# Verify
heroku logs --tail
```

### Backend Rollback (AWS EC2)
```bash
# Revert to previous code
git revert HEAD
git pull origin main

# Rebuild
mvn clean package

# Restart service
sudo systemctl restart mini-lab-backend

# Verify
curl https://api.mini-lab.com/api/actuator/health
```

### Database Rollback
```bash
# Restore from backup
mysql -h db.example.com -u admin -p minilabdb < backup-$(date -d "1 day ago" +%Y%m%d).sql

# Verify
mysql -h db.example.com -u admin -p minilabdb -e "SELECT COUNT(*) FROM user"
```

---

## Post-Deployment Actions

- [ ] Monitor logs for 24 hours
- [ ] Check monitoring dashboards
- [ ] Notify team of successful deployment
- [ ] Update deployment log
- [ ] Create release notes
- [ ] Backup current state
- [ ] Schedule next deployment (if planned)

---

## Common Issues & Solutions

### Frontend Issues

**"API calls failing"**
- Check VITE_API_BASE_URL in .env.production
- Verify backend is running
- Check CORS configuration
- Check browser console for errors

**"CSS/Images not loading"**
- Verify vite build output path
- Check asset paths in code
- Verify CDN configuration
- Clear browser cache (Cmd+Shift+Delete)

**"High load times"**
- Analyze bundle size: `npm run build -- --analyze`
- Check CDN caching
- Optimize images
- Enable compression in server

### Backend Issues

**"Database connection failing"**
- Verify connection string
- Check database server status
- Verify credentials
- Check firewall/security groups
- Test connection: `mysql -h host -u user -p db`

**"High memory usage"**
- Check for memory leaks
- Increase heap: `JAVA_OPTS="-Xmx1024m"`
- Optimize queries
- Enable connection pooling

**"High error rates"**
- Check logs: `heroku logs --tail`
- Monitor metrics
- Check database status
- Verify API requests

---

## Sign-Off

- [ ] Deployment verified by QA
- [ ] Product owner approval
- [ ] Team notification sent
- [ ] Documentation updated
- [ ] Deployment date: _______________
- [ ] Deployed by: _______________
- [ ] Verified by: _______________

---

**Deployment Status**: ✅ Complete
**Date**: _________________
**Version**: _________________
