import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../../store/authContext";
import { useNavigate } from "react-router-dom";

const MemberBox = (props: any) => {
  const authCtx = useContext(AuthContext);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const userDelete = (user: any) => {
    //console.log("정보:", user);
    const userid = user.userid;
    const useremail = user.useremail;
    const usernickname = user.usernickname;
    authCtx.userDelete(userid, useremail, usernickname);
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    console.log(selected);
  };

  const submitHandler = (event: React.FormEvent, userid: string) => {
    event.preventDefault();
    //console.log('권한변경',selected, userid);
    authCtx.roleChange(selected, userid);
    window.location.reload();
    //navigate("/admin", { replace: true });
  };

  return (    
    <div>
    <form onSubmit={(event) => submitHandler(event, props.userid)}>
      <span>{props.userid}</span>
      <span>{props.usernickname}</span>
      {props.role === 'ROLE_ADMIN' && <span>관리자</span>}
      {props.role === 'ROLE_USER' && <span>일반유저</span>}
      <span>{props.time}</span>
      <select className="grade" onChange={selectChange} >
        <option>관리등급</option>
        <option value="ROLE_ADMIN">관리자</option>
        <option value="ROLE_USER">일반유저</option>
      </select>
      <button type='submit'>등급 변경</button>
    </form>
    <button>쪽지</button>
    <button onClick={() => userDelete(props)}>탈퇴</button>
  </div>
  );
};

export default MemberBox;
