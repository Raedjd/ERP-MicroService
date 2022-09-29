FROM openjdk:8
ADD target/discovry-server.jar descovry-docker.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "descovry-docker.jar"]