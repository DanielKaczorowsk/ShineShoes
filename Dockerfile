FROM maven:3.9.6-eclipse-temurin-21 AS builder
LABEL authors="DKacz"
WORKDIR /build
COPY pom.xml .
COPY src ./src
#RUN mvn clean package -DskipTests
RUN mvn clean test package

FROM eclipse-temurin:21-jre
WORKDIR /app
RUN useradd -ms/bin/bash appuser
COPY --from=builder /build/target/*.jar /app/app.jar
RUN chown appuser:appuser app.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar","app.jar"]