import axios from 'axios';
const noteApiBaseUrl = `http://localhost:8080/api/`;


class NoteService {
    getNoteList(userId) {
        //axios 데이터 res에 담기
        const result = axios.get(noteApiBaseUrl+"note/"+userId);
        return result;
    }

    noteWrite(note) {
        let result = axios.post(noteApiBaseUrl+"noteWrite/", note);
        return result;
    }

    noteRead(no) {
        let res = axios.get(noteApiBaseUrl+"noteRead/"+no);
        console.log(res.data);
        return res;
    }

    noteDelete(no) {
        let res = axios.delete(noteApiBaseUrl+"noteDelete/"+no)
        return res;
    }
}
export default new NoteService();