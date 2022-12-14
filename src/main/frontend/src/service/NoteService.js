import axios from 'axios';
const noteApiBaseUrl = `http://localhost:8080/api/`;

class NoteService {
    getNoteList(userId) {
        const res = axios.get(noteApiBaseUrl+"note/"+userId);
        console.log(res);
        return res;
    }
}
export default new NoteService();