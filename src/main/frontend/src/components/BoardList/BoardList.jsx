// # main/frontend/src/componets/BoardList/BoardList.jsx

import React from "react";
import BoardBox from "../BoardBox/BoardBox";


const BoardList = (props) => {
   console.log('1. props는 부모한테 받은 정보 boerdList/props : ', props);
   console.log('2. props.data랑 props랑 무슨차이일까 boerdList/props.data : ', props.data);
  return (
    <>
       {Array.isArray(props.data) ?
        props.data.map((i) => (
            <BoardBox
                key = {i.no}
                no = {i.no}
                title = {i.title}
                userid = {i.userid}
                content = {i.content}
                readcount = {i.readcount}
                groupname = {i.groupname}
                time = {i.time}

                />
        ))
        : null}
    </>
  );
};
export default BoardList;