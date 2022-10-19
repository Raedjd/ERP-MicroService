FROM openjdk:8
ADD target/auth.jar auth-service.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "auth-service.jar"]