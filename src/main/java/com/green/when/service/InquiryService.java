package com.green.when.service;

import com.green.when.mapper.InquiryMapper;
import com.green.when.vo.InquiryVo;
import com.green.when.vo.InquiryFilesVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {
    @Autowired
    public InquiryMapper mapper;

    // 사이트 관리자 권한 체크
    public String getUserRole(String userId) {
        String userRole = mapper.getUserRole(userId);
        return userRole;
    }

    // 리스트 조회
    public List<InquiryVo> inquiryList(InquiryVo inquiryVo) {
        List<InquiryVo> inquiryList;
        try {
            inquiryList = mapper.inquiryList(inquiryVo);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return inquiryList;
    }
    // 상세보기

    public List<InquiryVo> inquiryRead(int no) {
        List<InquiryVo> inquiryRead;
        try {
            inquiryRead = mapper.inquiryRead(no);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return inquiryRead;
    }

    // 쓰기

    public int inquiryWrite(InquiryVo inquiryVo) {
       int inquiryNo=0;
        try {
            inquiryNo = mapper.getInquiryNo();
            inquiryVo.setNo(inquiryNo);
            mapper.inquiryWrite(inquiryVo);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return inquiryNo;
    }
    //답글달기
    public void inquiryReply(InquiryVo inquiryVo, int grpNo, String status) {
        try {
            mapper.inquiryReply(inquiryVo);
            mapper.statusUpdate(grpNo, status);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    //삭제
    public void inquiryDelete(int no) {
        try {
            mapper.inquiryDelete(no);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    // 수정
    public void inquiryUpdate(InquiryVo inquiryVo) {
        try{
            mapper.inquiryUpdate(inquiryVo);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    //작성자 확인용
    public InquiryVo setArticle (int no) {
        InquiryVo targetArticle;
        try{
            targetArticle = mapper.setArticle(no);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return targetArticle;
    }

    //상태관리용

    public void statusUpdate (int grpNo, String status){
        try{
            mapper.statusUpdate(grpNo, status);
        }catch(Exception e){
            e.printStackTrace();
            throw(e);
        }
    }
    //파일업로드
    public int fileUpload(InquiryFilesVo inquiryFilesVo){

        int fileNo=0;

        try{
            fileNo= mapper.getFileNumber()+1;
            inquiryFilesVo.setNo(fileNo);
            mapper.fileUpload(inquiryFilesVo);

        }catch(Exception e) {
            e.printStackTrace();;
            throw(e);
        }
        return fileNo;
    }
    //파일다운로드
    public List<InquiryFilesVo> getFile(int no){
        List<InquiryFilesVo> fileList;
        try{

            fileList= mapper.getFile(no);
        }catch(Exception e) {
            e.printStackTrace();
            throw(e);
        }
        return fileList;
    }
}