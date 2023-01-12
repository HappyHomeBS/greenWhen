package com.green.when.controller;

import com.green.when.vo.MemberRequestVo;
import com.green.when.vo.TokenVo;
import com.green.when.service.AuthService;
import com.green.when.vo.MailVo;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    //회원가입
    @PostMapping("/signup")
    public void signup(@RequestBody MemberRequestVo requestDto) {
        authService.signup(requestDto);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<TokenVo> login(@RequestBody MemberRequestVo requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @GetMapping("/userCheck")
    public int userCheck(@RequestParam String userid) {        
        int useridCheck = authService.useridCheck(userid);
        return useridCheck;

    }

    // 이메일 중복체크
    @GetMapping("/emailCheck")
    public int emailCheck(@RequestParam String useremail) {
        System.out.println(useremail);
        int useremailCheck = authService.useremailCheck(useremail);
        System.out.println(useremailCheck);
        return useremailCheck;
    }

    // 닉네임 중복체크
    @GetMapping("/nicknameCheck")
    public int nicknameCheck(@RequestParam String usernickname) {
        System.out.println(usernickname);
        int usernicknameCheck = authService.usernicknameCheck(usernickname);
        System.out.println(usernicknameCheck);
        return usernicknameCheck;
    }
    @GetMapping("/findid")
    public String findId(@RequestParam String useremail){
        System.out.println("아이디찾기:"+useremail);
        String userid = authService.findId(useremail);
        return userid;
    }

    // 이메일로 임시비밀번호 보내기
    @PostMapping("/sendEmail")
    public void sendEmail(@RequestBody MemberVo memberVo){
        String userid = memberVo.getUserid();
        MailVo mailVo = authService.createMailAndChangePassword(userid);
        authService.mailSend(mailVo);
    }


}