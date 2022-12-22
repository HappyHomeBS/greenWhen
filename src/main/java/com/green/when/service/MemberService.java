package com.green.when.service;

import com.green.when.config.SecurityUtil;
import com.green.when.dto.MemberResponseDto;
import com.green.when.vo.MemberVo;
import com.green.when.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public MemberResponseDto getMyInfoBySecurity() {
        return userMapper.findByUserid(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @Transactional
    public MemberResponseDto changeMemberNickname(String userid, String usernickname) {
        MemberVo memberVo = userMapper.findByUserid(userid).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        memberVo.setNickname(usernickname);
        return MemberResponseDto.of(userMapper.changeUserNickname(memberVo));
    }

    @Transactional
    public MemberResponseDto changeMemberPassword(String exPassword, String newPassword) {
        MemberVo memberVo = userMapper.findByUserid(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, memberVo.getUserpw())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        memberVo.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDto.of(userMapper.changeUserPw(memberVo));
    }


}