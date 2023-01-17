import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageMemberBox = (props) => {

    const { userid, usernickname, grade, groupname, time} = props;
    const [ TheGrade, setTheGrade ] = useState("");
    const [ IsSubmitting, setIsSubmitting] = useState(false);
    const [ Error, setError ] = useState(null);
    const navigate = useNavigate();




    const kickout = async (event) => {

        //보낼곳 : /api/manage/kick-out/{userid}/{groupname}

        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
    
    
        try {
            const response = await axios.delete(`/api/manage/kick-out/${userid}/${groupname}`);
            if (response.status >= 200 && response.status < 300) {
                alert("successfully deleted");
                    
        }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }



    

    const authoriz = async (event) => {
        // 주소 : /api/change-leader/{userid}/{groupname}
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
    
    
        try {
            const response = await axios.put(`/api/change-leader/${userid}/${groupname}`);
            if (response.status >= 200 && response.status < 300) {
                alert("you are not a groupleader anymore.");
                navigate("/");
                    
        }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }


    };

    useEffect( () => {
        grade === 1
        ? setTheGrade("운영자")
        : setTheGrade("일반")
    }, [grade])
  

    return (



        <div>
            {groupname} | {TheGrade} | 
             {usernickname} | {userid} | {time} | <button onClick={kickout}>강퇴</button> <button onClick={authoriz}> 위임 </button>
        </div>
        
    );
};

export default ManageMemberBox;