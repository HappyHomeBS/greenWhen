import React, { useEffect } from "react";
import axios from "axios";     
import { useNavigate, useLocation } from "react-router-dom";
import ManageMemberList from "../components/ManageMember/ManageMemberList";
import BoardList from "../components/BoardList/BoardList";
import { useState } from "react";
import SelectList from "../components/SelectComponentForModify";
import { EditableSelect } from "./ddd";
import DDD from "./ddd";
import InviteUserModal from "../components/Modals/InviteUserModal";

const ManageGroup  = () => {
  const location = useLocation();
  const groupname = location.state.groupname.selectedGroup;
  const groupleader = location.state.groupleader.groupLeader;
  const userid = location.state.userid.userid;
  const [memberListData, setMemeberListData] = useState([]);
  const [BoardListData, setBoardListData] = useState([]);
  const [Choice, setChoice] = useState(null);
  const DeleteMultifle = true
  const [ IsSubmitting, setIsSubmitting] = useState(false);
  const [ Error, setError ] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const [jsxElement, setJsxElement] = useState(null)
  const [modyElement, setModyElement]  = useState(null)

/*
const ExampleComponent = () => {
  */
    
  

    /*
    return (
        <div>
            <button onClick={exampleFunction}>Click Me</button>
            <div>{exampleFunction()}</div>
        </div>
    );

}
*/


  const deleteGroup = async (event) => {
    setIsSubmitting(true);
    setError(null);

    if (window.confirm('한번 삭제하면 되돌릴 수 없습니다. 삭제하시겠습니까?')){
      

    try {
      const request_data = {groupname : groupname}; 
        let response = await axios({
            method : 'DELETE',
            url: '/api/delete-group/',
            headers: {'Content-type': 'application/json'},
            data : JSON.stringify(request_data)
            });
      alert("삭제되었습니다");
      navigate("/");
    
    }catch(err){
      setError(err.message);
    }finally{
      setIsSubmitting(false);
    }
  }
  else {
    alert("no?");
  }
  };

  const exampleFunction = () => {

    if (window.confirm('Really go to another page?'))
      {
    
        setJsxElement(<div>Hello, yes!</div>);
      }
    else
      {
    
        setJsxElement(<div>Hello, no!</div>);
      }
  }

  const modifyTag = () => {

    
    if (modyElement === null) {
      const forMody = {
        groupname : groupname,
        groupleader : groupleader,
        userid : userid
      };
      console.log('다음으로 보낼 데이터:' , forMody);
    setModyElement(<SelectList data = { forMody }/>)
  }
    else {
      setModyElement(null);
    }
    

}

  useEffect(() => {

    const getMemberList = async () => {
        let response = await axios.get(`/api/member-list/${groupname}`);
        setMemeberListData(response.data.data);
        console.log('memberlist : ' , response.data.data);
      };

    const getBoardList = async () => {
        let response = await axios.get(`/api/board-list/${groupname}`);
        setBoardListData(response.data.data);
        console.log('boardlist : ' , response.data.data);
    };


    getMemberList();
    getBoardList();


    }, [groupname, Choice]);

    console.log('choice : ' , Choice);

    const forMody = {
      groupname : groupname,
      groupleader : groupleader,
      userid : userid
    };



    return (
        <>
        <div>
          <code>
        <button onClick={()=>setChoice(true)}> 모임인원관리 </button> 
        <button onClick={()=> setChoice(false)}>게시판관리</button>
          </code>
        </div>
            <h1>{groupname}</h1>
            <div>
            <button onClick={exampleFunction}>Click Me</button>
            {jsxElement}
            <button onClick={modifyTag}>modifyTag</button>
            {modyElement}
            <button onClick={deleteGroup}>소모임 삭제</button>
            </div>
            
              { Choice === true  &&  <ManageMemberList data = {memberListData}/> }
              { Choice === false &&  <BoardList data = {BoardListData} state = { DeleteMultifle } /> }
            <div>
              <DDD />
              <button onClick={ () => setShowModal(true)}>INVITE</button>
            {showModal && (
                <InviteUserModal  groupname = {groupname} groupleader = {groupleader} data = {memberListData} onClose={() => setShowModal(false)} />
            )}
            </div>
        </>
    );
}

export default ManageGroup;