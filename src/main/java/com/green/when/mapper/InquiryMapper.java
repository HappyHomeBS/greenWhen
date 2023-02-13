package com.green.when.mapper;

import com.green.when.vo.InquiryFilesVo;
import com.green.when.vo.InquiryVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper

public interface InquiryMapper {

    String getUserRole(String userId);

    List<InquiryVo> inquiryList(InquiryVo inquiryVo);

    List<InquiryVo> inquiryRead(int no);

    void inquiryWrite(InquiryVo inquiryVo);

    void inquiryReply(InquiryVo inquiryVo);

    void inquiryDelete(int no);

    void inquiryUpdate(InquiryVo inquiryVo);

    InquiryVo setArticle(int no);

    void statusUpdate(int grpNo, String status);

    void fileUpload(InquiryFilesVo inquiryFilesVo);

    int getFileNumber();

    int getInquiryNo();

    List<InquiryFilesVo> getFile(int no);
}