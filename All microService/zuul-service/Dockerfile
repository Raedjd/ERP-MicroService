FROM openjdk:8
ADD target/zuul.war zuul-docker.jar
EXPOSE 8762
ENTRYPOINT ["java", "-jar", "zuul-docker.jar"]