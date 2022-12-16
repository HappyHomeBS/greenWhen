package com.green.when.controller;
import com.green.when.service.NoteService;
import com.green.when.vo.NoteVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class NoteController {
    @Autowired
    NoteService noteService;
//  쪽지 리스트 출력
    @GetMapping("/note/{userId}")
    public List<NoteVo> noteList(@PathVariable String userId) {
        System.out.println("userid:"+userId);
        System.out.println("testing!");
        List<NoteVo> noteList = noteService.getNoteList(userId);
        System.out.println(noteList);
        return noteList;
    }

// 쪽지 쓰기
    @PostMapping("/noteWrite")
    public void noteWrite(@RequestBody NoteVo noteVo) {
        System.out.println(noteVo);
        noteService.noteWrite(noteVo);
    }

//쪽지 읽기
    @GetMapping("/note/{userId}/{no}")
    public List<NoteVo> noteRead(@PathVariable int no){
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
