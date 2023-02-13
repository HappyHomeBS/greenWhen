import React, { useContext, useEffect, useState } from "react"
import AuthContext from '../../store/authContext';
import {InquiryInterface} from './InquiryInterface';
import * as InquiryService from "../../service/InquiryService";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import InquiryReply from "./InquiryReplyComponent"
import { Right } from "react-bootstrap/lib/Media";

const InquiryRead: React.FC = (props: any) => {
    const [inquiryRead, setInquiryRead] = useState<Array<InquiryInterface>>([]);
    const [inquiryFiles, setInquiryFiles] = useState<any>([])
    const [inputReply, setInputReply] = useState(false);
    const [isUpdating, setIsUpdating] = useState<number | null>(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    // url 파라미터 가져오기
    const location = useLocation();
    const no:any  = queryString.parse(location.search).no;
    const grpNo:any = queryString.parse(location.search).no;
    const userId = authCtx.userObj.userid;
    const userRole = authCtx.userObj.role;
    const navigate = useNavigate();
    
    useEffect(() => {

        getInquiryRead(no, token)
        
    },[]);

    const getInquiryRead = async (no: string, token: string) => {
       
        const readData = InquiryService.getInquiryRead(no, token);
    //글 세팅
        const newInquiryRead = (await readData).data.inquiryRead;
        setInquiryRead(newInquiryRead);
    //첨부파일 세팅
        const inquiryFiles = (await readData).data.inquiryFiles;
        setInquiryFiles(inquiryFiles);
    }
    
    const reply = () => {
        setInputReply(!inputReply);
    }


    const deleteInquiry = (no :any) => {
        InquiryService.inquiryDelete(no, token).then((res) => {
            if(res.status === 200) {
                alert("삭제하였습니다")
                getInquiryRead(grpNo, token)
            } else {
                alert("실패!");
            }
        });
    }

    //답글달고 목록 다시 불러오기
    const updatingInfo = () => {
        getInquiryRead(grpNo, token)
        setInputReply(false)
    }

    //수정버튼 눌렀을 때 state 변경
    const handleUpdateClick = (no:any) => {
        setIsUpdating(no)
    }

    //수정메소드
    const inquiryUpdate = async (event:any) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const no:any = isUpdating
        const inquiry = {
            no: no
            ,title: form.title.value
            ,content: form.content.value
        }
        InquiryService.inquiryUpdate(inquiry, token).then((res) => {
            if(res.status === 200) {
                setIsUpdating(null)
                getInquiryRead(grpNo, token)
            } else {
                alert("실패!")
            }
        })
        
    }

    return (
   
        <>
            {/* 업데이트 폼 */}
            <div className = "card col-md-6 offset-md-3" style = {{marginTop:"2%"}}>
                <h3 className = "text-center" style = {{marginTop:"2%"}}> 1:1 문의 상세보기 </h3>
            { Array.isArray(inquiryRead) && inquiryRead.map((inquiry: InquiryInterface) =>
            <div className = "card-body" key = {inquiry.no}>
                {isUpdating === inquiry.no? (
        
                // 수정state인 경우 글 수정 폼으로 출력
                    <form onSubmit = {inquiryUpdate}>
                        <div className = "row">
                            <label>작성자:{inquiry.userId}</label>
                            <label>작성시간:{inquiry.time}</label>
                            <label>제 목</label>
                            <input type = "text" id = "title" defaultValue = {inquiry.title} style = {{width: "auto", flex:"1", margin: "2%", resize:"none"}}/>
                            <div className = "row" style = {{height:"50%", flexGrow:"1"}}>
                                <label>내용</label>
                                <textarea id = "content" defaultValue = {inquiry.content} style = {{height:"20%", width: "auto", flex: "1", margin: "2%", resize: "none"}}/>
                            </div>
                        </div>
                        <div style = {{float:"right"}}>
                        <button className = "btn btn-primary" type = "submit" > 수정하기 </button>
                        <button className = "btn btn-primary" onClick = {() => setIsUpdating(null)}>취  소</button>
                        </div>
                    </form>
                ):

                (  
                    // 게시글 읽기
                    <>
                    <div className="row">
                        <label>작성자 : {inquiry.userId}</label>
                        <label>작성시간 : {inquiry.time}</label>
                        <label>제목 : {inquiry.title} </label>
                        <br></br>
                    </div>
                    <div className = "row">
                        <label>내 용</label>
                        <textarea value = {inquiry.content} readOnly style = {{flex: "1", margin: "2%", resize: "none"}}/>
                    </div>
                    <div>
                        <label>첨 부 </label>
                        {inquiryFiles.map((file:any, index:number) => (
                            <img key = {index} src = {file.filePath} alt = {file.name} style = {{height:"300px", width:"300px", flexWrap:"wrap"}}/>
                        ))
                        }
                    </div>
                    {/* 버튼은 당사자일 경우 수정과 삭제, 관리자일 경우 삭제 활성화 */}
                    <div className= "buttons" style={{float:"right"}}>
                        {inquiry.userId === userId && <button className = "btn btn-primary"onClick={() => handleUpdateClick(inquiry.no)}> 수정하기</button>}               
                        {inquiry.userId === userId? <button className = "btn btn-primary"onClick={() => deleteInquiry(inquiry.no)}> 삭제하기</button> :
                        userRole ==='ROLE_ADMIN' && <button className = "btn btn-primary"onClick={() => deleteInquiry(inquiry.no)}> 삭제하기</button>} 
                    </div>
                
                    </>
                )
            }
                </div>
            )}  
            
                <div>
                    {inputReply===true}
                    <button className = "btn btn-primary" onClick = {() => reply()} style = {{float:"right", marginRight:"2%"}}>
                        {/* inputreply가 참인경우 답글닫기, 거짓인경우 답글달기 */}
                        {inputReply? "답글닫기" : "답글달기"} </button>
                    {inputReply && <InquiryReply updatingInfo = {updatingInfo} />}
                </div>
            </div>
        </>

    );

};
export default InquiryRead;