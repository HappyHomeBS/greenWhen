import axios from "axios";
import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../../store/authContext";
import HaltOrClosingModal from "../../Modals/HaltOrClosingModal";
import NoteAllUserModal from "../../Modals/NoteAllUserModal";


const GroupBox = (props) => {

    console.log('admin?' , props.Admin);
    
    const [ IsSubmitting, setIsSubmitting] = useState(false);
    const [ Error, setError ] = useState(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [showModalForHaltOrClosing, setShowModalForHaltOrClosing] = useState(false);
    const [showModalForNote, setShowModalForNote] = useState(false);

     //6글자 이상만 가입가능하므로 해당 id는 존재할 수 없음. 

    const handleSecession = async () => {
        await axios.delete(`/api/manage/sessecion/${props.groupname}`, {
            headers: {
                'Authorization': 'Bearer ' + token
                }
        });
        props.updateGroupList();
    };

    console.log('accessiblelevel' , props.accessiblelevel);

    if(!props.Admin){
    
    return(
        <>
        {!props.Admin && props.accessiblelevel === 2 ? 
        <div 
            onClick={(event) => {
                event.preventDefault();
                alert("You can not access here");
            }}
        >
            <h5> {props.groupname} </h5>
        </div> 
        : 
        <Link
            to = {"/bulletin"}
            state = {{
                groupname : props.groupname
            }}
        >
            <div>
                <h5> {props.groupname} </h5>
            </div>
        </Link>
        } 

        {props.Admin === undefined  && <button onClick={handleSecession}>탈퇴</button>}
        </>

    )
}else if(props.Admin) {
    const {groupname, Admin} = props;
    
    console.log('props.admin', props.Admin);
    console.log('admin', Admin);

    
    return(
        <>
            <Link
                    to = {"/bulletin"}
                        state = {{
                        groupname : groupname,
                        Admin : Admin
                    }}
                >

                <div>
                    <h5> {props.groupname}  || {props.groupleader}  || {props.time}</h5>
                </div>
            </Link>


        {props.Admin === true &&  <button onClick={ () => setShowModalForNote(true)}> 전체 쪽지 </button>}
        {showModalForNote && (
            <NoteAllUserModal groupname = {props.groupname} groupleader = {props.groupleader} 
            Admin = {props.Admin} onClose={()=> setShowModalForNote(false)}/>
        )}
        {props.Admin === true &&  <button onClick={ () => setShowModalForHaltOrClosing(true) }> 정지|폐쇄 </button>}
        {showModalForHaltOrClosing && (
            <HaltOrClosingModal groupname = {props.groupname}
            updateGroupList={props.updateGroupList}  onClose = {() => setShowModalForHaltOrClosing(false)} />
        )}
        </>
        )
    
    
    };
    
};
export default GroupBox;