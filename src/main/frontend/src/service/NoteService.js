import axios from 'axios';

class NoteService {
    
    createTokenHeader = (token) => {
        return {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      }
      
    
    getNoteList(token) {
        //axios 데이터 res에 담기
        const result = axios.get("/api/note/");
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
}
export default new NoteService();