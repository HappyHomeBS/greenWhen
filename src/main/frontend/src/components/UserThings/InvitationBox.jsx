import axios from "axios";
import React, { useState } from "react";


const InvitationBox = (props) => {

    const { recept, content, title  } = props;



    //수락

    const handleAccept = async () => {
        let data = {
            userid : recept,
            groupname : content,
            grade : 2,
            deny : "yes"
        }
    
        try{
            await axios.post("/api/accepted/", data);
            props.onAccept();
        }catch(err){
            console.log(err);
        }
        console.log('2. deny값' );
    };


    //거절

    const handleDeny = async () => {
        let data = {
            userid : recept,
            groupname : content,
            grade : 2,
            deny : "no"
        }
    
        try{
            await axios.post("/api/accepted/", data);
            props.onAccept();
            console.log("수락보내기실행");
        }catch(err){
            console.log(err);
        }
    };

    
   
    return (
        <>
            <div>
                <h3>{title}</h3> 
                <button value="yes"  onClick={handleAccept}>수락</button> 
                <button value="nope"  onClick={handleDeny}> 거절 </button>
            </div>

        </>
        );
};


export default InvitationBox;