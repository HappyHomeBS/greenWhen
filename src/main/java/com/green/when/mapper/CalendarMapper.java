package com.green.when.mapper;


import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.vo.ScheduleVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//기존 DaoImpl 대신 mapper와 다이렉트 연결
@Repository
@Mapper
public interface CalendarMapper {
    // 일정 등록
    void insertSchedule(ScheduleVo schedule);

    // 해당하는 달력의 일정 불러오기
    List<ScheduleVo> getSchedules(ScheduleVo scheduleVo);

    // 전체 일정 불러오기(내 메모 보기에서 사용)
    List<ScheduleVo> getAllSchedules(ScheduleVo scheduleVo);

    // 일정 삭제
    void deleteSchedule(ScheduleVo schedule);

    // 일정 수정
    void updateSchedules(Map schedule);

}
