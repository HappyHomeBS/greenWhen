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
//        System.out.println("writingVo"+ noteVo);
        noteService.noteWrite(noteVo);
    }

//쪽지 읽기
    @GetMapping("/noteRead/{no}")
    public List<NoteVo> noteRead(@PathVariable int no){
        List<NoteVo> noteRead = noteService.noteRead(no);
        System.out.println("read"+noteRead);
        noteService.noteReadCheck(no);
        return noteRead;
    }
//쪽지 삭제
    @DeleteMapping("/noteDelete/{no}")
    public void noteDelete(@PathVariable int no) {
        noteService.noteDelete(no);
    }

//보낸 쪽지함
    @GetMapping("/noteSentList/{userId}")
    public List<NoteVo> noteSentList(@PathVariable String userId) {
        List<NoteVo> noteList = noteService.noteSentList(userId);
        System.out.println("sentNote"+noteList);
        return noteList;
    }

}
