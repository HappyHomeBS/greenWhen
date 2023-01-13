import axios from "axios";

const header = (token: string) => {
    return {headers: {
        'Authorization': 'Bearer ' + token
    }}
}

export const getInquiryList = async (userData:any, token:string)=> {
    const listData = await axios.post("/api/inquiryList",userData ,header(token))
    return listData
}

