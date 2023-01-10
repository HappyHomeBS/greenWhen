package com.green.when.service;

import com.green.when.mapper.NoteMapper;
import com.green.when.vo.NoteVo;
import com.green.when.vo.PageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    public NoteMapper mapper;
    //리스트 조회
    public List<NoteVo> getNoteList(String userId) {
         List<NoteVo> noteList;
         try{
             noteList = mapper.getNoteList(userId);
         } catch(Exception e){
             e.printStackTrace();
             throw e;
         }
            return noteList;
    }
    //페이징을 위한 카운트
    public int noteCount(PageVo page){
        try{
            return mapper.noteCount(page) ;
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    public int noteSentCount(PageVo page){
        try{
            return mapper.noteSentCount(page) ;
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    //리스트 조회 페이징
    public List<NoteVo> noteListPage(PageVo page) {

        List<NoteVo> noteList;
        try{
            noteList = mapper.noteListPage(page);
        } catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
        return noteList;
    }
    //보낸 쪽지함
    public List<NoteVo> noteSentList(PageVo page) {

        List<NoteVo> noteList;
        try{
            noteList = mapper.noteSentList(page);
        } catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
        return noteList;
    }
    //쓰기
    public void noteWrite(NoteVo noteVo) {
        try {
            mapper.noteWrite(noteVo);
            }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    //읽기
    public NoteVo noteRead(int no) {
        NoteVo noteVo;
        try {
            noteVo = mapper.noteRead(no);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return noteVo;
    }

    //수신확인
    public void noteReadCheck(int no){
        try {
            mapper.noteReadCheck(no);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    //삭제
    public void noteDelete(int no){
         try {
             mapper.noteDelete(no);
         }catch (Exception e) {
             e.printStackTrace();
             throw e;
         }
    }


}
