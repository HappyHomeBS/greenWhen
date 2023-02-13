/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {InquiryInterface} from '../Inquiry/InquiryInterface';
import * as InquiryPaging from'../Inquiry/InquiryPaging';


const InquiryList: React.FC = () => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userId = authCtx.userObj.userid;
    const userRole = authCtx.userObj.role;
    const [currentPage, setCurrentPage] = useState(1);
    const [inquiryList, setInquiryList] = useState<Array<InquiryInterface>>([]); //현재페이지글
    const [totalList, setTotalList] = useState<Array<InquiryInterface>>([]); //전체글

    const [search, setSearch] = useState<string>("") //검색어 설정
    const [status, setStatus] = useState<string>("전체") //상태별 필터링
    const navigate = useNavigate();

    //최초 리스트 로딩
    useEffect(() => {
        getInquiryList();
    }, []);
    
    //현재페이지에 따라 바뀜    
    useEffect(() => {
    
        goPage();
    
    }, [currentPage, totalList])

    useEffect(() => {
        statusHandler();
    }, [status])
        
    const getInquiryList = async () => {
    
        const listData = ((await InquiryService.getInquiryList(token)).data.inquiryList);  
        const newInquiryList = InquiryPaging.GetPostsLoaded(listData, currentPage); // 슬라이스후 현재페이지 글 목록 얻기
        setTotalList(listData) // 모든 게시글 리스트 저장
        setInquiryList(newInquiryList); //현재페이지 글 목록 세팅
    }

    const goPage = () => {
        const newInquiryList = InquiryPaging.GetPostsLoaded(totalList, currentPage);
        setInquiryList(newInquiryList);
    }

    const InquiryRead = (no:number | undefined) => {
        navigate('/inquiryRead?no='+no);
    };

    const InquiryWrite = () => {
        navigate('/inquiryWrite');
    }
    const onChangeSearch = (e:any) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    
    const onSearch = async (e:any) => {
        e.preventDefault();
        
        if (search === null || search === '') { 
            getInquiryList();
        } else {
            const listData = ((await InquiryService.getInquiryList(token)).data.inquiryList); //검색할 때 리스트 새로 가져옴(연속검색)
            const filteredData = listData.filter((inquiry:InquiryInterface) => inquiry.title.includes(search));
            setTotalList(filteredData);
            setCurrentPage(1);
            setSearch('');
        }
    }

    const statusChangeHandler = (e:any) => {
        e.preventDefault();
        setStatus(e.target.value); //검색어 state 등록
      
    }

    const statusHandler = async () => {
        if(status === '전체'){
        getInquiryList();
        }else{
        const listData = ((await InquiryService.getInquiryList(token)).data.inquiryList) //검색과 같은 이유 
        const filterdData = listData.filter((inquiry:InquiryInterface) => inquiry.status === status)
        setTotalList(filterdData);
        setCurrentPage(1);
        }
    }


    return (
        // 어드민일경우에만 상태정렬 선택가능
        <>  {userRole ==='ROLE_ADMIN' &&
        <div className = "select_status">
            <select defaultValue='전체' name='selectStatus' onChange = {statusChangeHandler} style = {{float:"right", marginRight:"5%"}}>
             <option value='전체'>전  체</option>
             <option value='확인중'>확인중</option>
             <option value='처리중'>처리중</option>
             <option value='답변완료'>답변완료</option>
            </select>
        </div>
            }
            <div className="inquiry_list" style = {{margin:"5%"}}>
                <h2 className="text-center"style = {{margin:"1%"}}> 1:1 문의 </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th style = {{width: "60%", textAlign:"center"}}>제    목</th>
                                <th style = {{width: "15%", textAlign:"center"}}>작 성 자</th>
                                <th style = {{width: "15%", textAlign:"center"}}>날    짜</th>
                                <th style = {{width: "10%", textAlign:"center"}}>진행상황</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                        inquiryList.map((inquiry: InquiryInterface) =>
                        <tr key = {inquiry.no}>
                            <td style = {{paddingLeft:"2%"}}> <a onClick = {()=> InquiryRead(inquiry.no)}> {inquiry.title}</a></td>
                            <td style = {{textAlign:"center"}}>{inquiry.userId}</td>
                            <td style = {{textAlign:"center"}}>{inquiry.time}</td>
                            <td style = {{textAlign:"center"}}>{inquiry.status}</td>
                        </tr>
                        )}
                         </tbody>
                    </table>
                    <div>
                         <button style = {{float: "right", width:"5%"}} className = "btn btn-primary" onClick = {() => InquiryWrite()}> 등 록 </button>
                    </div>
                </div>
            </div>
            {/* 페이징 */}
            <div style = {{textAlign:"center"}}>
              <InquiryPaging.PageNumbers currentPage = {currentPage} totalList = {totalList} setCurrentPage = {setCurrentPage} />
            </div>
            {/* 검색 */}
            <div style = {{marginTop:"3%", textAlign:"center"}}>
                <form onSubmit = {e => onSearch(e)}>
                    <input type = "text" value = {search} placeholder = "검색어를 입력하세요." onChange = {onChangeSearch}/>
                    <button type = 'submit'> 검색 </button>
                </form>
            </div>
        </>
    );
};

export default InquiryList;