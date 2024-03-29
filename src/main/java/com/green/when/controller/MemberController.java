package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.MemberService;
import com.green.when.vo.ChangePasswordRequestVo;
import com.green.when.vo.MemberRequestVo;
import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
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

    // 내 정보 불러오기
    @GetMapping("/me")
    public ResponseEntity<MemberResponseVo> getMyMemberInfo() {
        MemberResponseVo myInfoBySecurity = memberService.getMyInfoBySecurity();
        return ResponseEntity.ok((myInfoBySecurity));
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    // 닉네임 변경
    @PostMapping("/nickname")
    public void setMemberNickname(@RequestBody MemberRequestVo request) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userid = authentication.getName();
        String userid = SecurityUtil.getCurrentMemberId();
        memberService.changeMemberNickname(userid, request.getUsernickname());
    }

    // 닉네임 중복 체크
    @PostMapping("/nicknameCheck")
    public int nicknameCheck(@RequestBody MemberVo memberVo) {
        int nicknameCheck = memberService.nicknameCheck(memberVo.getUsernickname());

        return nicknameCheck;
    }

    //비밀번호 변경
    @PostMapping("/password")
    public void setMemberPassword(@RequestBody ChangePasswordRequestVo request) {
        memberService.changeMemberPassword(request.getExPassword(), request.getNewPassword());
    }

    // 이전비밀번호 확인
    @PostMapping("/exPasswordCheck")
    public int passwordCheck(@RequestBody MemberVo memberVo) {
        int passwordCheck = memberService.passwordCheck(memberVo.getUserpw());
        return passwordCheck;
    }

    //프로필 이미지 등록
    @SneakyThrows
    @PostMapping("/profileImg")
    public void profileImg(@RequestParam MultipartFile file) {
        try {
            String userid = SecurityUtil.getCurrentMemberId();
            System.out.println(userid);
            MemberVo memberVo = new MemberVo();
            String projectPath = /*System.getProperty("user.dir") +*/  "D:\\ws\\boot\\greenWhen\\src\\main\\frontend\\public\\profileImg\\";
            UUID uuid = UUID.randomUUID();
            String fileName = uuid + "_";
            File saveFile = new File(projectPath + fileName);
            memberVo.setFilename(fileName);
            memberVo.setFilepath("/profileImg/" +fileName);
            memberVo.setUserid(userid);
            System.out.println(memberVo.toString());
            memberService.profileImgUpload(memberVo);
            file.transferTo(saveFile);
        } catch (Exception exception) {
            System.out.println("create_board/exception = " + exception);
        }
    }

    // 프로필 이미지 불러오기
    @GetMapping("/callProfile")
    public MemberVo callProfile() {
        String userid = SecurityUtil.getCurrentMemberId();
        MemberVo memberVo = memberService.callProfileImg(userid);
        System.out.println(memberVo.toString());
        return memberVo;
    }


}