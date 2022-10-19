FROM openjdk:8
ADD target/zuul-service-0.0.1-SNAPSHOT.war zuul-service.jar
EXPOSE 8762
ENTRYPOINT ["java", "-jar", "zuul-service.jar"]