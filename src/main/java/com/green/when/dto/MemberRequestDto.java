package com.green.when.dto;

import com.green.when.vo.Authority;
import com.green.when.vo.MemberVo;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MemberRequestDto {
//    private String email;
//    private String password;
//    private String nickname;
//
//    public Member toMember(PasswordEncoder passwordEncoder) {
//        return Member.builder()
//                .email(email)
//                .password(passwordEncoder.encode(password))
//                .nickname(nickname)
//                .authority(Authority.ROLE_USER)
//                .build();
//    }
//
//    public UsernamePasswordAuthenticationToken toAuthentication() {
//        return new UsernamePasswordAuthenticationToken(email, password);
//    }
    private String userid;
    private String userpw;
    private String usernickname;
    private String useremail;

    public MemberVo toMember(PasswordEncoder passwordEncoder) {
        return MemberVo.builder()
                .userid(userid)
                .userpw(passwordEncoder.encode(userpw))
                .usernickname(usernickname)
                .useremail(useremail)
                .role(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(userid, userpw);
    }
}