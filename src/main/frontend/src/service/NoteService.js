import axios from 'axios';

    const header = (token) => {
        return {headers: {
            'Authorization': 'Bearer ' + token
        }}
    }

    export const GetNoteList = (num, token)=>{
    //axios 데이터 res에 담기
        console.log(header(token));
        const result = axios.get("/api/note?num="+num, header(token))
        return result;
    }

    export const noteWrite = (note, token)=>{
        console.log(header(token));
        let result = axios.post("/api/noteWrite/", note, header(token));
        return result;
    }

    export const noteRead = (no, token) =>{
        let res = axios.get("/api/noteRead/"+no, header(token) );
        console.log(res.data);
        return res;
    }

    export const noteDelete = (no, token)=>{
        let res = axios.delete("/api/noteDelete/"+no, header(token));
        return res;
    }
    export const noteSentList = (num, token) =>{
        let res = axios.get("/api/noteSentList?num="+num, header(token))
        console.log("응답")
        console.log(token)
        return res;
    }
