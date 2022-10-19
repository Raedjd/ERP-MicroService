FROM openjdk:19
ADD target/discovry-server.jar descovry-docker.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "descovry-docker.jar"]