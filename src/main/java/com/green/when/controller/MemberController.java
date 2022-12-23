package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.dto.ChangePasswordRequestDto;
import com.green.when.dto.MemberRequestDto;
import com.green.when.dto.MemberResponseDto;
import com.green.when.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        System.out.println(myInfoBySecurity.getUsernickname());
        return ResponseEntity.ok((myInfoBySecurity));
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/nickname")
    public void setMemberNickname(@RequestBody MemberRequestDto request) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userid = authentication.getName();
        String userid = SecurityUtil.getCurrentMemberId();
        System.out.println(userid);
        System.out.println(request.toString());
        memberService.changeMemberNickname(userid, request.getUsernickname());
    }

    @PostMapping("/password")
    public void setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        memberService.changeMemberPassword(request.getExPassword(), request.getNewPassword());
    }



}