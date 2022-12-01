package com.green.when.controller;

import com.green.when.service.SalaryService;
import com.green.when.vo.SalaryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

//Git1
@Controller
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

}

