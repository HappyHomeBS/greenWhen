import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/authContext';
import GroupList from '../../Group/ManageSide/GroupList/GroupList';


const Group = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [groupListAll, setGroupListAll] = useState([]);
  const [fig, setFig] = useState(0);
  const Admin = true;

  useEffect( () => {

    const getGroupListAll = async() => {
      let response = await axios.get("/direct/get-grouplist",  {
        headers: {
        'Authorization': 'Bearer ' + token
        }
      });
      setGroupListAll(response.data.data);

    };

    getGroupListAll();

  }, [fig]);

  const updateGroupList = () => {
    setFig( {fig} + 1 );
  }


  return (
    <div>
      <h2>소모임 목록이 우선 뜨고 해당 소모임 클릭시 해당 소모임 게시판, 인원을 관리 가능</h2>
      <GroupList data = {groupListAll} Admin={Admin}  updateGroupList = {updateGroupList}/>

    </div>
  );
}

export default  Group;