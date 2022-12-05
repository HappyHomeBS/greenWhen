package com.green.when.mapper;

import com.green.when.vo.NoteVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper

public interface NoteMapper {
    List<NoteVo> getNoteList();

    //리스트 조회


    //쓰기
    //읽기
    //삭제
}
