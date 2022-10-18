FROM openjdk:8
ADD target/config.jar config-docker.jar
EXPOSE 8888
ENTRYPOINT ["java", "-jar", "config-docker.jar"]