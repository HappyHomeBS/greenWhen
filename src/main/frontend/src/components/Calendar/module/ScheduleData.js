import React from "react";

const ScheduleData = (index, todo) => {    
    const info = []
    if (todo[index] !== undefined) {
        todo[index].map((item) => {            
            info.push({index: index, todo: item})
        })
        return info
    }
    return null;
}

export default ScheduleData
