package com.green.when.controller;

import com.green.when.service.SalaryService;
import com.green.when.vo.SalaryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class HomeController {
    @Autowired
    SalaryService salaryService;
    @RequestMapping("/hello")
        public ModelAndView hello() {
        ModelAndView mv = new ModelAndView();
        List<SalaryVo> salaryList = salaryService.getSalary();
        System.out.println(salaryList);
        mv.addObject("salaryList", salaryList);
        mv.setViewName("hello");

        return mv;
    }

    // 회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody SalaryVo salaryVo) {
        System.out.println(salaryVo.toString());
        salaryService.signup(salaryVo);
        return "/home";
    }

    // 회원정보 중복체크
    @GetMapping("/userCheck")
    public int userCheck(@RequestParam String userid) {
        System.out.println(userid);
        int useridCheck = salaryService.useridCheck(userid);
        System.out.println(useridCheck);
        return useridCheck;

    }

    // 이메일 중복체크
    @GetMapping("/emailCheck")
    public int emailCheck(@RequestParam String useremail) {
        System.out.println(useremail);
        int useremailCheck = salaryService.useremailCheck(useremail);
        System.out.println(useremailCheck);
        return useremailCheck;
    }

    // 닉네임 중복체크
    @GetMapping("/nicknameCheck")
    public int nicknameCheck(@RequestParam String usernickname) {
        System.out.println(usernickname);
        int usernicknameCheck = salaryService.usernicknameCheck(usernickname);
        System.out.println(usernicknameCheck);
        return usernicknameCheck;
    }

}

