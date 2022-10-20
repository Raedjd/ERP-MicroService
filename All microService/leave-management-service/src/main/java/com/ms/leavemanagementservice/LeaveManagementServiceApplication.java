package com.ms.leavemanagementservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class LeaveManagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeaveManagementServiceApplication.class, args);
	}

}
