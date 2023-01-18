import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Region from '../module/Region'

const CalendarMemoModal = ({ visible, onCancel, token, onClickSchedule, setCalendarMemoModalOn }) => {    
    
    const [allSchedules, setAllSchedules] = useState([]);   

    // 해당유저의 전체 메모 불러오기
    useEffect(()=> {
        axios
      .get("/calendar/getAllSchedules", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then ((res) => {
        //console.log('allSchedules:',res.data)
        setAllSchedules(res.data)
        //console.log('allSchedules:',allSchedules)        
      })

    }, [visible]) 

    // 메모 클릭시 해당 날짜, 지역의 달력으로 이동
    const clickSchedule = (schedule) => {                
        onClickSchedule({schedule})              
        setCalendarMemoModalOn(false)        
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
                    {allSchedules.map((schedule, index) => {
                        return (
                        <tr key={index} onClick={() => clickSchedule(schedule)}>
                            <td>{schedule.memo}</td>
                            <td>{schedule.targetdate}</td>
                            <td>{Region({regionNumber:schedule.region})}</td>
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

export default CalendarMemoModal