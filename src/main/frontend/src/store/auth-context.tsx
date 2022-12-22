import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './auth-action'; 

let logoutTimer: NodeJS.Timeout;

type Props = { children?: React.ReactNode }
type UserInfo = { userid: string, usernickname: string, useremail: string};
type LoginToken = { 
  grantType: string,
  accessToken: string,
  tokenExpiresIn: number
}

const AuthContext = React.createContext({
  token: '',
  userObj: { userid: '', usernickname: '', useremail: '' },
  isLoggedIn: false,
  isSuccess: false,
  isGetSuccess: false,
  signup: (userid: string, userpw: string, usernickname:string, useremail: string) =>  {},
  login: (userid:string, userpw: string) => {},
  logout: () => {},
  getUser: () => {},
  changeNickname: (usernickname:string) => {},
  changePassword: (exPassword: string, newPassword: string) => {}
});


export const AuthContextProvider:React.FC<Props> = (props) => {

  const tokenData = authAction.retrieveStoredToken();

  let initialToken:any;
  if (tokenData) {
    initialToken = tokenData.token!;
  }

  const [token, setToken] = useState(initialToken);
  const [userObj, setUserObj] = useState({
    userid: '',
    usernickname: '',
    useremail: ''
  });
  
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isGetSuccess, setIsGetSuccess ] = useState<boolean>(false);

  const userIsLoggedIn = !!token;


  
  const signupHandler = (userid:string, userpw: string, usernickname: string, useremail: string) => {
    setIsSuccess(false);
    const response = authAction.signupActionHandler(userid, userpw, usernickname, useremail);
    response.then((result) => {
      if (result !== null) {
        setIsSuccess(true);
      }
    });
  }

  const loginHandler = (userid:string, userpw: string) => {
    setIsSuccess(false);
    console.log(isSuccess);
    
    const data = authAction.loginActionHandler(userid, userpw);
    data.then((result) => {
      if (result !== null) {
        const loginData:LoginToken = result.data;
        setToken(loginData.accessToken);
        logoutTimer = setTimeout(
          logoutHandler,
          authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn)
        );
        setIsSuccess(true);
        console.log(isSuccess);
      }
    })
  };

  const logoutHandler = useCallback(() => {
    setToken('');
    authAction.logoutActionHandler();
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const getUserHandler = () => {
    setIsGetSuccess(false);
    const data = authAction.getUserActionHandler(token);
    data.then((result) => {
      if (result !== null) {
        console.log('get user start!');
        const userData:UserInfo = result.data;
        setUserObj(userData);
        setIsGetSuccess(true);
      }
    })    
    
  };

  const changeNicknameHandler = (usernickname:string) => {
    setIsSuccess(false);

    const data = authAction.changeNicknameActionHandler(usernickname, token);
    data.then((result) => {
      if (result !== null) {
        const userData:UserInfo = result.data;
        setUserObj(userData);
        setIsSuccess(true);
      }
    })
  };

  const changePaswordHandler = (exPassword:string, newPassword: string) => {
    setIsSuccess(false);
    const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
    data.then((result) => {
      if (result !== null) {
        setIsSuccess(true);
        logoutHandler();
      }
    });
  };

  useEffect(() => {
    if(tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);


  const contextValue = {
    token,
    userObj,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
    getUser: getUserHandler,
    changeNickname: changeNicknameHandler,
    changePassword: changePaswordHandler
  }
  
  return(
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;