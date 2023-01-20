import React from "react";
import GroupBox from "../GroupBox/GroupBox";


const GroupList = (props) => {

return(
    <>
        {Array.isArray(props.data) ?
        props.data.map((i) => (
            <GroupBox
                key = {i.no}
                no = {i.no}
                userid = {i.userid}
                groupname = {i.groupname}
                time = {i.time}
                grade = {i.grade}

  />
        ))
        : null}

    </>
    );

};
export default GroupList;
