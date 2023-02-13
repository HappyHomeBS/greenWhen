import React, { SetStateAction, useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from '../../store/authContext';
import * as InquiryService from "../../service/InquiryService";
import {InquiryInterface} from './InquiryInterface';
import queryString from "query-string";

const InquiryReply = (props: { updatingInfo: () => void}) => {
  
    const [validated, setValidated] = useState(false);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userId = authCtx.userObj.userid;
    const location = useLocation();
    const no:any  = queryString.parse(location.search).no;

//등록버튼 누르면 실행    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
    //html validity 체크
        if(!form.checkValidity()) {
            setValidated(false);
            return;
        }
        setValidated(true);
        const inquiry = {
            title: form.titleInput.value,
            content: form.contextText.value,
            userId: userId,
            grpNo: no
        }

        writeInquiryReply(inquiry, token);
        //전송 후 텍스트 비우기
        form.titleInput.value=''
        form.contextText.value=''
    };
    //답글 전송 후 새로고침
    const writeInquiryReply = async (inquiry: InquiryInterface, token: string) => {
        InquiryService.inquiryReply(inquiry, token).then(props.updatingInfo)
       
    }


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="titleInput"> 
                <Form.Label>제목</Form.Label>
                <Form.Control required as ="textarea" rows = {1} style={{resize:"none"}}/>
                <Form.Control.Feedback type="invalid"> 제목을 입력하세요 </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contextText">
                <Form.Label>내용</Form.Label>
                <Form.Control required as="textarea" rows={20} style={{resize:"none"}}/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{float:"right", marginTop:"1%", marginRight:"3%"}}>
                등록
            </Button>
            {/* <Button variant="primary" onClick={}>
                취소
            </Button> */}
        </Form>
    );
}

export default InquiryReply;