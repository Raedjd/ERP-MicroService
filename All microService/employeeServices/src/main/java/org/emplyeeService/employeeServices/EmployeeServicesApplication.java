package org.emplyeeService.employeeServices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class EmployeeServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeServicesApplication.class, args);
	}

}
