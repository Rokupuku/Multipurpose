package com.weather;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class WeatherSiteApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(WeatherSiteApplication.class, args);
    }
} 