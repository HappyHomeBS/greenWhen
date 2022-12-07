package com.green.when.vo;

import lombok.*;

@Builder @Data @Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class SalaryVo {
    private String userid;
    private String usernickname;
    private String userpw;
    private String useremail;
    private String profiledata;
    private int role;
    private String time;
}
