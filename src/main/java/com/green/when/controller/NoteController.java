package com.green.when.controller;

import com.green.when.service.NoteService;
import com.green.when.vo.NoteVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class NoteController {
    @Autowired
    NoteService noteService;
    @GetMapping("/noteList")
    public List<NoteVo> noteList() {
        List<NoteVo> noteList = noteService.getNoteList();
        System.out.println(noteList);
        return noteList;
    }
}
