FROM openjdk:22
COPY ./target/dreamhouse-user-service.jar /app.jar
ENV SPRING_PROFILES_ACTIVE=docker
CMD ["java", "-jar", "/app.jar"]
