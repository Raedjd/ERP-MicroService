FROM openjdk:8
EXPOSE 8083
ADD /target/salary-service.jar salary-service.jar
ENTRYPOINT ["java", "-jar", "/salary-service.jar"]