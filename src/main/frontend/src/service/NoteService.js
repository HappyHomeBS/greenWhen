import axios from 'axios';
const noteApiBaseUrl = `http://localhost:8080/api/`;


class NoteService {
    getNoteList(userId) {
        //axios 데이터 res에 담기
        const result = axios.get(noteApiBaseUrl+"note/"+userId);
        console.log(result);
        return result;
    }

    noteWrite(note) {
        let result = axios.post(noteApiBaseUrl+"note/", note);
        return result;
    }
}
export default new NoteService();