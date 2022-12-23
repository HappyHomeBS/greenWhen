import React, { useRef, useState, useContext } from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';


const SignInModal = ({ show, onHide }: {
    show: any;
    onHide: any;
}): JSX.Element => {

    const useridInputRef = useRef<HTMLInputElement>(null);
    const userpwInputRef = useRef<HTMLInputElement>(null);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const submitHandler = async (event: React.FormEvent) => {     
        event.preventDefault();   

        const enteredUserid = useridInputRef.current!.value;
        const enteredUserpw = userpwInputRef.current!.value;

        setIsLoading(true);
        authCtx.login(enteredUserid, enteredUserpw);
        setIsLoading(false);

        if (authCtx.isSuccess) {
            navigate("/", { replace: true });
        }        

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
                        로그인
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="my-3">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control type="text" id='userid' required ref={useridInputRef} placeholder="아이디를 입력하세요" />
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" id='userpw' required ref={userpwInputRef} placeholder="비밀번호를 입력하세요" />
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Button variant="info" type="submit">
                                로그인
                            </Button>
                        </Form.Group>
                        {isLoading && <p>Loading</p>}
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