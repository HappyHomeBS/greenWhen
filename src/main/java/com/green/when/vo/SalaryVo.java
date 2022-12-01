package com.green.when.vo;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder @Data @Getter @Setter
public class SalaryVo {
    private String userid;
    private String usernickname;
    private String userpw;
    private String useremail;
    private String profiledata;
    private int role;
    private String time;
}
