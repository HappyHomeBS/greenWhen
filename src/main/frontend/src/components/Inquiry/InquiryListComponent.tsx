/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {InquiryInterface} from '../Inquiry/InquiryInterface';
import * as InquiryPaging from'../Inquiry/InquiryPaging';
import { InquirySearch } from "./InquirySearchComponent";

const InquiryList: React.FC = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inquiryList, setInquiryList] = useState<Array<InquiryInterface>>([]); //현재페이지글
    const [totalList, setTotalList] = useState<Array<InquiryInterface>>([]); //전체글
    const [originalList, setOriginalList] = useState<Array<InquiryInterface>>([]);
    // const [loaded, setLoaded] = useState(false);
    // const [inquiriesPerPage, setInquiresPerPage] = useState(10);
    const [inquiryCounts, setInquiryCounts] = useState(0); //전체글 숫자
    const [search, setSearch] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const navigate = useNavigate();
    // const moveList = props.setWhich(2)

    //최초 리스트 로딩
    useEffect(() => {
        getInquiryList();
    }, []);

    //현재페이지에 따라 바뀜
    useEffect(() => {
       
        goPage();

    }, [currentPage])

    useEffect(()=>{
        statusChanged();
    },[status])

    const getInquiryList = async () => {

        const listData =( (await InquiryService.getInquiryList(token)).data.inquiryList);
        const newInquiryList = InquiryPaging.GetPostsLoaded(listData, currentPage); // 슬라이스후 현재페이지 글목록

        setInquiryList(newInquiryList);

        setTotalList(listData);
        setOriginalList(listData);
         // 모든 게시글 리스트 저장
        // setInquiryCounts(totalList.length) // 불러온 모든 게시글 수
    }

    const goPage = () => {
        console.log("oneffect", status)
        console.log("oneffect", currentPage)
        console.log("totalList", totalList)
        const newInquiryList = InquiryPaging.GetPostsLoaded(totalList, currentPage);
        setInquiryList(newInquiryList);
    }

    const InquiryRead = (no:number | undefined) => {
        navigate('/inquiryRead?no='+no);
    };

    const InquiryWrite = () => {
        navigate('/inquiryWrite');
    }

    const statusHandler = (e:any) => {
        e.preventDefault();
        setStatus(e.target.value);
        console.log(e.target.value);
        
    }

    const statusChanged = async () => {
     
        if(status==='전체'){
            getInquiryList();
        }else{
        const filterdData=originalList.filter((inquiry:any) => inquiry.status===status)
        console.log("필터링데이터", filterdData)
        
        setTotalList(filterdData);
        const newInquiryList = InquiryPaging.GetPostsLoaded(totalList, currentPage);
        setInquiryList(newInquiryList);
        setCurrentPage(1);
    }
    }
    const onChangeSearch = (e:any) =>{
        e.preventDefault();
        setSearch(e.target.value);
        console.log(search)
    }

    const onSearch = (e:any) => {
        e.preventDefault();
        if (search===null || search===''){
             getInquiryList();
        }
        const filteredData = totalList.filter((inquiry) =>inquiry.title.includes(search));
        console.log('totallist', totalList)
        console.log(search)
        setTotalList(filteredData);
        setCurrentPage(1);
        console.log('newtotallist', filteredData)
        setSearch('');
    }




    return (

        <>
        <div className="select_status">

            <select defaultValue='전체' name='selectStatus' onChange={statusHandler}>
             <option value='전체'>전  체</option>
             <option value='확인중'>확인중</option>
             <option value='처리중'>처리중</option>
             <option value='답변완료'>답변완료</option>
            </select>

        </div>
            <div className="inquiry_list" style={{margin:"5%"}}>
                <h2 className="text-center"style={{margin:"1%"}}> 1:1 문의 </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th style={{width: "60%", textAlign:"center"}}>제    목</th>
                                <th style={{width: "15%", textAlign:"center"}}>작 성 자</th>
                                <th style={{width: "15%", textAlign:"center"}}>날    짜</th>
                                <th style={{width: "10%", textAlign:"center"}}>진행상황</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        Array.isArray(inquiryList) && inquiryList.map((inquiry: InquiryInterface) =>
                        <tr key = {inquiry.no}>
                            <td style={{paddingLeft:"2%"}}> <a onClick = {()=> InquiryRead(inquiry.no)}> {inquiry.title}</a></td>
                            <td style={{textAlign:"center"}}>{inquiry.userId}</td>
                            <td style={{textAlign:"center"}}>{inquiry.time}</td>
                            <td style={{textAlign:"center"}}>{inquiry.status}</td>
                        </tr>
                        )}
                         </tbody>
                    </table>
                    <div style={{}}>
                         <button style={{float: "right", width:"5%"}}className="btn btn-primary" onClick={() => InquiryWrite()}> 등 록 </button>
                    </div>
                </div>
            </div>
            <div style={{textAlign:"center"}}>
              <InquiryPaging.PageNumbers currentPage={currentPage} status={status} totalList={totalList} setCurrentPage={setCurrentPage} />
            </div>
            <div>
                <form onSubmit={e => onSearch(e)}>
                <input type="text" value={search} placeholder="검색어를 입력하세요." onChange={onChangeSearch}/>
                <button type='submit'> 검색 </button>
                </form>
            </div>
        </>
    );
};

export default InquiryList;