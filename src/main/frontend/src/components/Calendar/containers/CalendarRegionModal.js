import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Region from '../module/Region'

const CalendarRegionModal = ({ visible, onCancel, onClickRegion, setCalendarRegionModalOn, selectChange }) => {    
    
    const [allSchedules, setAllSchedules] = useState([]);   
    const [region, setRegion] = useState(1);    
    const regionList =[{no:1, region:'강원도'}, {no:2, region:'경기도'}, {no:3, region:'경상남도'}, {no:4, region:'경상북도'}, {no:5, region:'광주'}, 
    {no:6, region:'대구'}, {no:7, region:'대전'}, {no:8, region:'부산'}, {no:9, region:'서울'}, {no:10, region:'세종'}, {no:11, region:'울산'}, 
    {no:12, region:'인천'}, {no:13, region:'전라남도'},{no:14, region:'전라북도'}, {no:15, region:'제주도'}, {no:16, region:'충청남도'}, {no:17, region:'충청북도'}] 
    

    useEffect(()=> {
        setRegion(1)
    }, [visible]) 

    //상위지역 선택
    const changeRegion = (e) => {        
        setRegion(e.target.value);
        console.log("지역:", region);        
    }

    //하위지역 선택
    const ClickRegion = (e) => {
        const inputElements = document.querySelectorAll("input[name='data']");
        console.log('하위지역데이터',inputElements)
        onClickRegion()
    }
//     // 수정
//   const update = () => {
//     // 선택된 목록 가져오기       
//     const inputElements = document.querySelectorAll("input[name='info']:checked");
//     const values = [];
//     for (let input of inputElements) {
//         const value1 = input.getAttribute("value1");
//         const value2 = input.getAttribute("value2");
//         values.push({value1, value2});
//     }  
      

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
                            <td>지역</td>                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>                                    
                                <select onChange={changeRegion}>
                                    {regionList.map((item) => {
                                        return (
                                            <option value={item.no}>{item.no}{item.region}</option>                                     
                                        )
                                    })}
                                </select>                                                         
                            </td>    
                            <div onClick={ClickRegion}>
                                {Region(region)}                    
                            </div>                        
                        </tr>
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

export default CalendarRegionModal