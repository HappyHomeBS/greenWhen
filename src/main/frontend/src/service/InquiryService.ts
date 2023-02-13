import axios from "axios";
import { InquiryInterface } from "../components/Inquiry/InquiryInterface";

const header = (token: string) => {
    return {headers: {
        'Authorization': 'Bearer ' + token
    }}
}

export const getInquiryList = async (token:string)=> {
    const res = await axios.get("/api/inquiryList", header(token))
    return res;
}

export const getInquiryRead = async(no:string, token:string) => {
    const res = await axios.get("/api/inquiryRead?no="+no, header(token))
    return res;
}

export const inquiryWrite = async(filesData:any, inquiry:InquiryInterface, token:string ) => {
    var res:any = '';
    if(filesData.length!==0){
        await axios.post("/api/inquiryWrite", inquiry, header(token))
    .then( (inquiryData) =>{
        const inquiryNo=inquiryData.data["inquiryNo"];
        filesData.append('inquiryNo', inquiryNo)
        res = axios.post("/api/inquiryFiles", filesData, {headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
        }})
    })
    }else{
         res = axios.post("/api/inquiryWrite", inquiry, header(token))
    }
    return res;
}

export const inquiryReply = async(inquiry: InquiryInterface, token:string) => {
    const res= await axios.post("/api/inquiryWrite", inquiry, header(token))
    return res;
}

export const inquiryDelete = async(no:any, token:string) => {
    const res= await axios.get("/api/inquiryDelete?no="+no, header(token))
    return res;
}

export const inquiryUpdate = async(inquiry:InquiryInterface, token:string) => {
    const res= await axios.post("api/inquiryUpdate", inquiry, header(token))
    return res;
}