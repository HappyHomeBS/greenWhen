import axios, { Axios } from "axios";
import React, { useContext, useEffect, useState } from "react"
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {inquiryList} from '../Inquiry/InquiryInterface';

const InquiryList: React.FC = (props: any) => {
    const [inquiryList, setInquiryList] = useState([]);
    const authCtx = useContext(AuthContext);
    
    useEffect(() => {
        getInquiryList();
    }, []);
        
    const getInquiryList = async () => {
        const token = authCtx.token;
        const header = (token: string) => {
        return {headers: {
            'Authorization': 'Bearer ' + token
        }}
        }
        const listData =  await axios.get("/api/inquiryList", header(token))
        console.log(listData)
        setInquiryList(listData.data)
        console.log(inquiryList)
    //     .then((listData) => {
    //         setInquiryList(listData.data)
    //         console.log(inquiryList)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }
    }
    return (
        <>  
            <div>
                needrendering
            </div>
            {
            inquiryList.map((inquiry: inquiryList) =>
            <tr key = {inquiry.no}>
                <td>{inquiry.title}</td>
                <td>{inquiry.userId}</td>
                <td>{inquiry.time}</td>
            </tr>
            )
            }
           
        </>
    );
};

export default InquiryList;