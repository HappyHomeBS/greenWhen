import axios from "axios";

const header = (token: string) => {
    return {headers: {
        'Authorization': 'Bearer ' + token
    }}
}

export const getInquiryList = async (token:string)=> {
    const listData = await axios.get("/api/inquiryList", header(token))
    return listData
}

export const inquiryListDetail = async(token:string) => {
    const readData = await axios.get("")
}