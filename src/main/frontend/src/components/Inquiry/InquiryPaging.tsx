import React, { useState } from "react";
import { InquiryInterface } from "./InquiryInterface";

// postNum: 한 페이지의 글 갯수
// pageNumCnt: 표시되는 페이징 번호 갯수
export interface pagenationData{
    lastInquiryNumber: any;
    firstInquiryNumber: any;
}

//반환형을 인터페이ㅈ스 pagenationData로
function getPagenationData(currentPage:number): pagenationData {
    const inquiriesPerPage=10
    console.log('currentPage', currentPage)
    const lastInquiryNumber= currentPage * inquiriesPerPage;
    const firstInquiryNumber= (lastInquiryNumber - inquiriesPerPage)+1;
    console.log('lastInquiry', lastInquiryNumber)
    console.log('firstInquiry', firstInquiryNumber)
    
    return { lastInquiryNumber: lastInquiryNumber
        ,firstInquiryNumber: firstInquiryNumber}
   
}


export function GetPostsLoaded(props: Array<InquiryInterface>, currentPage:number) {
    let paginationData = getPagenationData(currentPage);
    const loadedInquires = props.slice(paginationData.firstInquiryNumber, paginationData.lastInquiryNumber)

    return loadedInquires
}


export function PageNumbers (currentPage:any, totalInquiry:any){  
  
    const postNum = 10;
    const pageNumCnt = 10;
    const totalPages = totalInquiry.lgength /10 ; 
    let paginationData = getPagenationData(currentPage)
    let pageNumList:any=[];
    console.log('totalPages', totalPages)
    console.log('tot')
    for ( let i = paginationData.firstInquiryNumber; i <= paginationData.lastInquiryNumber; i++) { 
        pageNumList.push(i)
    }

    return ( pageNumList.map((page:any) => 
        <li className="page-link" onClick = { () => GetPostsLoaded(totalInquiry, page)}> {page}</li>
    ))

    
    
    if((currentPage+1) % postNum === 1) {
        let idx = 1; //페이지 리스트의 세트번호 (1~10, 11~20)
        pageNumList = [currentPage];
    //
         while((pageNumList.length < totalPages) && (currentPage + idx) < pageNumCnt);
         pageNumList.push(currentPage + idx)
            idx++; //<-??
    } else if (currentPage % postNum === postNum-1){
        let idx=1;
        pageNumList = [currentPage];
        while(pageNumList.length < totalPages) {
            pageNumList.unshift(currentPage-idx);
            idx++;
        }
    }

    console.log('pageNumList', pageNumList)
    return( 
        <div> {pageNumList} </div>
    )    //현재페이지가 10의 배수일 때 
  
}