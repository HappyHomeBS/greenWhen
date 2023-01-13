import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {InquiryListInterface} from '../Inquiry/InquiryInterface';

const InquiryList: React.FC = (props: any) => {
    const [inquiryList, setInquiryList] = useState<Array<InquiryListInterface>>([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
   
    useEffect(() => {
        getInquiryList();
        console.log('inquiryList:', inquiryList)
    }, []);
        
    const getInquiryList = async () => {
    
        const listData = InquiryService.getInquiryList(token);  
       
        const newInquiryList = (await listData).data.inquiryList
        setInquiryList(newInquiryList)
        console.log('listData', (await listData).data)
        console.log('inquiryList', inquiryList)

    }

    

    return (
        
        <>  
            <div className="inquiry_list">
                <h2 className="text-center"> 1:1 문의 </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>제    목</th>
                                <th>작 성 자</th>
                                <th>날    짜</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                        Array.isArray(inquiryList) && inquiryList.map((inquiry: InquiryListInterface) =>
                        <tr key = {inquiry.no}>
                            <td>{inquiry.title}</td>
                            <td>{inquiry.userId}</td>
                            <td>{inquiry.time}</td>
                        </tr>
                        )}
                         </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default InquiryList;