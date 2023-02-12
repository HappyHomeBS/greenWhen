import React from 'react'
import Region from '../module/Region'

const CalendarMemoModalBox = ( props ) => {       

    return (
        <>
            <td className="calendarTd">{props.memo}</td>
            <td className="calendarTd">{props.targetdate}</td>
            <td className="calendarTd">{Region({regionNumber:props.region, groupName: props.groupName})}</td>
        </>           
            );      
}

export default CalendarMemoModalBox