import axios from 'axios';
let userId="test2"
// const NOTE_API_BASE_URL = `http://localhost:8080/api/note/${userId}`;
class NoteService {
    getNoteList() {
        const res = axios.get(`http://localhost:8080/api/note/${userId}`);
        console.log(res);
        return res;
    }
}
export default new NoteService();