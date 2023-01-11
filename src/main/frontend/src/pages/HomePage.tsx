import React, { useContext, useState } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import AuthContext from "../store/authContext";



const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  
  const islogin = authCtx.isLoggedIn; // 로그인 여부 true: 로그인, false:비로그인    
  const userRole = authCtx.userObj.role;
  console.log('권한:', userRole)
  console.log('토큰:', token)
  console.log('아이디:', userid)
  console.log('닉네임:', usernickname)
  

  

  return (
    <div>
      <div>{userid}님 환영합니다.</div>
      <div>{usernickname}님 환영합니다.</div>                                                      
      <div>{userRole}님 환영합니다.</div>                                                      
      <div>{token}님 환영합니다.</div>                                                      
    </div>
  );
};

export default HomePage;