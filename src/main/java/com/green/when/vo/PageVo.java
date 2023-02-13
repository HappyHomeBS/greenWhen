package com.green.when.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PageVo {
    private int num; // 현재 보고있는 페이지
    private int count; //글 총 갯수
    private int postNum = 10; // 한 페이지에 표시할 글 갯수

    private int pageNum; // 표시될 페이지 번호 (ex: 1~10)
    private int displayPost; //출력할 글
    private int pageNumCnt = 10; //페이지 카운트
    private int endPageNum; //마지막 페이지 번호
    private int startPageNum; //시작 페이지 번호

    private int lastPage; //마지막페이지일 경우
    private boolean prev; //이전 버튼 여부
    private boolean next; //다음 버튼 여부

    //검색옵션
    private String option; //검색옵션
    private String search; //검색어
    private String userId; //검색할 작성자 ID

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public void setCount(int count) {
        this.count = count;
        pagingCalc();
    }


    private void pagingCalc(){

        //마지막 페이지 번호
        endPageNum = (int)( (Math.ceil((double)num / (double)pageNumCnt)) * pageNumCnt);
        //시작 페이지 번호
        startPageNum = endPageNum - (pageNumCnt - 1);

        //마지막번호 재계산
        int endpagenum_tmp = (int)( Math.ceil((double)count / (double)postNum));

        if(endPageNum > endpagenum_tmp) {
            endPageNum = endpagenum_tmp;
        }

        prev = startPageNum == 1 ? false : true;
        // 이전페이지 활성화 여부를 정하는데
        //startpagenum이 1이면 false 아니라면 true
        next = endPageNum * postNum >= count ? false : true;
        displayPost = (num - 1) * postNum;

        lastPage = (int)( Math.ceil((double)count / (double)postNum));
    }
}
