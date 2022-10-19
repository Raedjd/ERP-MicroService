FROM openjdk:8
ADD target/auth.jar auth-docker.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "auth-docker.jar"]