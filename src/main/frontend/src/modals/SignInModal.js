import React from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'


const SignUpModal = ({ show, onHide }) => {
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
                    <Form>
                        <Form.Group>
                            <Form.Label>아이디</Form.Label>
                            <Form.Control type="text" placeholder="아이디를 입력하세요" />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>별명</Form.Label>
                            <Form.Control type="text" placeholder="별명을 입력하세요" />
                        </Form.Group>
                        <br />

                        <Form.Group>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" placeholder="이메일을 입력하세요" />
                        </Form.Group>
                        <Button block variant="info" type="button" className="my-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default SignUpModal