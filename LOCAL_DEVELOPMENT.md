# Local Development Guide - ScienceHub

## Prerequisites
- Node.js 18+ installed
- Java 17+ installed
- MySQL Server running
- MySQL Workbench open with `sciencehub` database

## Step 1: Start MySQL Backend

```bash
cd backend
mvn spring-boot:run "-Dspring-boot.run.arguments=--spring.profiles.active=mysql --server.port=8085"
```

Expected output:
```
Started SpringBackendApplication in X seconds
```

Backend is now running on: **http://localhost:8085**

## Step 2: Start Frontend (New Terminal)

```bash
cd frontend
npm install  # First time only
npm run dev
```

Frontend will run on: **http://localhost:5173**

## Step 3: Test the App

1. Open http://localhost:5173 in browser
2. Register a new account (use any email)
3. Login
4. Add products to cart
5. Checkout (use test card: 4111 1111 1111 1111)

## Step 4: View Data in MySQL Workbench

1. Open MySQL Workbench
2. Connect to `sciencehub` database
3. Expand **Tables**
4. You'll see:
   - **users** - All registered users
   - **orders** - All orders/checkouts
5. Double-click any table to view data

## Database Schema

### users table
```sql
SELECT * FROM users;
```
Shows: `id`, `username` (email), `password`

### orders table
```sql
SELECT * FROM orders;
```
Shows: `id`, `username`, `user_address`, `payment_id`, `order_id`, `signature`, `amount`, `cart`

## Troubleshooting

**Backend won't start:**
- Check MySQL is running: `mysql -u root -p`
- Check port 8085 is free: Stop any other Java processes

**Frontend shows "Failed to fetch":**
- Make sure backend is running on port 8085
- Check `.env.development` has `VITE_API_BASE_URL=http://localhost:8085`

**No data appearing in MySQL:**
- Make sure you completed registration/checkout
- Refresh MySQL Workbench tables (right-click Tables → Refresh)

## Production Deployment

For Render deployment, use the production configs:
- `application-prod.properties` (backend)
- `.env.production` (frontend)
