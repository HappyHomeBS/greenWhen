import axios from "axios";
import { InquiryInterface } from "../components/Inquiry/InquiryInterface";

const header = (token: string) => {
    return {headers: {
        'Authorization': 'Bearer ' + token
    }}
}

export const getInquiryList = async (token:string)=> {
    const res = await axios.get("/api/inquiryList", header(token))
    return res
}

export const getInquiryRead = async(no:string, token:string) => {
    const res = await axios.get("/api/inquiryRead?no="+no, header(token))
    return res;
}

export const inquiryWrite = async(inquiry: InquiryInterface, token:string ) => {
    const res = await axios.post("/api/inquiryWrite", inquiry, header(token))
    console.log(inquiry)
    return res;
}