package com.green.when.service;

import com.green.when.mapper.NoteMapper;
import com.green.when.vo.NoteVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NoteService {
    @Autowired
    public NoteMapper mapper;
    //리스트 조회
    public List<NoteVo> getNoteList() {
        return mapper.getNoteList();
    }
    //쓰기
    public List<NoteVo> noteWrite() {
        return mapper.noteWrite();
    }
    //읽기
    public List<NoteVo> noteRead(){
        return mapper.noteRead();
    }
    //수신확인
    public List<NoteVo> noteReadCheck(){
        return mapper.noteReadCheck();
    }
    //삭제
    public List<NoteVo> noteDelete(){
        return mapper.noteDelete();
    }

}
