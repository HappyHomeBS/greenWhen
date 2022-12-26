import React, { useContext, useState } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import AuthContext from "../store/auth-context";



const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  

  return (
    <div>
      <div>{userid}님 환영합니다.</div>
      <div>{usernickname}님 환영합니다.</div>            
      <div></div>
    </div>
  );
};

export default HomePage;