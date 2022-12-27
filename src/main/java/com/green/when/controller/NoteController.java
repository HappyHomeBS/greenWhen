package com.green.when.controller;
import com.green.when.service.NoteService;
import com.green.when.vo.NoteVo;
import com.green.when.vo.PageVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class NoteController {
    @Autowired
    NoteService noteService;
//  쪽지 리스트 출력
    @GetMapping("/note/{userId}")
    public ResponseEntity<Map> noteList(@PathVariable String userId,@RequestParam(value = "num", required=false) int num) {

        //페이징 계산
        PageVo page = new PageVo();
        page.setNum(num);
        page.setCount(noteService.noteCount(userId));

        System.out.println("userid:"+userId);
        System.out.println("testing!");
        //쪽지 목록 가져오기
        List<NoteVo>noteList = noteService.noteListPage(userId, page.getDisplayPost(), page.getPostNum());

        //map에 전달
        Map result = new HashMap<>();

        result.put("pagingData", page);
        result.put("noteList", noteList);

        System.out.println(result);

        return ResponseEntity.ok(result);
    }
// 쪽지 리스트 출력 ( 리스트 )
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
    public ResponseEntity<Map> noteSentList(@PathVariable String userId,@RequestParam(value = "num", required=false) int num) {
        //페이징 계산
        PageVo page = new PageVo();
        page.setNum(num);
        page.setCount(noteService.noteSentCount(userId));

        System.out.println("userid:"+userId);
        System.out.println("testing!");
        //쪽지 목록 가져오기
        List<NoteVo>noteList = noteService.noteSentList(userId, page.getDisplayPost(), page.getPostNum());

        //map에 전달
        Map result = new HashMap<>();

        result.put("pagingData", page);
        result.put("noteList", noteList);

        System.out.println(result);

        return ResponseEntity.ok(result);
    }

}
