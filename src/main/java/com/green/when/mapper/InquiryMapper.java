package com.green.when.mapper;

import com.green.when.vo.InquiryVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper

public interface InquiryMapper {

    String getUserRole(String userId);

    List<InquiryVo> inquiryList(InquiryVo inquiryVo);

    List<InquiryVo> inquiryRead(InquiryVo inquiryVo);

}
