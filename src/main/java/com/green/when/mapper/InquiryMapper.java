package com.green.when.mapper;

import com.green.when.vo.InquiryFilesVo;
import com.green.when.vo.InquiryVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper

public interface InquiryMapper {
    //유저권한
    String getUserRole(String userId);
    //리스트조회
    List<InquiryVo> inquiryList(InquiryVo inquiryVo);
    //상세보기
    List<InquiryVo> inquiryRead(int no);
    //쓰기
    void inquiryWrite(InquiryVo inquiryVo);
    //답글달기
    void inquiryReply(InquiryVo inquiryVo);
    //삭제
    void inquiryDelete(int no);
    //수정
    void inquiryUpdate(InquiryVo inquiryVo);
    //글정보조회
    InquiryVo setArticle(int no);
    //상태업데이트
    void statusUpdate(int grpNo, String status);
    //파일업로드
    void fileUpload(InquiryFilesVo inquiryFilesVo);
    //파일번호
    int getFileNumber();
    //글번호얻기
    int getInquiryNo();
    //파일목록가져오기
    List<InquiryFilesVo> getFile(int no);
}