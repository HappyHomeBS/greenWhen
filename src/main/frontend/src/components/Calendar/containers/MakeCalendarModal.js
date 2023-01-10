import React, { useState, useEffect, useCallback, useReducer, useContext } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Picker from '../component/Picker';
import Style from "../module/Style";
import ModalReducer from "./reducer/ModalReducer";
import CalcDate from '../module/CalcDate';
import AuthContext from '../../../store/authContext';

const MakeCalendarModal = ({ targetdate, visible, onConfirm, onCancel, todo }) => {
    
    /*console.log('MakeCalendarModal:', 'todo:', todo)
    console.log('MakeCalendarModal:', 'targetdate:', targetdate)
    console.log('MakeCalendarModal:', 'schedule:', Schedule)
    console.log('MakeCalendarModal:', 'visible:', visible)
    console.log('MakeCalendarModal:', 'onConfirm:', onConfirm)
    console.log('MakeCalendarModal:', 'onCancel:', onCancel)*/
    const initialState = {
        color: '',        
        todos: '',
        checked: false,
        date: ''
    };

    const [state, dispatch] = useReducer(ModalReducer, initialState)


    const color = state.color;        
    const check = state.checked;
    const end = state.date  
    const info = todo[targetdate]    
    const authCtx = useContext(AuthContext)
    const token = authCtx.token

    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onConfirm({targetdate, todo})
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
        const todos = CalcDate(targetdate, end)
        onConfirm({targetdate, todo, color, todos})
        Initialization()
        changeColor('')
    }
    
    // 삭제
    const remove = () => {
        // 선택된 목록 가져오기
        const query = 'input[name="info"]:checked';
        const selectedEls = 
            document.querySelectorAll(query);
        
        // 선택된 목록에서 value 찾기
        let result = [];        
        selectedEls.forEach((el) => {
          const data = el.value.split(",")
          result.push({targetdate: targetdate, memo: data[0], color: data[1]})
        });
        console.log(result)
        
        // 삭제
        axios.post('/calendar/deleteSchedules', result, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          window.location.reload();

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
                    {targetdate}                    
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <div>

                    {info.map(info => {
                        return (
                            <tr key={info}>     
                                <input name='info' type = 'checkbox' value={info} onClick = {onCheck} />         
                                <td>일정: &nbsp;</td>
                                <td>{info[0]}</td>
                                <div style={Style(info[1])} className="custom-check-box"> </div>
                            </tr>
                        )
                        })}                        
                        
                    </div>     
                    <Picker changeColor = {changeColor}/>                    
                </Modal.Body>
                <Modal.Footer>                    
                        <button className="choice" onClick={confirm} >수정</button>
                        <button className="choice" onClick={remove} >삭제</button>
                        <button className="choice" onClick={cancel}>취소</button>    
                </Modal.Footer>
            </Container>
        </Modal>
    )
}

export default MakeCalendarModal