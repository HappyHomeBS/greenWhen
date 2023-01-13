package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.InquiryService;
import com.green.when.vo.InquiryVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")

public class InquiryController{
    @Autowired
    InquiryService inquiryService;

    @GetMapping("/inquiryList")
    public ResponseEntity<Map> inquiryList(){
        String userid = SecurityUtil.getCurrentMemberId();

        InquiryVo inquiryVo = new InquiryVo();
        inquiryVo.setUserId(userid);


        System.out.println("요청데이터");
        List<InquiryVo>inquiryList = inquiryService.inquiryList(inquiryVo);

        Map result = new HashMap<>();
        result.put ("inquiryList", inquiryList);

        System.out.println(result);
        return ResponseEntity.ok(result);
    }
}
