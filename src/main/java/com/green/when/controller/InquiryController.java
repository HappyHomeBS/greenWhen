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

    public InquiryVo setUserInfo() {
        String userId = SecurityUtil.getCurrentMemberId();
        String userRole = inquiryService.getUserRole(userId);

        InquiryVo userInfo = new InquiryVo();
        userInfo.setUserId(userId);
        userInfo.setUserRole(userRole);

        return userInfo;
    }
    @Autowired
    InquiryService inquiryService;
    //리스트 조회, 사용자 권한 확인 후  vo에 id와 함께 전달
    @GetMapping("/inquiryList")
    public ResponseEntity<Map> inquiryList(){
        InquiryVo inquiryVo = setUserInfo();

        System.out.println("요청데이터");
        List<InquiryVo>inquiryList = inquiryService.inquiryList(inquiryVo);

        Map result = new HashMap<>();
        result.put ("inquiryList", inquiryList);

        System.out.println(result);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/inquiryRead")
    public ResponseEntity<Map> inquiryRead(@RequestParam int no){
        InquiryVo inquiryVo = setUserInfo();
        inquiryVo.setNo(no);
        System.out.println("setting inquiryVo:" + inquiryVo);
        List<InquiryVo> inquiryRead = inquiryService.inquiryRead(inquiryVo);

        Map result = new HashMap<>();
        result.put("inquiryRead", inquiryRead);

        System.out.println(result);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/inquiryWrite")
    public ResponseEntity<Map> inquiryWrite(@RequestBody InquiryVo inquiryVo){
        String userId = SecurityUtil.getCurrentMemberId();
        String userRole = inquiryService.getUserRole(userId);

        inquiryVo.setUserId(userId);
        inquiryVo.setUserRole(userRole);
        System.out.println("inquiryVO"+inquiryVo);
        inquiryService.inquiryWrite(inquiryVo);

        Map result = new HashMap<>();
        System.out.println(result);
        return ResponseEntity.ok(result);
    }
}
