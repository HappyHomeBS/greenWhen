package com.green.when.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class InquiryVo {
    private int no; //글번호
    private int grpNo; //원글번호
    private int depth; //답글정렬용
    private String userId;
    private String title;
    private String content;
    private String time;
    private String status; //상태표시용("확인중"->"처리중"->답변완료 루프)
    private String userRole; // 유저권한(ROLE_ADMIN, ROLE_USER)

}
