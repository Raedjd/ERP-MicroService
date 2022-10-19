package org.entretien.entretienService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class EntretienServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EntretienServiceApplication.class, args);
	}

}
