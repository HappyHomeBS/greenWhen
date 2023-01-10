import React, { useContext, useEffect, useState } from "react"
import * as InquiryService from "../../service/InquiryService";
import { noteDelete } from "../../service/NoteService";
import AuthContext from '../../store/authContext';
import {inquiryList} from '../Inquiry/InquiryInterface';

export const Gettoken = () => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userId = authCtx.userObj.userid;
    const userRole = authCtx.userObj.role;
    const loginData = {"userId": userId
                      ,"userRole": userRole
                      ,"token" : token
                        }
    console.log(loginData)
    return loginData
};


const InquiryList: React.FC = () => {
    const [inquiryList, setInquiryList] = useState<Array<inquiryList>>([]);
    const loginData = Gettoken();
    const userData = {"userId": loginData.userId
                     ,"userRole": loginData.userRole
                 }
    const token = loginData.token;
    
    useEffect(() => {
        getInquiryList(userData, token);
        console.log("...")
        console.log(userData)
    }, []);
    
    const getInquiryList = (userData: any, token: string) => {
        console.log(userData);
        InquiryService.getInquiryList(userData, token).then((listData) => {
            console.log("listData")
            console.log(listData)
            setInquiryList(listData.data)
        })
            
    }
    return (
        <div>
            {inquiryList.map((inquiry: inquiryList)=>
            <tr key ={inquiry.no}>
                <td>{inquiry.title}</td>
                <td>{inquiry.userId}</td>
                <td>{inquiry.time}</td>
            </tr>
            )
            }
        </div>
    );
};

export default InquiryList;