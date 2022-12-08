package com.green.when.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class PageVo {
    private int num;
    private int count;
    private int postNum = 10;
    private int pageNum;
    private int displayPost;
    private int pageNumCnt = 10;
    private int endPageNum;
    private int startPageNum;
    private boolean prev;
    private boolean next;

}
