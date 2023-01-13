import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/authContext';


const Member = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [selected, setSelected] = useState("");
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

  const userDelete = (user: any) => {
    console.log('정보:', user)
    const userid = user.userid
    const useremail = user.useremail
    const usernickname = user.usernickname
    authCtx.userDelete(userid, useremail, usernickname);
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    console.log(selected)
  }



  const submitHandler = (event: React.FormEvent, userid: string) => {
    event.preventDefault();
    console.log(selected, userid);
    authCtx.roleChange(selected, userid);
    window.location.reload();
  }

  return (
    <div>
      <h2>회원 목록</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <th> 아이디 </th>
              <th> 닉네임</th>
              <th> 유저권한</th>
              <th> 가입일자</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/*반복되는 컴포넌트 렌더링 위해 map()사용  */}
        {users.map(user => {
          return (
            <div key={user.userid}>
              <form onSubmit={(event) => submitHandler(event, user.userid)}>
                <span>{user.userid}</span>
                <span>{user.usernickname}</span>
                {user.role === 'ROLE_ADMIN' && <span>관리자</span>}
                {user.role === 'ROLE_USER' && <span>일반유저</span>}
                <span>{user.time}</span>
                <select className="grade" onChange={handleChange} value={selected}>
                  <option>관리등급</option>
                  <option value="ROLE_ADMIN">관리자</option>
                  <option value="ROLE_USER">일반유저</option>
                </select>
                <button type='submit'>등급 변경</button>
              </form>
              <button>쪽지</button>
              <button onClick={() => userDelete(user)}>탈퇴</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export { Member };