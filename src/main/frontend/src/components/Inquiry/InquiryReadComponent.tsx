import React, { useContext, useEffect, useState } from "react"
import AuthContext from '../../store/authContext';
import {InquiryInterface} from './InquiryInterface';
import * as InquiryService from "../../service/InquiryService";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

 const InquiryRead = () => {
    const [inquiryRead, setInquiryRead] = useState<Array<InquiryInterface>>([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    // url 파라미터 가져오기
    const location = useLocation();
    const no:any  = queryString.parse(location.search).no;


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

    return (
   
        <>
        <div className="inquiry_read">
        { Array.isArray(inquiryRead) && inquiryRead.map((inquiry: InquiryInterface) =>
        
            <tr key = {inquiry.no}>
                <td>{inquiry.title}</td>
                <td>{inquiry.userId}</td>
                <td>{inquiry.time}</td>
                <td>{inquiry.content}</td>
            </tr>

        )}  
        </div>
        </>

    );

};
export default InquiryRead;