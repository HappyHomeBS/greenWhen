/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {InquiryInterface} from '../Inquiry/InquiryInterface';
import * as InquiryPaging from'../Inquiry/InquiryPaging';

const InquiryList: React.FC = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inquiryList, setInquiryList] = useState<Array<InquiryInterface>>([]);
    const [totalList, setTotalList] = useState<Array<InquiryInterface>>([]);
    const [loaded, setLoaded] = useState(false);
    const [inquiriesPerPage, setInquiresPerPage] = useState(10);
    const [totalInquiry, setTotalInquiry] = useState(0);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const navigate = useNavigate();
    
    //최초 리스트 로딩
    useEffect(() => {
        getInquiryList();
    }, []);
    
    //현재페이지에 따라 바뀜    
    useEffect(() => {
        goPage();
    }, [currentPage])
    const getInquiryList = async () => {
    
        const listData =( (await InquiryService.getInquiryList(token)).data.inquiryList);  
        const newInquiryList = InquiryPaging.GetPostsLoaded(listData, currentPage);
        setInquiryList(newInquiryList);
        setTotalInquiry(listData.length)
        setTotalList(listData)
    }

    const goPage = () => {
        const newInquiryList = InquiryPaging.GetPostsLoaded(totalList, currentPage);
        setInquiryList(newInquiryList);
    }

    const InquiryRead = (no:number | undefined) => {
        navigate('/inquiryRead?no='+no);
    };

    const InquiryWrite = () => {
        navigate('/inquiryWrite')
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
                        Array.isArray(inquiryList) && inquiryList.map((inquiry: InquiryInterface) =>
                        <tr key = {inquiry.no}>
                            <td> <a onClick = {()=> InquiryRead(inquiry.no)}> {inquiry.title}</a></td>
                            <td>{inquiry.userId}</td>
                            <td>{inquiry.time}</td>
                        </tr>
                        )}
                         </tbody>
                    </table>
                    <Button variant="primary" onClick={() => InquiryWrite()}> 등 록 </Button>

                </div>
            </div>
            <div>
            <InquiryPaging.PageNumbers currentPage={currentPage} totalInquiry={totalInquiry} setCurrentPage={setCurrentPage} />
            </div>
        </>
    );
};

export default InquiryList;