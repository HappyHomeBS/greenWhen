// import React from "react";
// import { useState } from "react";
// import { InquiryInterface } from "./InquiryInterface";



// export function InquirySearch(props:any){

//     const [searchWord, setSearchWord] = useState<string>('');

//     const getWord = (event:any) => {
//         //소문자로 통일
//         setSearchWord(event.target.value.toLowerCase());
//         const searchResult = props.totalList.filter((inquiry:InquiryInterface) =>
//         inquiry.title.toLowerCase().includes(searchWord))
//         props.setTotalList(searchResult);
//     }


//     return(
//         <div>
//                     <form>

//                     <input type='text' className='serch_input' name='search' placeholder='검색어를 입력하세요'></input>
//                     <input type='submit' value='검색' className='search_submit'></input>
//                 </form>
//         </div>
//     )

// }