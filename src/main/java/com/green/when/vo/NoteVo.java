package com.green.when.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
// 데이터 없을 때 JSON 만들지 않는설정
@JsonInclude(JsonInclude.Include.NON_NULL)
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