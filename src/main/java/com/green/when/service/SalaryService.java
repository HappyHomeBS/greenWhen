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
}
