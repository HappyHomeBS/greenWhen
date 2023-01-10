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

    @PostMapping("/saveSchedule")
    public void saveSchedules(@RequestBody List<ScheduleVo> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();

        for (ScheduleVo schedule : schedules) {
            schedule.setUserid(userid);
            calendarService.insertSchedule(schedule);
        }
    }

    @GetMapping("/getSchedule")
    public List<ScheduleVo> getSchedules() {
        String userid = SecurityUtil.getCurrentMemberId();
        List<ScheduleVo> savedSchedules = new ArrayList<>();

        List<ScheduleVo> getSchedules = calendarService.getSchedule(userid);
        for (ScheduleVo vo : getSchedules) {
            savedSchedules.add(vo);
        }

        System.out.println(savedSchedules);

        return savedSchedules;
    }

    @PostMapping("/deleteSchedules")
    public void deleteSchedules(@RequestBody List<ScheduleVo> schedules) {
        String userid = SecurityUtil.getCurrentMemberId();
        System.out.println(schedules);
        for (ScheduleVo schedule : schedules) {
            schedule.setUserid(userid);
            calendarService.deleteSchedule(schedule);
        }
    }



}
