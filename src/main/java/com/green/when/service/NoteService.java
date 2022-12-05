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

    public List<NoteVo> getNoteList() {
        return mapper.getNoteList();
    }
}
