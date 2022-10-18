FROM openjdk:8
ADD target/auth.jar auth-docker.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "auth-docker.jar"]