import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import CenterBox from "./CenterBox";
import { Link } from 'react-router-dom';
import AuthContext from "../../store/authContext";

const Announcement = () => {
    const [lists, setList] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const isLogin = authCtx.isLoggedIn;
    const role = authCtx.userObj.role;
    const announce = "announce";

    

    useEffect ( () =>{
        const getAnnouncementList = async () => {
            let res = await axios({
                method : 'GET',
                url : `/direct/get-service-center/${1}`,
                headers: {'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token}
            });
            setList(res.data.data);
        };
        getAnnouncementList();
    }, [])

    const listsEliments = lists.map(list => {

        return (
            <div key={list.no}>
                <CenterBox 
                    key = {list.no}
                    no = {list.no}
                    title ={list.title}
                    userid = {list.userid}
                    content = {list.content}
                    time = {list.time}
                    tag = {list.tag}
                    parents = {announce}
                    />
            </div>
        );
    });

    /*
    <div>
          {isLogin && role ==='ROLE_ADMIN' &&<CreateAnnounceOrFAQ parents={announce} />}
        </div>
    */


    return(

        <>
        <h3> 말머리 || 질문 || 작성자</h3>
        <div>{listsEliments}</div>

        <div>

        {isLogin && role === 'ROLE_ADMIN' && <Link to={"/create-annouce-or-faq"}
                state={{ 
                parents: announce, tagList: null }}>
        <input type='button' value='게시글 작성하기'/>
            </Link>}
        </div>   
        

        </>
    )
};

export default Announcement;