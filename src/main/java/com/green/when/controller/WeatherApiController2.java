package com.green.when.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class WeatherApiController2 {
    @GetMapping("/todayWeather")

        public ResponseEntity<Map> restApiGetWeather() throws Exception {

        //지역 정보 읽어오는 방법 찾아야하고 URL BUSAN부분 도시 이름으로 바꿀 수 있게

        String appUrl = "https://api.openweathermap.org/data/2.5/weather?q=Busan&appid=0d4156b167362a339b8e51c8f22507ef&lang=kr";

//                "https://api.openweathermap.org/data/3.0/onecall?"
//                +"lat="+lat
//                +"&lon="+lon
//                +"&exclude=daily&appid=0d4156b167362a339b8e51c8f22507ef&lang=kr";

        URL url = new URL(appUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        //응답코드 확인 후 정보읽어옴
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        //읽어오는 정보마다 붙여줌
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();
        //완성된 문자열을 잭슨맵으로 json 파싱
        String data = sb.toString();
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jacksonMap = objectMapper.readValue(data, new TypeReference<Map<String, Object>>(){});
        System.out.println(jacksonMap);

        return ResponseEntity.ok(jacksonMap);
    }
}
