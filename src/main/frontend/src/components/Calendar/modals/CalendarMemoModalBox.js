import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Region from '../module/Region'

const CalendarMemoModalBox = ( props ) => {       

    return (
        <>
            <td>{props.memo}</td>
            <td>{props.targetdate}</td>
            <td>{Region({regionNumber:props.region})}</td>
        </>           
            );      
}

export default CalendarMemoModalBox