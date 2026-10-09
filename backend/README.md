# Mini Lab Backend - Spring Boot

A Spring Boot REST API backend for the Mini Lab e-commerce store.

## Quick Start

### Build Project
```bash
mvn clean install
```

### Run Application
```bash
mvn spring-boot:run
```

Server starts on `http://localhost:8085`

### Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local` and set database credentials:
```properties
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/minilabdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
```

## Project Structure

```
src/main/java/com/example/springbackend/
├── controller/          # REST API endpoints
│   ├── AuthController.java
│   ├── ProductController.java
│   └── OrderController.java
├── service/             # Business logic
│   ├── AuthService.java
│   └── OrderService.java
├── repository/          # Data access (JPA)
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   └── OrderRepository.java
├── model/               # Entity classes
│   ├── User.java
│   ├── Product.java
│   └── Order.java
├── config/              # Spring configurations
│   ├── SecurityConfig.java
│   └── WebConfig.java
└── SpringBackendApplication.java

src/main/resources/
└── application.properties  # Spring configuration
```

## Technologies

- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- MySQL 8.0 (or H2 for development)
- Maven 3.6+
- Java 17+

## API Endpoints

### Base URL
`http://localhost:8085/api`

### Authentication Endpoints

**POST** `/auth/login`
- Request body: `{ "username": "email@example.com", "password": "password" }`
- Response: `{ "id": 1, "username": "email@example.com", "email": "email@example.com" }`

**POST** `/auth/register`
- Request body: `{ "username": "email@example.com", "password": "password" }`
- Response: `{ "id": 1, "username": "email@example.com" }`

### Product Endpoints

**GET** `/products`
- Returns list of all products
- Response: `[ { "id": 1, "name": "Product Name", "price": 299.99 }, ... ]`

### Order Endpoints

**POST** `/orders`
- Create new order
- Request body:
```json
{
  "username": "user@example.com",
  "userAddress": "123 Main St, City - 12345",
  "paymentId": "razorpay_payment_id",
  "amount": 1999,
  "cart": [
    { "id": 1, "qty": 2, "price": 299.99 },
    ...
  ]
}
```
- Response: Order created successfully

## Database Setup

### Create Database

```sql
CREATE DATABASE minilabdb;
USE minilabdb;
```

### Entity Schema

**Users Table**
```sql
CREATE TABLE user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Products Table**
```sql
CREATE TABLE product (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2),
  description TEXT,
  image_url VARCHAR(255)
);
```

**Orders Table**
```sql
CREATE TABLE orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  address VARCHAR(255),
  payment_id VARCHAR(255),
  amount DECIMAL(10, 2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
```

Spring Boot will auto-create these tables if `spring.jpa.hibernate.ddl-auto=update`

## Configuration

### application.properties

```properties
# Server
server.port=8085
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/minilabdb
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# CORS
cors.allowed.origins=http://localhost:5173,http://localhost:3000

# Logging
logging.level.root=INFO
logging.level.com.example.springbackend=DEBUG
```

## Available Scripts

```bash
# Build project
mvn clean install

# Run tests
mvn test

# Run application
mvn spring-boot:run

# Package for deployment
mvn clean package

# Run packaged JAR
java -jar target/spring-backend-0.0.1-SNAPSHOT.jar

# View dependency tree
mvn dependency:tree
```

## Development

### IDE Setup

**VS Code + Extension Pack for Java:**
1. Install Extension Pack for Java
2. Open project in VS Code
3. Maven extension will auto-detect pom.xml

**IntelliJ IDEA:**
1. Open project
2. Right-click pom.xml → Run Maven → Reimport
3. Configure project SDK (Java 17+)

### Run in Debug Mode

```bash
# Debug mode on port 5005
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
```

### Hot Reload with DevTools

Add Spring Boot DevTools for auto-reload:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>runtime</scope>
  <optional>true</optional>
</dependency>
```

## Security

- Spring Security configured in `config/SecurityConfig.java`
- CORS enabled for frontend communication
- Password encoding with BCrypt
- Authentication filters for protected endpoints

## Error Handling

API returns standard error responses:

```json
{
  "status": 400,
  "message": "Bad Request",
  "details": "Detailed error message"
}
```

Common HTTP Status Codes:
- `200 OK` - Success
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not authorized
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Deployment

### Build for Production

```bash
mvn clean package
```

JAR file: `target/spring-backend-0.0.1-SNAPSHOT.jar`

### Run on Server

```bash
# Basic
java -jar spring-backend-0.0.1-SNAPSHOT.jar

# With environment variables
java -Dspring.datasource.url=jdbc:mysql://prod-db:3306/minilabdb \
     -Dspring.datasource.username=produser \
     -Dspring.datasource.password=prodpass \
     -jar spring-backend-0.0.1-SNAPSHOT.jar

# With external config
java -jar spring-backend-0.0.1-SNAPSHOT.jar \
     --spring.config.location=file:/etc/config/application.properties
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM openjdk:17-slim
WORKDIR /app
COPY target/spring-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:

```bash
docker build -t mini-lab-backend .
docker run -p 8085:8085 -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/minilabdb mini-lab-backend
```

## Testing

### Unit Tests

```bash
mvn test
```

### Integration Tests

Tests marked with `@SpringBootTest` run against H2 database automatically.

## Troubleshooting

### Port 8085 already in use

```bash
# Change port in application.properties
server.port=8086

# Or override via command line
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8086"
```

### Database Connection Fails

1. Ensure MySQL is running:
```bash
mysql -u root -p
```

2. Create database:
```sql
CREATE DATABASE minilabdb;
```

3. Check credentials in `application.properties`

### Maven build fails

```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Rebuild
mvn clean install
```

### Cannot find Java

```bash
# Verify Java installation
java -version

# Set JAVA_HOME if needed
export JAVA_HOME=/path/to/java17
```

## Performance Tips

- Use database indexes on frequently queried columns
- Enable caching for products
- Use pagination for list endpoints
- Monitor slow queries with `spring.jpa.show-sql=true`

## Monitoring

### Enable Actuator (optional)

Add to `pom.xml`:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Health endpoint: `http://localhost:8085/actuator/health`

## Related

- Frontend: See `../frontend/README.md`
- Main project: See `../README.md`

