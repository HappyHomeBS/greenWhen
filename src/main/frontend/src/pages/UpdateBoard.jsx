// # frontend/src/pages/UpdateBoard.jsx
import { React, useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const UpdateBoard = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let location = useLocation();
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    console.log('UpdateBoard/location.state: ', location.state);
    const no = location.state.no;  // 게시글 수정 이후 돌아갈 게시글의 id
    const old_title = location.state.title;
    const old_content = location.state.content;

    const resetInput = () => {
        setContent("");
        setTitle("");
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
    }

    const handleInputClick = async (e) => {
        e.preventDefault();
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
        console.log('writeBoard');
        const request_data = {no: no, title: title, content: content};
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
											                    method: 'put',
											                    url: '/api/update-board',
											                    headers: {'Content-Type': 'application/json' },
											                    data: JSON.stringify(request_data)
									                    });
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            navigate("/page", { state : { no: Number(no) } });
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
            resetInput();
        }
    }
    useEffect(() => {
            console.log('UpdateBoard/useEffect()');
	        setTitle(title);
            setContent(content);
            console.log('title: ', title);
            console.log('content: ', content);
        }, [content, old_content, old_title, title])

    return (
        <>
            <label>제목</label> <br/>
            <input id='input_title' type="text" placeholder="수정할 제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value) }/><br/>
            <label>내용</label><br/>
            <textarea id='textarea_content' type="text" placeholder="수정할 내용 을 입력해주세요" value={content}  onChange={(e) => setContent(e.target.value) }/><br/>
            <input type="button" value="게시글 수정" onClick={handleInputClick}/>
        </>
    )
}

export default UpdateBoard;