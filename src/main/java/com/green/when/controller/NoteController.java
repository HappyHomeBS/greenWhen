package com.green.when.controller;

import com.green.when.service.NoteService;
import com.green.when.vo.NoteVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class NoteController {
    @Autowired
    NoteService noteService;
//  쪽지 리스트 출력
    @GetMapping("/noteList")
    public List<NoteVo> noteList(@RequestParam String userId) {
        System.out.println("testing!");
        List<NoteVo> noteList = noteService.getNoteList(userId);
        System.out.println(noteList);
        return noteList;
    }

// 쪽지 쓰기
    @PostMapping("/noteWrite")
    public void noteWrite(@RequestBody NoteVo noteVo) {
        noteService.noteWrite(noteVo);
    }

//쪽지 읽기
    @GetMapping("/noteRead")
    public List<NoteVo> noteRead(@RequestParam int no){
        List<NoteVo> noteRead = noteService.noteRead(no);
        System.out.println(noteRead);
        noteService.noteReadCheck(no);
        return noteRead;
    }
//쪽지 삭제
    @PostMapping("/noteDelete")
    public void noteDelete(@RequestParam int no) {
        noteService.noteDelete(no);
    }
}
