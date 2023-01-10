import axios from "axios";

const header = (token: string) => {
    return {headers: {
        'Authorization': 'Bearer ' + token
    }}
}

export const getInquiryList = (userData:any, token:string)=> {
    const listData = axios.post("/api/inquiryList",userData ,header(token))
    return listData
}

