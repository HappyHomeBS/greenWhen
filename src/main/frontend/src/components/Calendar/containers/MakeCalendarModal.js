import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Picker from '../component/Picker';
import Style from "../module/Style";
import ModalReducer from "./reducer/ModalReducer";
import CalcDate from '../module/CalcDate';

const MakeCalendarModal = ({ idx, visible, onConfirm, onCancel, memo, Schedule }) => {
    
    /*console.log('MakeCalendarModal:', 'idx:', idx)
    console.log('MakeCalendarModal:', 'visible:', visible)
    console.log('MakeCalendarModal:', 'onConfirm:', onConfirm)
    console.log('MakeCalendarModal:', 'onCancel:', onCancel)
    console.log('MakeCalendarModal:', 'memo:', memo)*/
    const initialState = {
        color: '',
        todo: '',
        todos: '',
        checked: false,
        date: ''
    };

    const [state, dispatch] = useReducer(ModalReducer, initialState)


    const color = state.color;
    const todo = state.todo;
    const todos = state.todos;
    const check = state.checked;
    const end = state.date
    

    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onConfirm({idx, todo})
            dispatch({type: 'CHANGE', value: ''})
        }
    }
    
    // 초기화
    const Initialization = () => {
        dispatch({type: 'INITIALIZATION'})
    }

    // 색상 변경
    const changeColor = (color) => {
        dispatch({type: 'COLOR', value: color})
    }
    
    // 일정
    const onChange = useCallback(e => {
        dispatch({type: 'TODO', value: e.target.value})
    }, [])
    
    // 일정 종료일
    const onTodos = useCallback( e => {
        dispatch({type: 'TODOS', value: e.target.value})
    }, [])

    // 체크 박스
    const onCheck = () => {
        dispatch({type: 'CHECK', value: check})
    }
    
    // 입력 취소
    const cancel = () => {
        onCancel()
        Initialization()
    }
    
    // 입력
    const confirm = () => {
        const todos = CalcDate(idx, end)
        onConfirm({idx, todo, color, todos})
        Initialization()
        changeColor('')
    }


    if (!visible) return null;
    return (
        <Modal
            show={visible}
            onHide={onCancel}
            size="mi"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {idx}{memo}                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <input className="input" placeholder={memo} value={todo} onChange={onChange} onKeyPress={onKeyPress}></input>                    
                        {color !== '' && <div className="custom-check-box"
                                     style={Style(color)}/>}
                    </div>
                    <div className="end">
                        <p>종료일 설정</p>
                        <input className="input" type = 'checkbox' onClick = {onCheck} />
                    </div>
                    <div className="choice-day">
                        { check === true &&                        
                            <div className="end-day">
                                <input className="input" type="text" onChange={onTodos} placeholder={idx} />
                            </div>                        
                        }   
                    </div>
                    <Picker changeColor = {changeColor}/>                    
                </Modal.Body>
                <Modal.Footer>                    
                        <button className="choice" onClick={confirm} >Confirm</button>
                        <button className="choice" onClick={cancel}>Cancel</button>    
                </Modal.Footer>
            </Container>
        </Modal>
    )
}

export default MakeCalendarModal