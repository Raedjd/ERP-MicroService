FROM openjdk:8
ADD target/employeeServices-0.0.1-SNAPSHOT.jar employee.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","employee.jar"]