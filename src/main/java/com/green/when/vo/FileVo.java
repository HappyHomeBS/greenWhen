package com.green.when.vo;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class FileVo {
    private int _id;
    private String filename;
    private String filepath;
    private String userid;

}