# 🚀 Mini Lab E-Commerce - Start Here

Welcome! This is your clean, organized, production-ready project.

---

## 📁 What You Have

A **full-stack e-commerce application** with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Spring Boot + MySQL
- **Structure**: Separate frontend/ and backend/ folders
- **Status**: Production Ready ✅

---

## ⚡ Quick Start (2 Minutes)

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
→ Opens `http://localhost:5173`

### 2. Backend Setup (in another terminal)
```bash
cd backend
mvn spring-boot:run
```
→ Runs on `http://localhost:8085/api`

**That's it! 🎉**

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **README.md** | Full project guide with setup & architecture |
| **QUICK_REFERENCE.md** | Commands, endpoints, ports at a glance |
| **frontend/README.md** | React development guide |
| **backend/README.md** | Spring Boot development guide |

---

## 🔧 Environment Setup

### Frontend
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local:
VITE_API_BASE_URL=http://localhost:8085/api
VITE_RAZORPAY_KEY=your_key_here
```

### Backend
```bash
cd backend
cp .env.example .env.local
# Edit .env.local:
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/minilabdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
```

---

## 📱 What's Inside

### Frontend (React)
- ✅ Mobile-first design (320px-480px)
- ✅ User authentication
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Checkout flow
- ✅ Razorpay payments
- ✅ Responsive UI

### Backend (Spring Boot)
- ✅ REST API
- ✅ User management
- ✅ Product management
- ✅ Order processing
- ✅ CORS enabled
- ✅ MySQL database

---

## 🎯 Common Tasks

### Start Development
```bash
# Terminal 1
cd frontend && npm run dev

# Terminal 2
cd backend && mvn spring-boot:run
```

### Build for Production
```bash
# Frontend
cd frontend && npm run build
# Output: frontend/dist/

# Backend
cd backend && mvn clean package
# Output: backend/target/*.jar
```

### Install Dependencies
```bash
cd frontend && npm install
# Backend dependencies: automatic with mvn
```

### Run Tests
```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && mvn test
```

---

## 🌐 API Endpoints

**Base URL**: `http://localhost:8085/api`

```
POST   /auth/login          - User login
POST   /auth/register       - User signup
GET    /products            - List products
POST   /orders              - Create order
```

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite 5
- Tailwind CSS 3
- React Router 7
- Axios

### Backend
- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- MySQL 8.0
- Java 17+

---

## 📊 Project Status

```
✅ Frontend Build:    PASSING
✅ Backend Build:     PASSING
✅ Documentation:     COMPLETE
✅ Structure:         ORGANIZED
✅ Ready for:         Production
```

---

## 🚢 Deployment

### Frontend → Vercel/Netlify
```bash
npm run build
# Deploy frontend/dist/ folder
```

### Backend → AWS/Heroku/Docker
```bash
mvn clean package
# Deploy backend/target/*.jar
```

---

## 💡 Pro Tips

1. **Always run both services** for full functionality
2. **Check .env files** are configured correctly
3. **Use separate terminals** for frontend and backend
4. **Frontend port 5173** and backend port 8085 (configurable)
5. **Read README.md** for detailed setup

---

## ❓ Troubleshooting

**Frontend won't start?**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Backend won't run?**
```bash
cd backend
mvn clean
mvn spring-boot:run
```

**API connection fails?**
- Check backend is running: `http://localhost:8085`
- Check `VITE_API_BASE_URL` in `frontend/.env.local`
- Check browser console for CORS errors

---

## 📖 Learn More

- See **README.md** for full documentation
- See **frontend/README.md** for React details
- See **backend/README.md** for Spring Boot details
- See **QUICK_REFERENCE.md** for quick commands

---

## 🎓 Project Structure

```
mini_lab_ecommerce_website-main/
├── frontend/          ← React app (start here for UI)
├── backend/           ← Spring Boot (start here for API)
├── README.md          ← Full documentation
└── QUICK_REFERENCE.md ← Quick commands
```

---

## 🚀 Next Steps

1. ✅ Run `cd frontend && npm install`
2. ✅ Run `cd frontend && npm run dev`
3. ✅ Run `cd backend && mvn spring-boot:run` (in another terminal)
4. ✅ Open `http://localhost:5173` in browser
5. ✅ Start developing!

---

## 📞 Questions?

- Frontend issues? → See `frontend/README.md`
- Backend issues? → See `backend/README.md`
- Setup issues? → See `README.md`
- Quick commands? → See `QUICK_REFERENCE.md`

---

**Happy coding! 🎉**

**Project Status**: ✅ Production Ready
**Last Updated**: October 2026
