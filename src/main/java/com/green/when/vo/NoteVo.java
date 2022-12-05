package com.green.when.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class NoteVo {

    private int no;                  //index
    private String send;             //발신자
    private String recept;           //수신자
    private String time;             //시간
    private String title;            //제목
    private String content;          //내용
    private int readCheck;           //수신확인


}
