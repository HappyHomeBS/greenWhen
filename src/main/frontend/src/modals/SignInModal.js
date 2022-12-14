import React from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'


const SignInModal = ({ show, onHide }) => {
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
                        로그인
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="my-3">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control type="text" placeholder="아이디를 입력하세요" />
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Button variant="info" type="button">
                                로그인
                            </Button>
                        </Form.Group>
                        <Button variant="info" type="button">
                            아이디 찾기
                        </Button>
                        <Button variant="info" type="button">
                            비밀번호 찾기
                        </Button>
                    </Form>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default SignInModal