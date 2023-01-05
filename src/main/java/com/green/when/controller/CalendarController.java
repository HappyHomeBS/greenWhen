package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.AdminService;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.vo.ScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {

    private final AdminService adminService;

    @PostMapping("/schedule")
    public void  patch(@RequestBody ScheduleVo scheduleVo ) {
        System.out.println(scheduleVo);
    }


    @PostMapping("/userDelete")
    public void userDelete(@RequestBody MemberVo memberVo) {
        System.out.println(memberVo.toString());
        adminService.userDelete(memberVo);
    }

    @PostMapping("/roleChange")
    public void roleChange(@RequestBody MemberVo memberVo) {
        String userid = SecurityUtil.getCurrentMemberId();
        String inputId = memberVo.getUserid();
        if (userid.equals(inputId)){
            System.out.println("오류: 같은아이디 입니다.");
        } else {
            adminService.roleChange(memberVo);
        }

    }

}