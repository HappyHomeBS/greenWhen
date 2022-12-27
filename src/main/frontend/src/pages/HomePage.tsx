import React, { useContext, useState } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import AuthContext from "../store/authContext";



const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  
  const islogin = authCtx.isLoggedIn; // 로그인 여부 true: 로그인, false:비로그인  
  const token = authCtx.token;
  const createTokenHeader = (token:string) => {
    return {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  }    
  

  return (
    <div>
      <div>{userid}님 환영합니다.</div>
      <div>{usernickname}님 환영합니다.</div>                        
      <div>{token}님 환영합니다.</div>                        
    </div>
  );
};

export default HomePage;