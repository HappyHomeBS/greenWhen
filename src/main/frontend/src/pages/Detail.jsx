import React,{ useEffect, useState }  from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Detail = () => {
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[files, setFiles] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const no = location.state.no;

    console.log("no: " , no );

//{no : no}  앞에거는 entity에 맞춘거고 뒤에거는 이 페이지의 no값
    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();
        const request_data = {no : no}; 
        let response = await axios({
            method : 'DELETE',
            url: '/api/delete-board',
            headers: {'Content-type': 'application/json'},
            data : JSON.stringify(request_data)
        });

        console.log('머가 삭제되러 갓는지 보자 ', response);
        navigate("/", {});
    };

    useEffect( ()=> {
        const fetchData = async () => {
            const result = await axios(`/api/board-detail/${no}`);
            setTitle(result.data.data.title);
            setContent(result.data.data.content);
            setFiles(result.data.data.files);
            console.log('타이틀 내용 사진 보자 ->', result);
        };
        fetchData();
    }, [no]);

    return (
        <>
            <h1>{title}</h1>
            <h3>{content}</h3>
            {files.map((file, index) => (
                <img key={index} src={file.filedata} alt={file.name} width={400} height={300} />
            ))}
            <Link 
                to={"/update-board"}
                state={{
                    no: no,
                    title: title,
                    content: content
                }}>
                    {" "}
                    수정하기 | {" "}
                </Link>
            <input type="button" onClick={handleDeleteBtnClick} value="삭제" />
            <Link to ={"/"} state={{}}>
            {" "}
            |목록보기  {" "}
            </Link>
        </>
    );

};

export default Detail;