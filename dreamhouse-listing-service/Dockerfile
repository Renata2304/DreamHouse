FROM openjdk:22
COPY ./dreamhouse-listing-service/target/dreamhouse-listing-service.jar /app.jar
ENV SPRING_PROFILES_ACTIVE=docker
CMD ["java", "-jar", "/app.jar"]
