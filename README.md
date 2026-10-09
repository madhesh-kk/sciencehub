# ScienceHub - E-Commerce Store

A full-stack e-commerce application for science kits and learning materials, built with React (frontend) and Spring Boot (backend).

## Project Structure

```
mini_lab_ecommerce_website-main/
├── frontend/                    # React + Vite frontend application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components
│   │   ├── data/                # Static data (products, etc.)
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Vite entry point
│   │   └── index.css            # Global styles + Tailwind
│   ├── public/                  # Static assets
│   ├── index.html               # HTML template
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.mjs          # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── .env.example             # Environment variables template
│   └── node_modules/            # Installed npm packages
│
├── backend/                     # Spring Boot backend application
│   ├── src/
│   │   ├── main/java/com/example/springbackend/
│   │   │   ├── controller/      # REST API controllers
│   │   │   ├── service/         # Business logic services
│   │   │   ├── repository/      # Data access layer
│   │   │   ├── model/           # Entity classes
│   │   │   ├── config/          # Spring configurations
│   │   │   └── SpringBackendApplication.java
│   │   └── main/resources/
│   │       └── application.properties
│   ├── pom.xml                  # Maven configuration
│   ├── .env.example             # Environment variables template
│   └── target/                  # Compiled classes and JAR
│
├── .gitignore                   # Git ignore rules
└── README.md                    # This file

```

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Spring Boot 3.2** - Framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction
- **MySQL** - Database (or H2 for development)
- **Maven** - Build tool and dependency management

## Prerequisites

- **Node.js** v16+ (for frontend)
- **npm** or **yarn** (for frontend)
- **Java 17+** (for backend)
- **Maven 3.6+** (for backend)
- **MySQL 8.0+** (optional, H2 available for development)

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your settings:
```env
VITE_API_BASE_URL=http://localhost:8085/api
VITE_RAZORPAY_KEY=your_razorpay_key_here
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create environment configuration:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your database settings:
```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/minilabdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
```

4. Build the project:
```bash
mvn clean install
```

5. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/spring-backend-0.0.1-SNAPSHOT.jar
```

The backend API will be available at `http://localhost:8085/api`

## Running Both Services

### Option 1: Separate Terminals

**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

### Option 2: Using Scripts (if you set them up)

You can create convenience scripts in the root directory:

**On Windows (run.bat):**
```batch
@echo off
start cmd /k "cd frontend && npm install && npm run dev"
start cmd /k "cd backend && mvn spring-boot:run"
```

**On macOS/Linux (run.sh):**
```bash
#!/bin/bash
cd frontend && npm install && npm run dev &
cd backend && mvn spring-boot:run &
```

## Build for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Backend Build

```bash
cd backend
mvn clean package
```

JAR will be in `backend/target/`

## Environment Variables

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:8085/api
VITE_RAZORPAY_KEY=your_razorpay_key_here
VITE_NODE_ENV=development
```

### Backend (application.properties or .env.local)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/minilabdb
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
cors.allowed.origins=http://localhost:5173
```

## API Endpoints

Base URL: `http://localhost:8085/api`

### Auth Endpoints
- `POST /auth/login` - Login user
- `POST /auth/register` - Register new user

### Products
- `GET /products` - List all products
- `GET /products/{id}` - Get product details

### Orders
- `POST /orders` - Create new order
- `GET /orders/{userId}` - Get user's orders

### Cart
- Client-side only (localStorage-based)

## Features

### Frontend
- ✅ Mobile-first responsive design (320px-480px optimized)
- ✅ User authentication (login/signup)
- ✅ Product browsing and search
- ✅ Shopping cart
- ✅ Checkout flow with address form
- ✅ Razorpay payment integration
- ✅ Order management
- ✅ User profile dropdown

### Backend
- ✅ REST API with Spring Boot
- ✅ User authentication and authorization
- ✅ Product catalog management
- ✅ Order processing
- ✅ CORS enabled for frontend communication
- ✅ MySQL database integration

## Project Scripts

### Frontend

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Backend

```bash
# Build project
mvn clean install

# Run tests
mvn test

# Run application
mvn spring-boot:run

# Package for deployment
mvn clean package
```

## Troubleshooting

### Frontend Issues

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**API connection fails:**
- Ensure backend is running on `http://localhost:8085`
- Check `VITE_API_BASE_URL` in `.env.local`
- Check browser console for CORS errors

### Backend Issues

**Port 8085 already in use:**
Update `application.properties`:
```properties
server.port=8086
```

**Database connection fails:**
- Ensure MySQL is running
- Check `SPRING_DATASOURCE_URL`, username, password
- Create database: `CREATE DATABASE minilabdb;`

**Cannot find Java or Maven:**
```bash
# Verify Java
java -version

# Verify Maven
mvn --version
```

## Database Setup

### Create Database

```sql
CREATE DATABASE minilabdb;
USE minilabdb;
```

Spring Boot will auto-create tables based on entity classes (with `spring.jpa.hibernate.ddl-auto=update`)

## Deployment

### Frontend Deployment

1. Build: `npm run build`
2. Deploy `frontend/dist/` to:
   - Vercel, Netlify, GitHub Pages
   - AWS S3 + CloudFront
   - Any static hosting service

### Backend Deployment

1. Build: `mvn clean package`
2. Deploy JAR to:
   - AWS EC2, Heroku, DigitalOcean
   - Docker container
   - Any Java-capable server

## Git Workflow

```bash
# Clone the repository
git clone <repo-url>
cd mini_lab_ecommerce_website-main

# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Create pull request on GitHub
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or contributions:
- Create an Issue on GitHub
- Contact: support@sciencehub.com

---

## Quick Reference

| Task | Command | Location |
|------|---------|----------|
| Start Frontend | `npm run dev` | frontend/ |
| Start Backend | `mvn spring-boot:run` | backend/ |
| Build Frontend | `npm run build` | frontend/ |
| Build Backend | `mvn clean package` | backend/ |
| View Frontend | `http://localhost:5173` | Browser |
| Access API | `http://localhost:8085/api` | Browser |
| Database | `localhost:3306/minilabdb` | MySQL |

