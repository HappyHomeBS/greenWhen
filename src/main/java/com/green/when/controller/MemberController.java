package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.vo.ChangePasswordRequestVo;
import com.green.when.vo.FileVo;
import com.green.when.vo.MemberRequestVo;
import com.green.when.vo.MemberResponseVo;
import com.green.when.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

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
    public void profileImg(@RequestBody MultipartFile file) {
        FileVo fileVo = new FileVo();
        String userid = SecurityUtil.getCurrentMemberId();
        String projectPath = /*System.getProperty("user.dir") +*/  "C:\\Users\\GGG\\Desktop\\aaa\\green-spring2\\src\\main\\webapp\\WEB-INF\\resources\\files\\";
        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName);
        //file.transferTo(saveFile);
        fileVo.setFilename(fileName);
        fileVo.setFilepath("/files/" + fileName);
        fileVo.setUserid(userid);
       // memberService.writeFile(fileVo);
    }



}