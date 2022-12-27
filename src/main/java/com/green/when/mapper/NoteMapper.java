package com.green.when.mapper;

import com.green.when.vo.NoteVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
@Mapper

public interface NoteMapper {
    //리스트 조회
    List<NoteVo> getNoteList(String userId);
    //페이징 리스트 조회
    List<NoteVo> noteListPage(HashMap data);
    //쓰기
    void noteWrite(NoteVo noteVo);
    //읽기
    List<NoteVo> noteRead(int no);
    //수신확인
    void noteReadCheck(int no);
    //삭제
    void noteDelete(int no);
    //보낸쪽지함
    List<NoteVo> noteSentList(HashMap data);
    //페이징을 위한 카운트
    int noteCount(String userId);
    int noteSentCount(String userId);

}
