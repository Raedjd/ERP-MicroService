package com.ms.eventms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class EventMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventMsApplication.class, args);
    }

     @GetMapping("/c")
    public String tt(){
        return "raed";
     }
}
