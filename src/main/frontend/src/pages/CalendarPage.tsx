import React, { Fragment, useContext, useState } from "react";
import { CalendarComponent } from "../components/Calendar/CalendarComponent";
import MainNavigation from "../components/Layout/MainNavigation";
import AuthContext from "../store/authContext";



const CalendarPage = () => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  
  const islogin = authCtx.isLoggedIn; // 로그인 여부 true: 로그인, false:비로그인    
  const userRole = authCtx.userObj.role;
  console.log('권한:', userRole)
  

  return (
    <Fragment>
      <CalendarComponent />      
    </Fragment>
  );
};

export default CalendarPage;