import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateAndDelete from "./UpdateAndDelete";


const CommentForm = (prop) => {
    const [userid, setUserId] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    console.log('CommentForm에 boardId = {id} 로 받았음 ->', prop);

    //prop 이 지금 boardId임

    const contentNo = prop;        //  {boardId: 5 }   5는 예시고 이 Object가 아래 data로 들어감 Long타입이 아니라

    const { contentNo : no } = contentNo;
    const { fig, setFig } = prop;    

    const navigate = useNavigate();
    
    console.log("1. 댓글에 지금 문제가 boardId가 안들어감. 다른건 보내짐. 일단 prop은 되었나?", contentNo);

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        console.log("2. 여기선 되었나? : ", contentNo);


        let data = {
            contentNo: Number(no),
            userid: userid,
            content: content
        }

        console.log("아 좀 보자고: ", data);
        try {
            const response = await axios.post("/api/create-comment", data);
            if (response.status >= 200 && response.status < 300) {
                alert("Comment created successfully");
                console.log( {no: Number(no)});
                console.log( no );
                console.log(Number(no));
                navigate("/page", { state: { no: Number(no) } });
                setFig(fig + 1);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            console.log('3. 결국 boardId는 ? : ' , contentNo);
            setIsSubmitting(false);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label>
                userid:
                <input
                    type="text"
                    placeholder="로그인기능이 없어서 잠시 대체 "
                    value={userid}
                    onChange={(event)=> setUserId(event.target.value)}
                />
            </label>
            <label>
                content :
                <textarea
                    placeholder="Enter content"
                    value={content}
                    onChange={(event)=> setContent(event.target.value)}
                />
            </label>
            <button type="submit" disabled={isSubmitting}>
                댓글달기
            </button>
        </form>
    
      <div>
       <UpdateAndDelete />

        </div>
  </>
    )
};

export default CommentForm;
