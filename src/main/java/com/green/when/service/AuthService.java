package com.green.when.service;

import com.green.when.dto.MemberRequestDto;
import com.green.when.dto.TokenDto;
import com.green.when.jwt.TokenProvider;
import com.green.when.mapper.UserMapper;
import com.green.when.vo.MailVo;
import com.green.when.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserMapper userMapper;
    private final AuthenticationManagerBuilder managerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    @Autowired
    private MailSender mailSender;

    public void signup(MemberRequestDto requestDto) {
        if (userMapper.userCheck(requestDto.getUserid())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        MemberVo memberVo = requestDto.toMember(passwordEncoder);
        System.out.println("정보:" + memberVo.toString());
        userMapper.signup(memberVo);
    }

    public TokenDto login(MemberRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        System.out.println("로그인" + authentication);
        return tokenProvider.generateTokenDto(authentication);
    }

    public int useridCheck(String userid) {
        return userMapper.useridCheck(userid);
    }

    public int useremailCheck(String useremail) {
        return userMapper.useremailCheck(useremail);
    }

    public int usernicknameCheck(String usernickname) {
        return userMapper.usernicknameCheck(usernickname);
    }

    public String findId(String useremail) {
        return userMapper.findId(useremail);
    }

    //랜덤함수로 임시비밀번호 구문 만들기

    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    // 메일 내용을 생성하고 임시 비밀번호로 회원 비밀번호를 변경
    public MailVo createMailAndChangePassword(String userid) {
        String useremail = userMapper.findUseremail(userid);
        String pw = getTempPassword();
        System.out.println(pw);
        System.out.println(useremail);
        MailVo mailVo = new MailVo();
        mailVo.setAddress(useremail);
        mailVo.setTitle("Cocolo 임시비밀번호 안내 이메일 입니다.");
        mailVo.setMessage("안녕하세요. Cocolo 임시비밀번호 안내 관련 이메일 입니다." + " 회원님의 임시 비밀번호는 "
                + pw + " 입니다." + "로그인 후에 비밀번호를 변경을 해주세요");
        String userpw = passwordEncoder.encode(pw);
        System.out.println(userpw);
        HashMap map = new HashMap<>();
        map.get(userpw);
        map.get(useremail);
        userMapper.updatePassword(map);
        return mailVo;
    }

    // 메일보내기
    public void mailSend(MailVo mailVo) {
        System.out.println("전송 완료!");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailVo.getAddress());
        message.setSubject(mailVo.getTitle());
        message.setText(mailVo.getMessage());
        message.setFrom("보낸이@naver.com");
        message.setReplyTo("보낸이@naver.com");
        System.out.println("message"+message);
        mailSender.send(message);
    }

}