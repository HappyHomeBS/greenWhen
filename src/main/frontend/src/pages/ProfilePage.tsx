import { Fragment, useContext } from "react";
import { ChangeUsername } from "../components/Profile/ChangeUsername";
import { ChangePassword } from "../components/Profile/ChangePassword";
import React from "react";
import AuthContext from "../store/auth-context";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  
  const useremail = authCtx.userObj.useremail;  

  return (
    <Fragment>
      <div>아이디: {userid}</div>
      <div>닉네임: {usernickname}</div>
      <div>이메일: {useremail}</div>
      <ChangePassword />
      <ChangeUsername />
    </Fragment>
  );
};

export default ProfilePage;