import { Fragment, useContext, useState } from "react";
import { ChangeUsername } from "../components/Profile/ChangeUsername";
import { ChangePassword } from "../components/Profile/ChangePassword";
import { ProfileImage } from "../components/Profile/ProfileImage";
import React from "react";
import AuthContext from "../store/authContext";
import { Member } from "../components/Admin/Member";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  
  const useremail = authCtx.userObj.useremail;  
  const role = authCtx.userObj.role;  

  const [member, setMember] = useState(false);

  return (
    <Fragment>
      <button>소모임</button>
      <button onClick={() => setMember(true)}>회원</button>
      <button>1:1문의</button>
      {member && <Member />}
      
    </Fragment>
  );
};

export default ProfilePage;