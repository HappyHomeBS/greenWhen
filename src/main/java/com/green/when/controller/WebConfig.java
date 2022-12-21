package com.green.when.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//프로젝트 전역 CORS 설정
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:3000") //허용 출처
                .allowedMethods("GET", "POST", "DELETE", "UPDATE") //허용할 메소드
                .allowCredentials(true) //쿠키 허용
                .maxAge(3000); //pre-flight 리퀘스트 캐싱시간
    }
}
