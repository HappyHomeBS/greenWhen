import axios from 'axios';

class NoteService {
    getNoteList(userId, num) {
        //axios 데이터 res에 담기
        const result = axios.get("/api/note/"+userId+"?num="+num);
        return result;
    }

    noteWrite(note) {
        let result = axios.post("/api/noteWrite/", note);
        return result;
    }

    noteRead(no) {
        let res = axios.get("/api/noteRead/"+no);
        console.log(res.data);
        return res;
    }

    noteDelete(no) {
        let res = axios.delete("/api/noteDelete/"+no)
        return res;
    }
    noteSentList(userId, num) {
        let res = axios.get("/api/noteSentList/"+userId+"?num="+num)
        console.log("응답")
        console.log(res.data)
        return res;
    }
}
export default new NoteService();