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
    private int no;
    private String originalFilename;
    private String fileName;
    private String filePath;
    private int delete;
    private String date;
    private long fileSize;
    private int inquiryNo;
}
