package com.green.when.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)

public class InquiryFilesVo {
    private int no; //번호
    private String originalFilename; //원본파일이름
    private String fileName; //파일이름
    private String filePath; //파일경로
    private int delete; //삭제여부(0,1)
    private String date; //날짜
    private long fileSize; //파일크기
    private int inquiryNo; //업로드 된 글번호
}
