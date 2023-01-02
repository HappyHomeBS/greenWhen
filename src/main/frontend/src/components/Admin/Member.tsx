import axios from 'axios';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';


const Member = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [users, setUsers] = useState([{
    userid: '',
    usernickname: '',
    useremail: '',
    role: '',
    time: ''
  }]);

  useEffect(() => {

    axios.get('/admin/userList', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        console.log('유저정보:', res.data);
        setUsers(res.data);
      });
  }, []);

  const userDelete = (user: any ) => {
    console.log('정보:', user)
    axios.post('/admin/userDelete', {
      userid: user.userid,
      useremail: user.useremail,
      usernickname: user.usernickname
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })     
  }

  return (
    <div>
      <h2>회원 목록</h2>
      <div>
        <tr>          
          <th> 아이디 </th>
          <th> 닉네임</th>
          <th> 유저권한</th>
          <th> 가입일자</th>
        </tr>
      </div>
      <div>
        {/*반복되는 컴포넌트 렌더링 위해 map()사용  */}
        <div>
          {users.map(user => {
            return (
              <div>
                <div>                  
                  { user.userid }
                  { user.usernickname }
                  { user.role ==='ROLE_ADMIN' &&  <>관리자</> }
                  { user.role ==='ROLE_USER' &&  <>일반유저</> }                  
                  { user.time }
                  <button>쪽지</button>
                  <button onClick={() => userDelete(user)}>탈퇴</button>
                </div>                
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export { Member };