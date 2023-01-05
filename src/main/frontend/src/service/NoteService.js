import axios from 'axios';

    const header = (token) => {
        return {headers: {
            'Authorization': 'Bearer ' + token
        }}
    }

    export const getNoteList = (num, option, search, token)=>{
    //axios 데이터 res에 담기
        const result = axios.get("/api/note?num="+num+'&option='+option+'&search='+search, header(token));
        return result;
    }
    export const noteSentList = (num, option, search, token) =>{
        let res = axios.get("/api/noteSentList?num="+num+'&option='+option+'&search='+search, header(token))
        return res;
    }

    export const noteWrite = (note, token)=>{
        let result = axios.post("/api/noteWrite/", note, header(token));
        return result;
    }

    export const noteRead = (no, token) =>{
        let res = axios.get("/api/noteRead/"+no, header(token) );
        return res;
    }

    export const noteDelete = (no, token)=>{
        let res = axios.post("/api/noteDelete", {
            nos: no
        }, header(token));
        return res;
    }
