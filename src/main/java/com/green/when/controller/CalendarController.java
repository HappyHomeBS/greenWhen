package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.AdminService;
import com.green.when.service.CalendarService;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import com.green.when.vo.ScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    // 일정 등록
    @PostMapping("/saveSchedule")
    public void saveSchedules(@RequestBody List<ScheduleVo> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();

        for (ScheduleVo schedule : schedules) {
            schedule.setUserid(userid);
            calendarService.insertSchedule(schedule);
        }
    }

    // 해당하는 달력의 일정 불러오기
    @PostMapping("/getSchedules")
    public List<ScheduleVo> getSchedules(@RequestBody ScheduleVo scheduleVo) {
        String userid = SecurityUtil.getCurrentMemberId();
        scheduleVo.setUserid(userid);
        List<ScheduleVo> savedSchedules = new ArrayList<>();

        List<ScheduleVo> getSchedules = calendarService.getSchedules(scheduleVo);
        for (ScheduleVo vo : getSchedules) {
            savedSchedules.add(vo);
        }
        return savedSchedules;
    }

    // 전체 일정 불러오기(내 메모 보기에서 사용)
    @PostMapping("/getAllSchedules")
    public List<ScheduleVo> getAllSchedules(@RequestBody ScheduleVo scheduleVo) {
        String userid = SecurityUtil.getCurrentMemberId();
        scheduleVo.setUserid(userid);
        List<ScheduleVo> savedSchedules = new ArrayList<>();

        List<ScheduleVo> getSchedules = calendarService.getAllSchedules(scheduleVo);
        for (ScheduleVo vo : getSchedules) {
            savedSchedules.add(vo);
        }
        return savedSchedules;
    }

    // 일정 삭제
    @PostMapping("/deleteSchedules")
    public void deleteSchedules(@RequestBody List<ScheduleVo> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();
        for (ScheduleVo schedule : schedules) {
            schedule.setUserid(userid);
            calendarService.deleteSchedule(schedule);
        }
    }

    // 일정 수정
    @PostMapping("/updateSchedules")
    public void updateSchedules(@RequestBody List<Map> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();
        for (Map schedule : schedules) {
            schedule.put("userid", userid);
            calendarService.updateSchedules(schedule);
        }
    }



}
