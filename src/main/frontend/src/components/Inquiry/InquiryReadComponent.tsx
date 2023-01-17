import React, { useContext, useEffect, useState } from "react"
import AuthContext from '../../store/authContext';
import {InquiryInterface} from './InquiryInterface';
import * as InquiryService from "../../service/InquiryService";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import InquiryReply from "../Inquiry/InquiryReply"

 const InquiryRead: React.FC = (props: any) => {
    const [inquiryRead, setInquiryRead] = useState<Array<InquiryInterface>>([]);
    const [inputReply, setInputReply] = useState(false);
    const [updating, setUpdating] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    // url 파라미터 가져오기
    const location = useLocation();
    const no:any  = queryString.parse(location.search).no;
    const userId = authCtx.userObj.userid;
    const userRole = authCtx.userObj.role;

    useEffect(() => {

        getInquiryRead(no, token)
     
    }, []);

    const getInquiryRead = async (no: string, token: string) => {
        const readData = InquiryService.getInquiryRead(no, token);
        const newInquiryRead = (await readData).data.inquiryRead
        setInquiryRead(newInquiryRead)
        console.log('listData', (await readData).data)
        console.log('inquiryRead', inquiryRead)
    }
    
    const reply = () =>{
        setInputReply(!inputReply);
        console.log("버튼")
    }


    const deleteInquiry = (no :any, grpNo:any ) => {
        InquiryService.inquiryDelete(no, token);
        alert("삭제하였습니다")
        getInquiryRead(grpNo, token)
    }

    return (
   
        <>
        <div className = "card col-md-6 offset-md-3">
            <h3 className = "text-center"> 1:1 문의 상세보기 </h3>
        { Array.isArray(inquiryRead) && inquiryRead.map((inquiry: InquiryInterface) =>
           <div className = "card-body" key={inquiry.no}>
            <div className="row">
                <label>작성자 : {inquiry.userId}</label>
                <label>작성시간 : {inquiry.time}</label>
                <label>제목 : {inquiry.title} </label>
                <br></br>
            </div>
            <div className = "row">
                <label>내 용</label>
                <textarea value={inquiry.content} readOnly/>
                {inquiry.userId === userId && <button className = "btn btn-primary"onClick={()=> reply}> 수정하기</button>}               
                {inquiry.userId === userId? <button className = "btn btn-primary"onClick={()=> deleteInquiry(inquiry.no, inquiry.grpNo)}> 삭제하기</button> :
                 userRole ==='ROLE_ADMIN' && <button className = "btn btn-primary"onClick={()=> deleteInquiry(inquiry.no, inquiry.grpNo)}> 삭제하기</button>} 
            </div>
            <br></br>
           </div>
        )}  
            {!inputReply}
            <button className = "btn btn-primary" onClick={()=> reply()}> {inputReply? "답글닫기" : "답글달기"} </button>
            <hr/>
            {inputReply && <InquiryReply/>}
            {}

        </div>
        </>

    );

};
export default InquiryRead;