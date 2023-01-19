import React, { useState } from "react";
import { InquiryInterface } from "./InquiryInterface";

// postNum: 한 페이지의 글 갯수
// pageNumCnt: 표시되는 페이징 번호 갯수
interface pagenationData{
    lastInquiryNumber: number;
    firstInquiryNumber: number;
}

function getPagenationData(currentPage:number){
    const inquiriesPerPage=10
    console.log('currentPage', currentPage)
    const lastInquiryNumber= currentPage * inquiriesPerPage;
    const firstInquiryNumber= (lastInquiryNumber - inquiriesPerPage)+1;
    
    const pagenationData: Array<pagenationData> ={
        lastInquiryNumber: lastInquiryNumber
        ,firstInquiryNumber: firstInquiryNumber
    }
    return pagenationData;
}



export function GetPostsLoaded(props: Array<InquiryInterface>, currentPage:number) {
    getPagenationData(currentPage)
    const loadedInquires = props.slice(getPagenationData.pagenationData.firstInquiryNumber, getPagenationData.lastInquiryNumber)

    return loadedInquires
}



export function PageNumbers (currentPage:any, totalInquiry:number){  
    const postNum = 10;
    const pageNumCnt = 10;
    const totalPages = totalInquiry /10 ; 
    let pageNumList:any=[];
   
    function viewPageNumbers(){
        
    
    }
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
