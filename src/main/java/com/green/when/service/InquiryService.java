package com.green.when.service;

import com.green.when.mapper.InquiryMapper;
import com.green.when.vo.InquiryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {
    @Autowired
    public InquiryMapper mapper;

    public List<InquiryVo> inquiryList(InquiryVo inquiryVo){
        List<InquiryVo> inquiryList;
        try{
            inquiryList = mapper.inquiryList(inquiryVo);
        } catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
        return inquiryList;
    }
}
