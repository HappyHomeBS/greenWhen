package com.green.when.service;

import com.green.when.mapper.SalaryMapper;
import com.green.when.vo.SalaryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryService {
    @Autowired
    public SalaryMapper mapper;
    public List<SalaryVo> getSalary() {
        return mapper.getSalary();}

    public void signup(SalaryVo salaryVo) {
        mapper.signup(salaryVo);
    }

    public int useridCheck(SalaryVo salaryVo) {
        return mapper.useridCheck(salaryVo);
    }

    public int usernicknameCheck(SalaryVo salaryVo) {
        return mapper.usernicknameCheck(salaryVo);
    }

    public int useremailCheck(SalaryVo salaryVo) {
        return mapper.useremailCheck(salaryVo);
    }
}
