FROM openjdk:8
ADD target/job.jar job-docker.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "job-docker.jar"]