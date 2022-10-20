FROM openjdk:8
ADD target/job-service.jar job-service.jar
EXPOSE 8086
ENTRYPOINT ["java", "-jar", "job-service.jar"]