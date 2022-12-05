package com.green.when.mapper;

import com.green.when.vo.NoteVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper

public interface NoteMapper {
    //리스트 조회
    List<NoteVo> getNoteList();
    //쓰기
    List<NoteVo> noteWrite();
    //읽기
    List<NoteVo> noteRead();
    //수신확인
    List<NoteVo> noteReadCheck();
    //삭제
    List<NoteVo> noteDelete();
}
