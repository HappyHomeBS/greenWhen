import React from "react";
import GroupBox from "../GroupBox/GroupBox";


const GroupList = (props) => {

    

if(props.Admin){
    console.log("true", props.Admin);
    const { Admin } = props;

    return(
        <>
            {Array.isArray(props.data) ?
            props.data.map((i) => (
                <GroupBox
                    key = {i.no}
                    no = {i.no}
                    groupleader = {i.groupleader}
                    groupname = {i.groupname}
                    time = {i.time}
                    grade = {i.grade}
                    Admin = {Admin}
                    updateGroupList = {props.updateGroupList}
      />
            ))
            : null}
    
        </>
        );

}else if(!props.Admin){
    console.log('관리자 모드로 접근하지 않았습니다');

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
                    accessiblelevel = {i.accessiblelevel}
                    updateGroupList = {props.updateGroupList}

    
      />
            ))
            : null}
    
        </>
        );
};



};
export default GroupList;
