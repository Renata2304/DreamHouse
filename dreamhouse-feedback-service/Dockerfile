FROM openjdk:22
COPY ./dreamhouse-feedback-service/target/dreamhouse-feedback-service.jar /app.jar
ENV SPRING_PROFILES_ACTIVE=docker
CMD ["java", "-jar", "/app.jar"]
