FROM openjdk:17
ADD target/job-service.jar job-service.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "job-service.jar"]