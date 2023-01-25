import axios from "axios";
import React, { useState, useContext } from "react";
import AuthContext from "../../../store/authContext";

const NoteAllUserModal = (props) => {
    console.log('admin? ', props.Admin );
    const { groupname, groupleader } = props;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

   


    const handleSubmit = async (event) => {
        event.preventDefault();



        if(!title){
            setErrorMessage('내용을 입력해 주세요');
            return;
        }

        if(!content){
            setErrorMessage('내용을 입력해 주세요');
            return;
        }

        
        

        try {
            let data = {
                no : null,
                send : groupleader,
                recept : null,
                title : title,
                content : content,
                readcheck : 0,
                deleted : 0,
                invitation : false
            };
        await axios.post(`/api/Note-all-member/${groupname}`, data, {
            headers: {
            'Authorization': 'Bearer ' + token
            }
            });
        window.location.reload();
        }catch ( err ){
            console.log('errrrr');
        }

    };



    return (
        <div className="modal-overlay-to-NoteAll">
            <div className="modal-content-to-NoteAll">
                <h2>단체 쪽지 보내기</h2>
                <form onSubmit={handleSubmit}>
                   
                    <label htmlFor="user"> 받는사람 : </label>
                    <br />
                    {groupname}
                    <label > 의 모든 회원 </label>
                    <br />
                    <label> 제목 : </label>
                    <input
                        type = "text"
                        id = "note-all"
                        value={props.Admin === true ? "관리자입니다." : title }
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <label> 내용 : </label>
                    <input
                        type = "text"
                        id = "note-all2"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />

                    <button type="submit"> 전송 </button>
                    <button className="modal-close-button" onClick={props.onClose}>
                    취소
                </button>
                {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                </form>
            </div>
        </div>

    );
};

export default NoteAllUserModal;