import axios from "axios";
import React, {useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../../store/authContext";


const GroupBox = (props) => {
    
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

     //6글자 이상만 가입가능하므로 해당 id는 존재할 수 없음. 

    const handleSecession = async () => {
        await axios.delete(`/api/manage/sessecion/${props.groupname}`, {
            headers: {
                'Authorization': 'Bearer ' + token
                }
        });
    };

    return(
        <>
            <Link
                to = {"/bulletin"}
                state = {{
                    groupname : props.groupname,
                }}
            >

                <div>
                    <h5> {props.groupname} </h5>
                </div>
            </Link>

            <button onClick={handleSecession}>탈퇴</button>
        </>
    )
}

export default GroupBox;