import React, { useEffect, useState, useContext } from "react";
import BoardList from "../components/Group/Board/BoardList/BoardList";
import CommentByOther from "../components/Group/ManageSide/UserThings/CommentsByOther";
import Invitation from "../components/Group/ManageSide/UserThings/Invitation";

import CommentList from "../components/Group/UserSide/CommentList/CommentList";
import GroupList from "../components/Group/ManageSide/GroupList/GroupList";
import axios from "axios";
import AuthContext from "../store/authContext";

const WillBeDeleted = () => {
    const [groupList, setGroupList] = useState([]);
    const [boardList, setBoardList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [commentListByOther, setCommentListByOther] = useState([]);
    const only4 = true;
    const [invitationList, setInvitationList] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
 




    useEffect(() => {
        const getBoardList = async () => {
            let response = await axios.get("/api/board-list-mypage", {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            setBoardList(response.data.data );

        return null;
            
        };

        const getCommentList = async () => {
            let response = await axios.get("/api/comment-list-mypage", {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            setCommentList(response.data.data );

        return null;
            
        };

        getBoardList();
        getCommentList();
    }, []);

    const fetchGroupList = async () => {
        try {
            const response = await axios.get("/api/group-list", {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            setGroupList(response.data.data);
            const response2 = await axios.get("/api/note-list-mypage", {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            setInvitationList(response2.data.data );
        }catch(err){
            console.log(err);
        }
    }


    useEffect( () => {
        fetchGroupList();
    }, []);




    return (

        <>
            <div>
            <h5> ***다른사람이 단 댓글*** </h5>
            <CommentByOther />
            <h5> ***초대장*** </h5>
            <Invitation onAccept={fetchGroupList} data = {invitationList} />
            <h5> ***소모임목록*** </h5>
            <GroupList onAccept={fetchGroupList} data = {groupList}  />
            <h5> ***최근 내가 쓴 게시글*** </h5>
            <BoardList data ={boardList} only4={only4}/>
            <h5> ***내가 쓴 댓글*** </h5>
            <CommentList data = {commentList} />
            </div>
        </>


    );
};

export default WillBeDeleted;