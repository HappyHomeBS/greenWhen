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

    @GetMapping("/api/hello")
    public String test() {

        return "Hello, world!!!!";
    }
    
    // 회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody SalaryVo salaryVo) {
        System.out.println(salaryVo.toString());
        salaryService.signup(salaryVo);
        return "/home";


    // 회원정보 중복체크
    } @GetMapping("/userCheck")
    public Model userCheck(@RequestBody SalaryVo salaryVo, Model model) {
        System.out.println(salaryVo.toString());
        int useridCheck = salaryService.useridCheck(salaryVo);
        int usernicknameCheck = salaryService.usernicknameCheck(salaryVo);
        int useremailCheck = salaryService.useremailCheck(salaryVo);
        model.addAttribute("userid", useridCheck);
        model.addAttribute("usernickname", usernicknameCheck);
        model.addAttribute("useremail", useremailCheck);
        System.out.println(model);
        return model;
    }



}

