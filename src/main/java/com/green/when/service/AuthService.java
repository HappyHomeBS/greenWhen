package com.green.when.service;

import com.green.when.dto.MemberRequestDto;
import com.green.when.dto.TokenDto;
import com.green.when.vo.MemberVo;
import com.green.when.jwt.TokenProvider;
import com.green.when.mapper.UserMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserMapper userMapper;
    private final AuthenticationManagerBuilder managerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

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

}