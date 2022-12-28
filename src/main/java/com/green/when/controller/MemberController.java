package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.MemberService;
import com.green.when.vo.ChangePasswordRequestVo;
import com.green.when.vo.MemberRequestVo;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseVo> getMyMemberInfo() {
        MemberResponseVo myInfoBySecurity = memberService.getMyInfoBySecurity();
        return ResponseEntity.ok((myInfoBySecurity));
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/nickname")
    public void setMemberNickname(@RequestBody MemberRequestVo request) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userid = authentication.getName();
        String userid = SecurityUtil.getCurrentMemberId();
        memberService.changeMemberNickname(userid, request.getUsernickname());
    }

    @PostMapping("/password")
    public void setMemberPassword(@RequestBody ChangePasswordRequestVo request) {
        memberService.changeMemberPassword(request.getExPassword(), request.getNewPassword());
    }

    @PostMapping("/profileImg")
    public void profileImg(@RequestParam MultipartFile file) {
        try {
            String userid = SecurityUtil.getCurrentMemberId();
            MemberVo memberVo = new MemberVo();
            memberVo.setUserid(userid);
            memberVo.setProfileData(file.getBytes());
            memberService.profileImg(memberVo);
        } catch (Exception exception) {
            System.out.println("create_board/exception = " + exception);
        }
    }

    @GetMapping("/callProfile")
    public MemberVo callProfile() {
        String userid = SecurityUtil.getCurrentMemberId();
        MemberVo memberVo = memberService.callProfile(userid);
        System.out.println(memberVo.toString());
        return memberVo;
    }


}