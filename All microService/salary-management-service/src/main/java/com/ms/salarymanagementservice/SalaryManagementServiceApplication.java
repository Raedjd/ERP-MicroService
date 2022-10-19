package com.ms.salarymanagementservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SalaryManagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalaryManagementServiceApplication.class, args);
	}

}
