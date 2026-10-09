# Backend Dockerfile - Multi-stage build for optimized production image

# Stage 1: Build
FROM maven:3.9.12-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml and source
COPY pom.xml .
COPY src ./src

# Build application (skip tests for faster build)
RUN mvn clean package -DskipTests -q

# Stage 2: Runtime (lightweight)
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy JAR from builder
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 8085

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8085/actuator/health || exit 1

# Set environment
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Start application
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
