/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useContext, useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {InquiryInterface} from '../Inquiry/InquiryInterface';



const InquiryWrite: React.FC = (props: any) => {
// html5 validation 시행
    const [validated, setVaildated] = useState(false);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userId = authCtx.userObj.userid;
    const navigate = useNavigate();

// 이미지 업로드용 
    const [image, setImage] = useState<File[]>([]);
    const fileInput = React.useRef<HTMLInputElement | null>(null);

//작성된 글 전송 
    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            setVaildated(false);
            return;
        }
        setVaildated(true);
        console.log('실행test')
        console.log(form.titleInput.value);
        const inquiry = {
            title: form.titleInput.value,
            content: form.contextText.value,
            userId: userId,
            image: image
        }
        
        writeInquiry(inquiry, token);
    };
// 쓰기함수(작성 후 리스트로 돌아가기)
    const writeInquiry = async (inquiry: InquiryInterface, token: string) => {
        InquiryService.inquiryWrite(inquiry, token).then((res)=>{
            navigate(-1)
         })
    }
        
    // input은 css 적용 불가능하니까  useRef 활용해서 input에 접근
      
    const HandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      
        if (fileInput.current) {
            fileInput.current.click();
        }
        console.log(fileInput)
    };

    // 첨부버튼
    const handleImageChange = (event: any) =>  { 
        setImage(Array.from(event.target.files));
    }
   

    return (
        <div style={{margin: '5%'}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="titleInput"> 
                 <Form.Label>제 목</Form.Label>
                 <Form.Control required as ="textarea" rows = {1} style={{resize:"none", marginTop:"1%", marginBottom:"1%"}}/>
                 <Form.Control.Feedback type="invalid"> 제목을 입력하세요 </Form.Control.Feedback>
            </Form.Group>
                {/*사진업로드버튼  */}
            <div>
                    <Button variant="primary" onClick={HandleClick}>
                        사진 첨부
                    </Button>
                <input
                    id="fileInput"
                    type="file"
                    multiple accept=".png, .jpg"
                    ref={fileInput}
                    style={{display:"none"}}
                    onChange={handleImageChange} />
              
            </div>

            <Form.Group controlId="contextText">
                {/*사진 미리보기 */}
                <div style={{marginBottom:"1%", display:"flex", flexWrap:"wrap"}}>
                    {image.map((image) => (
                        <img
                        key={image.name}
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        style={{height: 100, marginRight: 10}}
                        />
                    ))}
                </div>
                <Form.Label>내 용</Form.Label>
                <Form.Control required as="textarea" rows={20} style={{marginTop:"1%", marginBottom:"1%", resize:"none"}}/>
            </Form.Group>
            <Button variant="primary" onClick={ () => navigate(-1)} style={{float:"right", marginRight:"1px"}}> 취소 </Button>
            <Button variant="primary" type="submit" style={{float:"right", marginRight:"1px"}}>
                등록
            </Button>
        </Form>
        </div>
    );
}

export default InquiryWrite;