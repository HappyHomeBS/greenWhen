package com.green.when.service;

import com.green.when.mapper.CalendarMapper;
import com.green.when.mapper.UserMapper;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.vo.ScheduleVo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Getter
@Setter
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarService {
    private final CalendarMapper calendarMapper;
    @Transactional
    public void insertSchedule(ScheduleVo schedule) {
        calendarMapper.insertSchedule(schedule);

    }

    @Transactional
    public List<ScheduleVo> getSchedule(String userid) {
        List<ScheduleVo> scheduleList = calendarMapper.getSchedule(userid);
        return scheduleList;
    }

    @Transactional
    public void deleteSchedule(ScheduleVo schedule) {
        calendarMapper.deleteSchedule(schedule);
    }
}