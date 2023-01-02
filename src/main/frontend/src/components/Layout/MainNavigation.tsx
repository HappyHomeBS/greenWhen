import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import AuthContext from '../../store/authContext';
import SignUpModal from '../../modals/SignUpModal'

import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import SignInModal from '../../modals/SignInModal';
import '../../ProfileImagecss.css'
import { Modal } from 'react-bootstrap';


const MainNavigation = () => {

  const authCtx = useContext(AuthContext);
  const [usernickname, setUserNickname] = useState('');
  const token = authCtx.token;
  let isLogin = authCtx.isLoggedIn;
  let isGet = authCtx.isGetSuccess;
  const role = authCtx.userObj.role;


  const [SignUpModalOn, setSignUpModalOn] = useState(false);
  const [SignInModalOn, setSignInModalOn] = useState(false);

  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const [imageUrl, setImageUrl] = useState('/profileImg/')

  const callback = (str: string) => {
    setUserNickname(str);
  }

  useEffect(() => {
    if (isLogin) {
      console.log('start');
      authCtx.getUser();
      setSignInModalOn(false);      
    }
  }, [isLogin]);

  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.usernickname);
    }

    axios.get('/member/callProfile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        const data = res.data;
        const URL = imageUrl + data.filename
        setImage(URL)
        console.log("주소", Image)

      });
  }, [isGet]);


  const toggleLogoutHandler = () => {
    authCtx.logout();
    window.location.reload();
  }



  return (
    <>
      <SignUpModal
        show={SignUpModalOn}
        onHide={() => setSignUpModalOn(false)} />
      <SignInModal
        show={SignInModalOn}
        onHide={() => setSignInModalOn(false)} />
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home"><Link to='/'><div>언제갈래?</div></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {!isLogin && <Nav.Link> <Button variant="outline-primary" onClick={() => setSignInModalOn(true)}>Login</Button></Nav.Link>}
                {!isLogin && <Nav.Link> <Button variant="outline-primary" onClick={() => setSignUpModalOn(true)}>Sign-Up</Button></Nav.Link>}
                {isLogin && <Link to='/profile'><img src={Image} className="navImage" alt="" /></Link>}
                {isLogin && <Navbar> &nbsp; {usernickname}님 환영합니다! </Navbar>}
                {isLogin && <Nav.Link> <Button variant="outline-primary" onClick={toggleLogoutHandler}>Logout</Button></Nav.Link>}
                {isLogin && role ==='ROLE_ADMIN' &&  <Nav.Link><Link to='/admin'> <Button variant="outline-primary">관리자 페이지</Button></Link></Nav.Link>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default MainNavigation;