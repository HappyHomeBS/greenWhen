package com.green.when.dto;

import com.green.when.vo.MemberVo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String userid;
    private String usernickname;
    private String useremail;

    public static MemberResponseDto of(MemberVo memberVo) {
        return MemberResponseDto.builder()
                .userid(memberVo.getUserid())
                .usernickname(memberVo.getUsernickname())
                .useremail(memberVo.getUseremail())
                .build();
    }
}