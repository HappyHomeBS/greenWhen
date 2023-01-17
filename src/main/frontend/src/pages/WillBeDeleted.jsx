import React, { useEffect, useState } from "react";
import BoardList from "../components/BoardList/BoardList";
import CommentByOther from "../components/UserThings/CommentsByOther";
import Invitation from "../components/UserThings/Invitation";
import CommentList from "../components/CommentList/CommentList";
import GroupList from "../components/GroupList/GroupList";
import axios from "axios";

const WillBeDeleted = () => {
    const [groupList, setGroupList] = useState([]);
    const [boardList, setBoardList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [commentListByOther, setCommentListByOther] = useState([]);
    const [invitationList, setInvitationList] = useState([]);

    const userid = "test5"



    useEffect(() => {
        const getBoardList = async () => {
            let response = await axios.get(`/api/board-list-mypage/${userid}`);
            setBoardList(response.data.data );

        return null;
            
        };

        const getCommentList = async () => {
            let response = await axios.get(`/api/comment-list-mypage/${userid}`);
            setCommentList(response.data.data );

        return null;
            
        };

        getBoardList();
        getCommentList();
    }, []);

    const fetchGroupList = async () => {
        try {
            const response = await axios.get(`/api/group-list/${userid}`);
            setGroupList(response.data.data);
            const response2 = await axios.get(`/api/note-list-mypage/${userid}`);
            setInvitationList(response2.data.data );
        }catch(err){
            console.log(err);
        }
    }
/*
    const getInvitationList = async () => {
        try {
            const response2 = await axios.get(`/api/note-list-mypage/${userid}`);
            setInvitationList(response2.data.data );
        }catch(err){
            console.log(err);
        }
    }
*/

    useEffect( () => {
        fetchGroupList();
    }, []);

  /*  useEffect( () => {
        const getCommentByOtherList = async () => {
            let response = await axios.get(`/api/comment-list-other-mypage/${userid}`);
            setCommentListByOther(response.data.data );

        };
        getCommentByOtherList();

    }, []);
*/




    return (

        <>
            <div>
            <h5> ***다른사람이 단 댓글*** </h5>
            <CommentByOther />
            <h5> ***초대장*** </h5>
            <Invitation onAccept={fetchGroupList} data = {invitationList} />
            <h5> ***소모임목록*** </h5>
            <GroupList data = {groupList}  />
            <h5> ***내가쓴 게시글*** </h5>
            <BoardList data ={boardList}/>
            <h5> ***내가쓴 댓글*** </h5>
            <CommentList data = {commentList} />
            </div>
        </>


    );
};

export default WillBeDeleted;