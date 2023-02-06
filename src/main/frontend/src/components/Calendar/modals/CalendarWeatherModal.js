import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Picker from '../component/Picker';
import Style from "../module/Style";
import ModalReducer from '../containers/reducer/ModalReducer';
import CalcDate from '../module/CalcDate';
import WeatherIcon from '../module/WeatherIcon';

const CalendarWeatherModal = ({ targetdate, visible, onCancel, region, year, month, regionNum }) => {  

    const icons = WeatherIcon({year:year, month:month+1, regionNum:regionNum});    

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
                    {targetdate} 예상날씨                       
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        {icons.map((row, index) => (
                            row.targetDate === targetdate ? 
                        <tbody>
                            <tr>
                                <td>최저온도</td>
                                <td>{row.lowTemp}도</td>                                
                            </tr>
                            <tr>
                                <td>최고온도</td>
                                <td>{row.highTemp}도</td>                                
                            </tr>
                            <tr>
                                <td>강수량</td>
                                <td>{row.rain}</td>
                            </tr>
                            <tr>
                                <td>미세먼지</td>
                                <td>{row.dust}</td>                                
                            </tr>
                        </tbody>
                            : null
                        ))} 
                    </table>                    
                                      
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default CalendarWeatherModal