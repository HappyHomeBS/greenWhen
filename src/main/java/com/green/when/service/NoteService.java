package com.green.when.service;

import com.green.when.mapper.NoteMapper;
import com.green.when.vo.NoteVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
    public int noteCount(String userId){
        try{
            return mapper.noteCount(userId) ;
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    //리스트 조회 페이징
    public List<NoteVo> noteListPage(String userId, int displayPost, int postNum) {
        HashMap data = new HashMap();

        data.put("userId", userId);
        data.put("displayPost", displayPost);
        data.put("postNum", postNum);

        List<NoteVo> noteList;
        try{
            noteList = mapper.noteListPage(data);
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
    public List<NoteVo> noteRead(int no) {
        List<NoteVo> note;
        try {
            note = mapper.noteRead(no);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return note;
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

    //보낸 쪽지함
    public List<NoteVo> noteSentList(String userId) {
        List<NoteVo> noteList;
        try {
           noteList= mapper.noteSentList(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return noteList;
    }

}
