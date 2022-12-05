package com.green.when.controller;

import com.green.when.service.NoteService;
import com.green.when.vo.NoteVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.SQLOutput;
import java.util.List;

@Controller
public class NoteController {
    @Autowired
    NoteService noteService;
//  쪽지 리스트 출력
    @GetMapping("/noteList")
    public List<NoteVo> noteList() {
        List<NoteVo> noteList = noteService.getNoteList();
        System.out.println(noteList);
        return noteList;
    }

// 쪽지 쓰기
    @GetMapping("/noteWrite")
    public List<NoteVo> noteWrite(){
        List<NoteVo> noteWrite = noteService.noteWrite();
        System.out.println(noteWrite);
        return null;
    }

//쪽지 쓰는 폼
//쪽지 읽기
    @GetMapping("/noteRead")
    public List<NoteVo> noteRead(){
        List<NoteVo> noteRead = noteService.noteRead();
        System.out.println(noteRead);
        List<NoteVo> noteReadCheck=noteService.noteReadCheck();
        return null;
    }
//쪽지 삭제
    @PostMapping("/noteDelete")
    public List<NoteVo> noteDelete() {
        List<NoteVo> noteDelete = noteService.noteDelete();
        return null;
    }
}
