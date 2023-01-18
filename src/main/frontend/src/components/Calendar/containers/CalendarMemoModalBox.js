import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Region from '../module/Region'

const CalendarMemoModalBox = ({  onClickSchedule, setCalendarMemoModalOn, props }) => {       

    // 메모 클릭시 해당 날짜, 지역의 달력으로 이동
    const clickSchedule = (schedule) => {                
        onClickSchedule({schedule})              
        setCalendarMemoModalOn(false)        
    }

    return (            
            <tr onClick={() => clickSchedule(props.schedule)}>
                <td>{props.schedule.memo}</td>
                <td>{props.schedule.targetdate}</td>
                <td>{Region({regionNumber:props.schedule.region})}</td>
            </tr>                            
            );      
  
}

export default CalendarMemoModalBox