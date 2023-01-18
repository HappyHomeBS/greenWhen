import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const MemberBox = (props: any) => {
  const authCtx = useContext(AuthContext);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const userDelete = (user: any) => {
    console.log("정보:", user);
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
    console.log(selected, userid);
    authCtx.roleChange(selected, userid);
    //window.location.reload();
    navigate("/admin", { replace: true });
  };

  return (
    <table>
      <tbody>
        <tr onSubmit={(event) => submitHandler(event, props.userid)}>
          <td>{props.userid}</td>
          <td>{props.usernickname}</td>
          <td>{props.useremail}</td>
          {props.role === "ROLE_ADMIN" && <td>관리자</td>}
          {props.role === "ROLE_USER" && <td>일반유저</td>}
          <td>{props.time}</td>
          <td>
            <select className="grade" onChange={selectChange}>
              <option>관리등급</option>
              <option value="ROLE_ADMIN">관리자</option>
              <option value="ROLE_USER">일반유저</option>
            </select>
          </td>
          <td>
            <button type="submit">등급 변경</button>
          </td>
          <td>
            <button>쪽지</button>
          </td>
          <td>
            <button onClick={() => userDelete(props)}>탈퇴</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MemberBox;
