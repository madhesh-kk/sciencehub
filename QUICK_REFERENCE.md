# Quick Reference Guide

## 🚀 Start Development

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
→ Opens `http://localhost:5173`

### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
→ Runs on `http://localhost:8085/api`

---

## 🔧 Common Commands

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview build locally
```

### Backend
```bash
mvn clean install      # Build with tests
mvn spring-boot:run    # Run app
mvn test               # Run tests
mvn clean package      # Package as JAR
```

---

## ⚙️ Environment Setup

### 1. Frontend
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local:
# VITE_API_BASE_URL=http://localhost:8085/api
# VITE_RAZORPAY_KEY=your_key_here
```

### 2. Backend
```bash
cd backend
cp .env.example .env.local
# Edit .env.local:
# SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/minilabdb
# SPRING_DATASOURCE_USERNAME=root
# SPRING_DATASOURCE_PASSWORD=your_password
```

---

## 📁 Project Structure

```
mini_lab_ecommerce_website-main/
│
├── frontend/                    ← React app
│   ├── src/
│   ├── package.json
│   ├── vite.config.mjs
│   └── README.md
│
├── backend/                     ← Spring Boot API
│   ├── src/
│   ├── pom.xml
│   └── README.md
│
├── README.md                    ← Start here!
└── .gitignore
```

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:8085/api`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| GET | `/products` | List products |
| POST | `/orders` | Create order |

---

## 📱 Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 8085 | http://localhost:8085 |
| MySQL | 3306 | localhost:3306 |

---

## 🛠️ Troubleshooting

### Frontend won't start?
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't run?
```bash
cd backend
mvn clean
mvn spring-boot:run
```

### Port already in use?
**Frontend:**
```bash
npm run dev -- --port 3000
```

**Backend:**
- Edit `backend/src/main/resources/application.properties`
- Change `server.port=8086`

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Overall project guide |
| `frontend/README.md` | Frontend development |
| `backend/README.md` | Backend development |
| `RESTRUCTURE_COMPLETE.md` | What changed |
| `PROJECT_RESTRUCTURE_CHECKLIST.md` | Verification checklist |

---

## 🚢 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Backend
```bash
cd backend
mvn clean package
# Output: backend/target/spring-backend-*.jar
```

---

## 🐳 Docker

### Build Frontend Image
```bash
docker build -t mini-lab-frontend -f frontend/Dockerfile .
docker run -p 3000:3000 mini-lab-frontend
```

### Build Backend Image
```bash
docker build -t mini-lab-backend -f backend/Dockerfile .
docker run -p 8085:8085 mini-lab-backend
```

---

## 💾 Database Setup

### Create Database
```sql
CREATE DATABASE minilabdb;
USE minilabdb;
```

Spring Boot auto-creates tables with `spring.jpa.hibernate.ddl-auto=update`

---

## 🔑 Key Technologies

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

## 👥 Team Workflow

### Frontend Developer
```bash
cd frontend
git checkout -b feature/new-feature
npm run dev
# Make changes...
git add .
git commit -m "feat: new feature"
git push origin feature/new-feature
```

### Backend Developer
```bash
cd backend
git checkout -b feature/api-endpoint
mvn spring-boot:run
# Make changes...
git add .
git commit -m "feat: new endpoint"
git push origin feature/api-endpoint
```

---

## 📊 Build Status

✅ Frontend: `npm run build` — **PASSING**
✅ Backend: `mvn clean install` — **PASSING**

---

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Tailwind CSS](https://tailwindcss.com)
- [MySQL Docs](https://dev.mysql.com/doc)

---

## 💡 Tips

1. **Always update API URL** in `frontend/.env.local` when deploying
2. **Test locally first** before pushing to git
3. **Check git status** before committing
4. **Use separate terminals** for frontend and backend
5. **Read README.md files** for detailed setup

---

## 📞 Support

For detailed guidance:
- See `README.md` for full project setup
- See `frontend/README.md` for React development
- See `backend/README.md` for Spring Boot development

---

**Last Updated:** October 2026
**Project Status:** ✅ Production Ready
