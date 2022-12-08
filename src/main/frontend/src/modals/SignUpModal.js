import React, { useState } from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import axios from 'axios'


const SignUpModal = ({ show, onHide }) => {

    const [userid, setUserid] = useState('');
    const [userpw, setUserpw] = useState('');
    const [usernickname, setUsernickname] = useState('');
    const [useremail, setUseremail] = useState('');
    const [checkUserpw, setcheckUserpw] = useState('');
    const [userinfo, setuserinfo] = useState([])

    const handleChange_userid = (e) => {
        e.preventDefault();
        setUserid(e.target.value);
    }
    const handleChange_userpw = (e) => {
        e.preventDefault();
        setUserpw(e.target.value);
    }
    const handleChange_usernickname = (e) => {
        e.preventDefault();
        setUsernickname(e.target.value);
    }
    const handleChange_useremail = (e) => {
        e.preventDefault();
        setUseremail(e.target.value);
    }
    const handleChange_checkUserpw = (e) => {
        e.preventDefault();
        setcheckUserpw(e.target.value);
    }

    const userCheck = () => {
        axios
            .post("/userCheck", {
                userid: userid,
                usernickname: usernickname,
                useremail: useremail,
            })
            .then((response) => {
                setuserinfo(response.data);
                console.log(userinfo)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userid === '') {
            e.preventDefault();
            return alert('아이디를 입력해주세요');
        }
        else if (userCheck(userid) === '1') {
            console.log(userinfo)
            return alert('이미 존재하는 아이디입니다.')            
        }
        else if (userpw === '') {
            e.preventDefault();
            return alert('비밀번호를 입력해주세요');
        }
        else if (checkUserpw === '') {
            e.preventDefault();
            return alert('비밀번호확인을 입력해주세요');
        }
        else if (userpw !== checkUserpw) {
            e.preventDefault();
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
        }
        else if (usernickname === '') {
            e.preventDefault();
            return alert('별명을 입력해주세요');
        }
        else if (useremail === '') {
            e.preventDefault();
            return alert('이메일을 입력해주세요');
        }



        axios
            .post("/signup", {
                userid: userid,
                userpw: userpw,
                usernickname: usernickname,
                useremail: useremail,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        회원가입
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>아이디</Form.Label>
                            <Form.Control type="text" placeholder="아이디를 입력하세요" value={userid || ''} onChange={handleChange_userid} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" value={userpw || ''} onChange={handleChange_userpw} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" value={checkUserpw || ''} onChange={handleChange_checkUserpw} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>별명</Form.Label>
                            <Form.Control type="text" placeholder="별명을 입력하세요" value={usernickname || ''} onChange={handleChange_usernickname} />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="useremail" placeholder="이메일을 입력하세요" value={useremail || ''} onChange={handleChange_useremail} />
                        </Form.Group>
                        <Button variant="info" type="submit" className="my-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default SignUpModal