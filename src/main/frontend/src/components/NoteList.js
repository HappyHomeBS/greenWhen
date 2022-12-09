import React, { useEffect } from 'react';
import axios from 'axios';
const NoteList= () => {

useEffect(() =>{
    getNoteList();
}, []);
let userId="test2";
// uri '가 아니라 `(억음부호) 
const getNoteList = async () => {
    const res = await axios.get(`/api/noteList?userId=${userId}`);
        console.log(res);
}
    return (
            <div>

            </div>

    );
};

export default NoteList;