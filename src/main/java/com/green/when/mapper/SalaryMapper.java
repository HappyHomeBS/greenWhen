package com.green.when.mapper;

import com.green.when.vo.SalaryVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
//기존 DaoImpl 대신 mapper와 다이렉트 연결
@Repository
@Mapper
public interface SalaryMapper {
    List<SalaryVo> getSalary();

    void signup(SalaryVo salaryVo);
}
