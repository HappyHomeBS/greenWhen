import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'

const CalendarModal = ({ visible, onConfirm, onCancel, token, onClickSchedule }) => {    
    
    const [allSchedules, setAllSchedules] = useState([]);
    const [memo, setMemo] = useState([]);
    const [targetdate, setTargetdate] = useState([]);
    const [region, setRegion] = useState([]);

    

    useEffect(()=> {
        axios
      .get("/calendar/getAllSchedules", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then ((res) => {
        console.log('allSchedules:',res.data)
        setAllSchedules(res.data)
        console.log('allSchedules:',allSchedules)        
      })


    }, [visible]) 

    const clickSchedule = (e) => {
        setMemo(document.querySelector("[name='memo']"))
        setTargetdate(e.target.value)
        setRegion(e.target.value)
        console.log('clickSchedule', memo, targetdate, region)

       // onClickSchedule({targetdate, memo, region})        
    }    

    const handleChange = useCallback((index, e) => {
        const newValues = [...memo];
        newValues[index] = e.target.value;
        setMemo(newValues);
        console.log('memoList', memo)
      }, [memo]);


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
                    내가 쓴 메모                       
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <table>
                    <thead>
                        <tr>                                              
                            <td>내용</td>
                            <td>날짜</td>
                            <td>지역</td>
                        </tr>
                    </thead>
                    <tbody>
                    {allSchedules.map((info, index) => {
                        return (
                        <tr key={index} onClick={clickSchedule}>
                            <td name='memo' value={memo[index] || ''} onChange={(e) => handleChange(index, e)}>{info.memo}</td>
                            <td value={targetdate || ''}>{info.targetdate}</td>
                            <td value={region || ''}>{info.region}</td>
                        </tr>                            
                        );
                    })}    
                    </tbody>                
                </table>                  
                </Modal.Body>
                <Modal.Footer>                                            
                        <button className="choice" onClick={onCancel}>Cancel</button>    
                </Modal.Footer>
            </Container>
        </Modal>
    )
}

export default CalendarModal