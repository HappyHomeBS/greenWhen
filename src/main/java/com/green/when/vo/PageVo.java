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
    private int currentPageNum; //현재 페이지
    private int count; // 전체 글 수
    private int postNum = 15; //한 화면 글 수
    private int pageNum;
    private int displayPost;
    private int pageNumCnt = 10; //출력되는 페이지 번호 수
    private int endPageNum;
    private int startPageNum;
    private boolean prev;
    private boolean next;

}
